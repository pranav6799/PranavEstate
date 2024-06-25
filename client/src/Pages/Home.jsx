import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ListingItem from './ListingItem';


const Home = () => {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])

  console.log(saleListings)
  console.log(offerListings)

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const { data } = await axios.get('/api/listing/getAllListings?offer=true&limit=4', {
          withCredentials: true,
        })
        setOfferListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const { data } = await axios.get('/api/listing/getAllListings?type=rent&limit=4', {
          withCredentials: true,
        })
        setRentListings(data)
      } catch (error) {
        console.log(error) // Changed from err to error
      }
    }

    const fetchSaleListings = async () => {
      try {
        const { data } = await axios.get('/api/listing/getAllListings?type=sell&limit=4', {
          withCredentials: true,
        })
        setSaleListings(data)
      } catch (error) {
        console.log(error) // Changed from err to error
      }
    }

    fetchOfferListings()
    fetchRentListings() // Added missing call
    fetchSaleListings() // Added missing call
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };


  return (
    <>
    <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
      <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
        Find your next <span className='text-slate-500'>perfect</span><br />place with ease
      </h1>
      <div className="text-gray-400 text-sm">
        Pranav Estate is the best place to find your next perfect place to live
        <br />
        We have a wide range of properties for you to choose for
      </div>
      <div>
      <Link to="/search" className='text-sm text-blue-800 font-bold hover:underline'>Let's Start now...</Link>
      </div>
    </div>
     <Slider {...settings}>
     {offerListings.map((listing) => (
       <div key={listing._id} className="slider-item">
         <img
           src={listing.imageUrls[0]}
           alt={listing.name}
           style={{ width: '100%', height: '550px', objectFit: 'cover' }}
         />
       </div>
     ))}
   </Slider>
   <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
    {offerListings && offerListings.length > 0 && (
      <div className="">
      <div className="my-3">
        <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
        <Link className='text-sm text-blue-800 hover:underline' to='/search?offer=true'>
        Show more Offers</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {offerListings.map((listing)=>(
          <ListingItem  key={listing._id} listing={listing}></ListingItem>
        ))}
      </div>
      </div>
    )}
    {saleListings && saleListings.length > 0 && (
      <div className="">
      <div className="my-3">
        <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Sale</h2>
        <Link className='text-sm text-blue-800 hover:underline' to='/search?type=sell'>
        Show more places for sale</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {saleListings.map((listing)=>(
          <ListingItem  key={listing._id} listing={listing}></ListingItem>
        ))}
      </div>
      </div>
    )}
    {rentListings && rentListings.length > 0 && (
      <div className="">
      <div className="my-3">
        <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
        <Link className='text-sm text-blue-800 hover:underline' to='/search?type=rent'>
        Show more places for rent</Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {rentListings.map((listing)=>(
          <ListingItem  key={listing._id} listing={listing}></ListingItem>
        ))}
      </div>
      </div>
    )}
   </div>
   </>
   
  )
}

export default Home
