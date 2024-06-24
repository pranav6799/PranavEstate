import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import Header from "./Components/Header";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";

const App = () => {
return(
  <BrowserRouter>
  <Header/>
  <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/about" element={<About/>}/>
   <Route path="/signIn" element={<SignIn/>}/>
   <Route path="/signUp" element={<SignUp/>}/>
   <Route path="/search" element={<Search/>}/>
   <Route path="/listing/:id" element={<Listing/>}/>
   <Route element={<PrivateRoute/>}>
   <Route path="/profile" element={<Profile/>}/>
   <Route path="/create-listing" element={<CreateListing/>}/>
   <Route path="/updateListing/:id" element={<UpdateListing/>}/>
   </Route>
  </Routes>
  </BrowserRouter> 
)
  
};

export default App;
