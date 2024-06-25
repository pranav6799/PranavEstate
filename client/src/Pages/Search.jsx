import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ListingItem from './ListingItem'
import Listing from './Listing'

const Search = () => {
    const [sideBarData,setSideBarData] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',
    })
    const navigate = useNavigate()
    const[loading,setLoading]=useState(false)
    const[listing,setListing]=useState([])
    const [showMore,setShowMore]=useState(false)


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
    
        if (
          searchTermFromUrl ||
          typeFromUrl ||
          parkingFromUrl ||
          furnishedFromUrl ||
          offerFromUrl ||
          sortFromUrl ||
          orderFromUrl
        ) {
          setSideBarData({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
          });
        }

        const fetchListings = async()=>{
            setLoading(true)
            const searchQuery = urlParams.toString()
            const {data} = await axios.get(`/api/listing/getAllListings?${searchQuery}`,{
              withCredentials: true
            })
            if(data.length > 8){
              setShowMore(true)
            }
            setListing(data)
           setLoading(false)
        }
        fetchListings()
    },[location.search])


const handleChange = (e)=>{
    if (
        e.target.id === 'all' ||
        e.target.id === 'rent' ||
        e.target.id === 'sell'
      ) {
        setSideBarData({ ...sideBarData, type: e.target.id });
      }
  
      if (e.target.id === 'searchTerm') {
        setSideBarData({ ...sideBarData, searchTerm: e.target.value });
      }
  
      if (
        e.target.id === 'parking' ||
        e.target.id === 'furnished' ||
        e.target.id === 'offer'
      ) {
        setSideBarData({
          ...sideBarData,
          [e.target.id]:
            e.target.checked || e.target.checked === 'true' ? true : false,
        });
      }

    if (e.target.id === 'sort_order') {
        const sort = e.target.value.split('_')[0] || 'created_at';
  
        const order = e.target.value.split('_')[1] || 'desc';
  
        setSideBarData({ ...sideBarData, sort, order });
      }
}

const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm',sideBarData.searchTerm)
    urlParams.set('type',sideBarData.type)
    urlParams.set('parking',sideBarData.parking)
    urlParams.set('furnished',sideBarData.furnished)
    urlParams.set('offer',sideBarData.offer)
    urlParams.set('sort',sideBarData.sort)
    urlParams.set('order',sideBarData.order)
    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)
}

const onShowMoreClick = async()=>{

const numberOfListings = listing.length;
const startIndex = numberOfListings;
const urlParams = new URLSearchParams(location.search)
urlParams.set('startIndex',startIndex)
const searchQuery = urlParams.toString()
const {data}= await axios.get(`http://localhost:8080/api/listing/getAllListings?${searchQuery}`,{
              withCredentials: true
            })
  if(data.length > 8){
    setShowMore(true)
  }else{
    setShowMore(false)
  }
  setListing([...listing,...data])       
}
  return (
    <div className='flex fex-col md:flex-row'>
    <div className="p-7 border-b-2 md:border-r-2  md:min-h-scren">
        <form  onSubmit={handleSubmit}className='flex flex-col gap-8'>
            <div className="flex items-center gap-2">
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                <input type='text' id='searchTerm' placeholder='Search...' value={sideBarData.searchTerm} onChange={handleChange} className='border rounded-lg p-3 w-full'></input>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Type:</label>
                <div className="flex gap-2">
                    <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sideBarData.type ==='all'}></input>
                    <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                    <input type='checkbox' id='rent' onChange={handleChange} checked={sideBarData.type==='rent'} className='w-5'></input>
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input type='checkbox' id='sell' onChange={handleChange} checked={sideBarData.type==='sell'}className='w-5'></input>
                    <span>Sale</span>
                </div>
                <div className="flex gap-2">
                    <input type='checkbox' id='offer' onChange={handleChange} checked={sideBarData.offer}className='w-5'></input>
                    <span>Offer</span>
                </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Amenities:</label>
                <div className="">
                    <input type='checkbox'  onChange={handleChange} checked={sideBarData.parking} id='parking' className='w-5'></input>
                    <span>Parking Lot</span>
                </div>
                <div className="">
                    <input type='checkbox'  onChange={handleChange} checked={sideBarData.furnished} id='furnished' className='w-5'></input>
                    <span>Furnished</span>
                </div>
            </div>
            <div className=" flex items-center gap-2">
                    <label className='font-semibold'>Sort:</label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3'>
                        <option value='regularPrice_desc'>Price Low to High</option>
                        <option value='regularPrice_asc'>Price High to Low</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='text-white rounded-lg p-3 bg-slate-700 hover:opacity-90'>Search</button>
        </form>
    </div>

    <div className="flex-1">
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Result:</h1>
        <div className="flex flex-wrap gap-4 p-7">
          {!loading && listing.length ===0 && (
            <p className='text-xl text-slate-700'>No Listing Found !</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>Loading....</p>
          )}
          {!loading && listing && listing.map((listings)=>(
            <ListingItem key={listings._id} listing={listings}/>
          ))}
        </div>
        {showMore && (
          <button className='text-green-700 hover:underline p-7' onClick={onShowMoreClick()}>Show More</button>
        )}
    </div>
    </div>
  )
}

export default Search
