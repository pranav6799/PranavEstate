import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(currentUser);
  const navigate = useNavigate()

const handleSubmit =(e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
}

useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl)
    }

},[location.search])


  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap items-center">
            <span className="text-slate-500">Pranav</span>
            <span className="text-slate-700">Estates</span>
          </h1>
        </Link>

        <form onSubmit={handleSubmit}className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            placeholder="Search.."
            type="text"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          ></input>
          <button>
          <FaSearch className="text-slate-600" />

          </button>
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              {" "}
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" text-slate-700 hover:underline">About</li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              {" "}
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full w-7 h-7 object-cover"
              />{" "}
            </Link>
          ) : (
            <Link to="/signIn">
              <li className=" text-slate-700 hover:underline">SignIn</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
