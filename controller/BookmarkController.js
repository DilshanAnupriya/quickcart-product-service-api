const BookmarkSchema =  require('../model/BookmarkSchema');


const createBookmark = async (req, res) => {

    try {

        const { userId,productId, createdDate} = req.body;
        if(!userId || !productId || !createdDate ){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const cart = new BookmarkSchema({
            userId:userId,
            productId:productId,
            createdDate:createdDate,
        });
       const saveData = await cart.save();
       return res.status(201).json({ code:201, message:'Bookmark record has been  created successfully', data:saveData});

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }


}

const updateBookmark = async (req, res) => {
    try {

        const { userId,productId, createdDate} = req.body;
        if(!userId || !productId || !createdDate){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const updateData = await BookmarkSchema.findOneAndUpdate({'_id':req.params.id},{
            $set:{
                userId:userId,
                productId:productId,
                createdDate:createdDate,
            }
        },{new:true});

        return res.status(200).json({code:200 , message:"Bookmark record has been updated...",data:updateData})

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }
}

const deleteBookmark = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const deleteData =
            await BookmarkSchema.findOneAndDelete({'_id':req.params.id});

        return res.status(204).json({code:204 , message:"Bookmark record has been deleted...",data:deleteData})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findBookmarkById = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const findData =
            await BookmarkSchema.findById({'_id':req.params.id});

        if(findData){
            return res.status(200).json({code:200 , message:"Bookmark data found ...",data:findData})
        }
        return res.status(404).json({code:404 , message:"Bookmark data not found ...",data:null})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findAllBookmark = async (req, res) => {

    try{
        const { page=1,size=10} = req.query;

        const BookmarkList = await BookmarkSchema.find()
            .skip((page-1)*size)
            .limit(parseInt(size));

        const count = await BookmarkSchema.countDocuments();
        res.status(200).json({message:"Bookmark List.....",list:BookmarkList,count:count});

    }catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    createBookmark,
    updateBookmark,
    deleteBookmark,
    findBookmarkById,
    findAllBookmark

}