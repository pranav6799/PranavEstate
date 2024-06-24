const Listing = require('../Models/listingModel')
const errorHandler = require('../utils/error')

exports.createListing = async(req,resp,next)=>{
    const listing = await Listing.create(req.body)

    resp.status(200).json({
        status:true,
        listing
    })

}


exports.getListing = async (req,resp,next)=>{
    try {
        const listing = await Listing.find({user:req.params.id})
        if(!listing){
            return next(errorHandler(404,'No Listing Found Kindly create one'))
        }   
        resp.status(200).json({
            listing
        })
    } catch (err) {
        next(err)
        
    }
}


exports.deleteListing = async(req,resp,next)=>{
    try{
        const listing = await Listing.findByIdAndDelete(req.params.id)
        if(!listing){
            return next(errorHandler(404,'No Listing found'))
        }
        resp.status(200).json('Listing Deleted Successfully')
    }catch(err){
        next(err)
    }
}



exports.updateListing = async(req,resp,next)=>{
    try{
        const listing = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!listing) {
            return next(errorHandler(404,'Listing not Found'))
        }
        resp.status(200).json({
            message:'Listing updated successfully',
            listing
        })

    }catch(err){
        next(err)
    }
}


exports.getListings = async(req,resp,next)=>{
    try{
        const listing = await Listing.findById(req.params.id)
        if(!listing){
            return next(errorHandler(404,'No Listing Found'))

        }

        resp.status(200).json({
            listing
        })
        
    }catch(err){
        next(err)
    }
}



exports.getAllListing = async(req,resp,next)=>{
    try {
        const limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.query.startIndex) || 0
        let offer = req.query.offer

        if(offer === undefined || offer ==='false'){
            offer = {$in: [false,true]}
        }

        let parking = req.query.parking

        if(parking === undefined || offer ==='false'){
            parking = {$in: [false,true]}
        }

        let furnished = req.query.furnished

        if(furnished === undefined || furnished ==='false'){
            furnished = {$in: [false,true]}
        }

        let type;
        if (req.query.type === undefined || req.query.type === 'all') {
            type = { $in: ['sell', 'rent'] };
        } else {
            type = req.query.type;
        }

        const searchTerm = req.query.searchTerm || ''
        const sort = req.query.sort || 'createdAt'
        const order = req.query.order || 'desc'

        const listings = await Listing.find({
            description:{$regex: searchTerm, $options:'i'},
            offer,
            furnished,
            parking,
            type
        }).sort({[sort]:order}).limit(limit).skip(startIndex)
        console.log(listings)
        
        return resp.status(200).json(listings)
    } catch (error) {
        next(error)
    }

}

// exports.getAllListing = async (req, resp, next) => {
//     try {
//         const searchTerm = req.query.searchTerm || '';
//         let offer = req.query.offer;
//         if (offer === undefined) {
//             offer = { $in: [false, true] };
//         } else {
//             offer = offer === 'true';
//         }

//         let parking = req.query.parking;
//         if (parking === undefined) {
//             parking = { $in: [false, true] };
//         } else {
//             parking = parking === 'true';
//         }

//         const query = {
//             description: { $regex: searchTerm, $options: 'i' },
//             offer,
//             parking
//         };

//         console.log('Step 3 - Query:', JSON.stringify(query, null, 2));

//         const listings = await Listing.find(query);
//         console.log('Step 3 - Listings:', listings);

//         return resp.status(200).json(listings);
//     } catch (error) {
//         next(error);
//     }
// };



// exports.getAllListing = async (req, resp, next) => {
//     try {
//         const listings = await Listing.find({});
//         console.log('All Listings:', listings);
//         return resp.status(200).json(listings);
//     } catch (error) {
//         next(error);
//     }
// };









