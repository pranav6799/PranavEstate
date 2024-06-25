import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listing}) => {
const [landLord, setLandLord]=useState(null)
const [message,setMessage]=useState('')
console.log(message)

const onChange = (e)=>{
setMessage(e.target.value)
}

useEffect(()=>{
  const fetchUser = async()=>{
  const {data} = await axios.get(`/api/user/getUser/${listing.user}`,{
    withCredentials:true
  })
  setLandLord(data.user)
  }
  fetchUser()

},[listing])
  return (
    <>
    {landLord && (
      <div className="flex flex-col gap-2">
        <p>Contact <span className='font-semibold'> {landLord.username}</span> for <span className='font-semibold'> {listing.name.toLowerCase()} </span></p>
        <textarea onChange={onChange} name='message' id='message' cols='30' rows='2' value={message} placeholder='Enter your message here'className='w-full border p-3 rounded-lg '></textarea>
        <Link to={`mailto:${landLord.email}? subject=Regarding ${listing.name} &body${message}`} className='bg-slate-700 text-white text-center p-3 upercase rounded-lg hover:opacity-95'>Send Message</Link>
      </div>

    )
    }
    </>
  )
}

export default Contact
