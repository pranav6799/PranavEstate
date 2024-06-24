import { useState ,} from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const CreateListing = () => {
    const [file, setFiles] = useState([])
    const { currentUser } = useSelector(state => state.user)
    const [imageUploadError,setImageUploadError]=useState(false)
    const [uploading,setUploading] = useState(false)
    const [loading,setLoding]=useState(false)
    const [error,setError]=useState(false)
    const navigate = useNavigate()
    console.log(currentUser)
    // const [fileUploadErr,setFileUploadErr] = useState(false)
    const [formData, setFormData] = useState({
        imageUrls: [],
        name:'',
        description:'',
        address:'',
        type:'rent',
        bedrooms:1,
        bathrooms:1,
        regularPrice:50,
        discountPrice:50,
        furnished:false,
        parking:false,
        offer:false,
        user:currentUser._id
    })

    console.log(formData)

    const handleOnChange = (e)=>{
        if(e.target.id ==='sell' || e.target.id==='rent'){
            setFormData({
                ...formData,
                type:e.target.id
            })
        }

        if(e.target.id ==='furnished' || e.target.id==='parking' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }
        if(e.target.type ==='number' || e.target.type==='text' || e.target.type === 'textarea'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }

    }



    const handleImageSubmit = () => {
        setUploading(true)
        if (file.length > 0 && file.length + formData.imageUrls.length < 7) {
            const promises = []

            console.log(currentUser)
            for (let i = 0; i < file.length; i++) {
                promises.push(storeImage(file[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) 

                })
                setImageUploadError(false)
                setUploading(false)
                setError(false)
            }).catch((err)=>{
                setImageUploadError('Image Upload failed (2 mb max per image)')
                setUploading(false)
            })

        }else{
            setImageUploadError('You can only upload 6 images per listing')
            setUploading(false)
        }

    }



    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            console.log(fileName)
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(`Upload is ${progress}% done`)
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                })

        })
    }

    const handleRemoveImage = (index)=>{
setFormData({
    ...formData,
    imageUrls:formData.imageUrls.filter((_,i)=> i!=index)
    })
}

const handleOnSubmit = async(e)=>{
    e.preventDefault()
    try {
        if(formData.imageUrls.length < 1) return setError('You must atleast Upload one image')
        setLoding(true)
        setError(false)
        const {data} = await axios.post('http://localhost:8080/api/listing/createListing',formData,{
            withCredentials:true
        })
        setLoding(false)
        setFormData({
        imageUrls: [],
        name:'',
        description:'',
        address:'',
        type:'rent',
        bedrooms:1,
        bathrooms:1,
        regularPrice:50,
        discountPrice:50,
        furnished:false,
        parking:false,
        offer:false,
        user:currentUser._id
        })
        console.log(data)
        navigate(`/listing/${data.listing._id}`)
    } catch (err) {
        setLoding(false)
        setError(err.data)
    }
}



    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='font-semibold text-3xl text-center my-7'>Create Listing</h1>
            <form onSubmit={handleOnSubmit} className='flex flex-col sm:flex-row'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text' onChange={handleOnChange} value={formData.name} placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='5' required></input>
                    <textarea type='text' placeholder='description' className='border p-3 rounded-lg' id='description' required onChange={handleOnChange} value={formData.description}></textarea>
                    <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required  onChange={handleOnChange} value={formData.address}></input>

                    <div className=' flex gap-6 flex-wrap'>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='sell' className='w-5' onChange={handleOnChange} checked={formData.type === 'sell'}></input>
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='rent' className='w-5' onChange={handleOnChange} checked={formData.type === 'rent'}></input>
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='parking' className='w-5' onChange={handleOnChange} checked={formData.parking}></input>
                            <span>Parking-spot</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='furnished' className='w-5' onChange={handleOnChange} checked={formData.furnished}></input>
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='offer' className='w-5' onChange={handleOnChange} checked={formData.offer}></input>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2 items-center' >
                            <input className='p-3 boder border-gray-900 rounded-lg ' type='number' id='bedrooms' min='1' max='10' required onChange={handleOnChange} value={formData.bedrooms}></input>
                            <p>Beds</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input className='p-3 boder border-gray-700 rounded-lg ' type='number' id='bathrooms' min='1' max='10' required onChange={handleOnChange} value={formData.bathrooms}></input>
                            <p>Baths</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input className='p-3 boder border-gray-700 rounded-lg ' type='number' id='regularPrice' min='50' max='100000' required onChange={handleOnChange} value={formData.regularPrice}></input>
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input className='p-3 boder border-gray-700 rounded-lg ' type='number' id='discountPrice' min='50' max='100000' required onChange={handleOnChange} value={formData.discountPrice}></input>
                            <div className='flex flex-col items-center'>
                                <p>Discounted price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4 ml-4'>
                    <p className='font-semibold '>Images:
                        <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                        <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-700 rounded w-full' type='file' id='images' accept='images/*' multiple></input>
                        <button disabled={uploading}type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading..' : 'Upload'}</button>
                    </div>
                    {error && <p className='text-red-700'>{error}</p>}
                    <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=> (
                            <div key={url} className='flex justify-between p-3 border items-center'>
                                <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg'></img>
                                <button type='button' onClick={()=>handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                            </div>
                        ))
                    }
                   
                    <button className='bg-slate-700 uppercase rounded-lg p-3 text-white '>Create Listing</button>
                </div>


            </form>

        </main>
    )
}

export default CreateListing