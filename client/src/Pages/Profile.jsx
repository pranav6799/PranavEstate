  import React, { useEffect, useRef, useState } from 'react'
  import { useDispatch, useSelector, } from 'react-redux'
  import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
  import {app} from '../firebase'
  import { updateStart,updateFailed,updateSuccess,deleteStarted,deleteSuccess,deleteFailed,singOutStarted,signOutSuccess,signOutFailed} from '../redux/userSlice'
  import axios from 'axios'
  import { Link, useNavigate } from 'react-router-dom'

  // axios.defaults.withCredentials = true

  const Profile = () => {
    const { currentUser } = useSelector(state => state.user)
    console.log(currentUser._id)
    const navigate = useNavigate()
    const [file,setFile]= useState(undefined)
    const fileRef = useRef(null)
    const [filePrec,setFilePerc]= useState(0)
    const [fileUploadErr,setFileUploadErr] = useState(false)
    const [formData,setFormData]= useState({})
    const {loading,error} = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const [success,setSuccess]=useState(false)
    const [showListingError,setShowListingError]=useState(false)
    const [userListing,setUserListing]=useState([])

    console.log(userListing)
    

    
    useEffect(()=>{
      if(file){
        handleFileUpload(file)
      }
    },[file])





    const handleOnChange = (e)=>{
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
      })
    }

    const handleOnSubmit = async(e)=>{
      e.preventDefault()
      try {
        dispatch(updateStart())
        const {data}= await axios.post(`/api/user/update/${currentUser._id}`,formData, {
          withCredentials: true,
        })
        if(status === false){
          dispatch(updateFailed(data.message))
        }
        console.log(data)
        dispatch(updateSuccess(data)) 
        setSuccess(true)
        setTimeout(()=> setSuccess(false),3000)
      } catch (err) {
        dispatch(updateFailed(err.response.data.message))
      }
    }

    const handleDeleteSubmit = async()=>{
      try {
        dispatch(deleteStarted())
        const {data}= await axios.delete(`/api/user/delete/${currentUser._id}`)
        dispatch(deleteSuccess(data))
        navigate('/signIn')
      } catch (err) {
        dispatch(deleteFailed(err.response.data))
      }
    }

    const handleSignOut = async()=>{
      try {
        dispatch(singOutStarted())
        const {data}= await axios.post('/api/user/signOut')
        dispatch(signOutSuccess(data))
      } catch (err) {
        dispatch(signOutFailed(err.data))
      }
      

    }


  const handleFileUpload = (file)=>{
  const storage = getStorage(app)
  const fileName = new Date().getTime() + file.name
  const storageRef = ref(storage, fileName)
  const uploadTask = uploadBytesResumable(storageRef,file)


  uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
  setFilePerc(Math.round(progress))
  },
  (error)=>{
    setFileUploadErr(true)
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
      setFormData({...formData,avatar:downloadURL})
    )
  }
  )
  
  }

  
  const handleOnShowListing = async()=>{
    try{
      const {data} = await axios.get(`http://localhost:8080/api/listing/getListing/${currentUser._id}`,{
        withCredentials: true,
      })
      setUserListing(data.listing)
    }catch(err){
      setShowListingError(err.data)

    }
  }


  const handleDeleteListing = async(listingId)=>{
    try {
      const {data}= await axios.delete(`http://localhost:8080/api/listing/deleteListing/${listingId}`,{
        withCredentials: true,
      })
      console.log(userListing)
      setUserListing((prev)=> prev.filter((listing)=> listing._id !== listingId))
    } catch (err) {
      console.log(err)
    }
  }
  

    return (
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='font-semibold text-center text-3xl my-7'>Profile</h1>
        <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
          <input onChange={(e)=> setFile(e.target.files[0])} hidden type='file' ref={fileRef} accept='image/*' ></input>
          <img alt='profile' onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} className='rounded-full mt-2 h-24 w-24 object-cover cursor-pointer self-center'></img>
          <p className='text-center'>
          {fileUploadErr ? (<span className='text-red-700'>Error Image Upload</span>) :        
          filePrec > 0 && filePrec < 100 ? (<span className='text-black'>{`Uploadin ${filePrec}`}</span>) :filePrec === 100 ? (<span className='text-green-700'>Image upload successfully</span>) :( "")
          }
          </p>
          <input type='text'  onChange={handleOnChange} defaultValue={currentUser.username} placeholder='username' id='username' className='border p-3 rounded-lg mt-2'></input>
          <input type='email' onChange={handleOnChange} defaultValue={currentUser.email} placeholder='email' id='email' className='border p-3 rounded-lg mt-2'></input>
          <input type='passowrd' onChange={handleOnChange} placeholder='password' id='password' className='border p-3 rounded-lg mt-2'></input>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>{loading ? 'Loading...' : 'Update'}</button>
          <Link to='/create-listing' className='rounded-lg bg-green-700 p-3 text-white uppercase hover:opacity-90 text-center'>Create Listing</Link>

        </form>
        <div className='flex justify-between mt-3'>
          <span className='text-red-700 cursor-pointer' onClick={handleDeleteSubmit}>Delete Account</span>
          <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>SignOut</span>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something Went Wrong'}</p>
        <p className='text-green-700 mt-5'>
          {success && 'User is updated successfully!'}
        </p>
        <button onClick={handleOnShowListing} className='text-green-700 w-full'>Show Listing</button>
        {userListing && userListing.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 font-semibold text-3xl'>Your Listings</h1>
        {userListing.map((listing)=>(
            <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/listing/${listing._id}`} >
              <img src={listing.imageUrls} alt={listing.name} className='h-16 w-16 object-contain'></img>
              </Link>
              <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`}>
              <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
              <button onClick={()=>handleDeleteListing(listing._id)}className='text-red-700 uppercase hover:underline'>Delete</button>
              <Link to={`/updateListing/${listing._id}`}>
              <button className='text-green-700 uppercase hover:underline'>Edit</button>
              </Link>
              

              </div>
            </div>
        ))}
        </div>}
      </div>
    )
  }

  export default Profile
