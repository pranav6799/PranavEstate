import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart,signInFailed,signInSuccess } from '../redux/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import OAuth from '../Components/OAuth'

const SignIn = () => {
const [formData,setFormData] = useState({})
const navigate = useNavigate()
const dispatch = useDispatch()

axios.defaults.withCredentials = true

const {loading,error} = useSelector((state)=> state.user)

const handleOnChange = (e)=>{
  setFormData({
    ...formData,
    [e.target.id] : e.target.value
  })
}

const handleOnSubmit = async(e)=>{
  e.preventDefault()
  try{
dispatch(signInStart())
  const {data}= await axios.post('/api/user/login',formData)
  console.log(data)
  dispatch(signInSuccess(data.user))
  setFormData({})
  navigate('/')
  }catch(error){
dispatch(signInFailed(error.response.data.message))
  }
}


  return (
    <div className='p-3 max-w-lg mx-auto'>
   <h1 className='font-semibold text-center text-3xl my-7'>Sign In</h1>
   <form className='flex flex-col gap-4' onSubmit={handleOnSubmit}>
    <input className='border p-3 rounded-lg' placeholder='Email' type='email' id='email' onChange={handleOnChange}></input>
    <input className='border p-3 rounded-lg' placeholder='Password' type='password' id='password'onChange={handleOnChange}></input>
    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...':'Sign In'}</button>
    <OAuth/>
   </form>
   <div className='flex gap-2 m-5'>
    <p>Dont have an account?</p>
    <Link to='/signUp'>
    <span className='text-blue-700'>SignUp</span>
    </Link>
   </div>
   {
    error && <p className='text-red-700 p-3 text-center'>{error}</p>
   }
   </div>
  )
}

export default SignIn
