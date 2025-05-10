const ReviewSchema =  require('../model/ReviewSchema');


const createReview = async (req, res) => {

    try {

        const { orderId, message, userId,displayName,productId,ratings,createdDate} = req.body;
        if(!orderId || !message || !userId || !displayName || !productId || !ratings || !createdDate){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const review = new ReviewSchema({
            orderId: orderId,
            message:message,
            userId:userId,
            displayName:displayName,
            productId:productId,
            ratings:ratings,
            createdDate:createdDate,
        });

       const saveData = await review.save();
       return res.status(201).json({ code:201, message:'Review created successfully', data:saveData});

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }


}

const updateReview = async (req, res) => {
    try {

        const { orderId, message, userId,displayName,productId,ratings,createdDate} = req.body;
        if(!orderId || !message || !userId || !displayName || !productId || !ratings || !createdDate){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const updateData = await ReviewSchema.findOneAndUpdate({'_id':req.params.id},{
            $set:{
                orderId: orderId,
                message:message,
                userId:userId,
                displayName:displayName,
                productId:productId,
                ratings:ratings,
                createdDate:createdDate,
            }
        },{new:true});

        return res.status(200).json({code:200 , message:"Review has been updated...",data:updateData})

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }
}

const deleteReview = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const deleteData =
            await ReviewSchema.findOneAndDelete({'_id':req.params.id});

        return res.status(204).json({code:204 , message:"Review has been deleted...",data:deleteData})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findReviewById = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const findData =
            await ReviewSchema.findById({'_id':req.params.id});

        if(findData){
            return res.status(200).json({code:200 , message:"Review data found ...",data:findData})
        }
        return res.status(404).json({code:404 , message:"Review data not found ...",data:null})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findAllReview = async (req, res) => {

    try{
        const {page=1,size=10} = req.query;


        const reviewList = await ReviewSchema.find()
            .skip((page-1)*size)
            .limit(parseInt(size));

        const count = await ReviewSchema.countDocuments();
        res.status(200).json({message:"Review List.....",list:reviewList,count:count});

    }catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    findReviewById,
    findAllReview
}