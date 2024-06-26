import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

const ListingItem = ({listing}) => {
console.log(listing)

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] mb-4 sm:mb-0'>
    <Link to={`/listing/${listing._id}`} className='block'>
      <img
        src={listing.imageUrls[0]}
        alt={listing.name}
        className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
      />
      <div className='p-3 flex flex-col gap-2 w-full'>
        <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
        <div className='flex gap-2 items-center'>
          <MdLocationOn className='h-4 w-4 text-green-700' />
          <p className='text-sm text-gray-700 truncate'>{listing.address}</p>
        </div>
        <p className='text-sm text-gray-700 line-clamp-2'>{listing.description}</p>
        <p className='text-slate-600 mt-2 font-semibold'>
          ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
          {listing.type === 'rent' && '/month'}
        </p>
        <div className='text-slate-700 flex gap-2 flex-wrap'>
          <div className='font-bold text-sm'>
            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
          </div>
          <div className='font-bold text-sm'>
            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
          </div>
        </div>
      </div>
    </Link>
  </div>
  )
}

export default ListingItem