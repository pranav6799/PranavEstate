import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import OAuth from '../Components/OAuth'

const SignUp = () => {
const [formData,setFormData] = useState({})
const [loading,setLoading]= useState(false)
const [error,setError]=useState(null)

const navigate = useNavigate()

const onChange = (e)=>{
  setFormData({
    ...formData,
    [e.target.id ]: e.target.value
  })
}

const handleOnSubmit = async(e)=>{
  e.preventDefault()
try {
  setLoading(true)
  const {data} = await axios.post('http://localhost:8080/api/user/signUp',formData)

  if(data.status === false){
    setLoading(false),
    setError(data.message)
  }

  setLoading(false),
  setError(null)
  setFormData({})
  navigate('/signIn')
    
} catch (error) {
  setError(error.response.data.message)
}

}

  return (
   <div className='p-3 max-w-lg mx-auto'>
   <h1 className='font-semibold text-center text-3xl my-7'>Sign Up</h1>
   <form className='flex flex-col gap-4' onSubmit={handleOnSubmit}>
    <input className='border p-3 rounded-lg' placeholder='Username' type='text'  id='username' onChange={onChange}></input>
    <input className='border p-3 rounded-lg' placeholder='Email' type='email'  id='email' onChange={onChange}></input>
    <input className='border p-3 rounded-lg' placeholder='Password' type='password' id='password' onChange={onChange}></input>
    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>{loading ? 'Loading...' : 'Sign Up'}</button>
    <OAuth/>
   </form>
   <div className='flex gap-2 m-5'>
    <p>Have an account?</p>
    <Link to='/signIn'>
    <span className='text-blue-700'>SignIn</span>
    </Link>
   </div>
   {
    error && <p className='text-red-700 p-3 text-center'>{error}</p>
   }
   </div>
  )
}

export default SignUp