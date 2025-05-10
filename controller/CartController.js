const CartSchema =  require('../model/CartSchema');


const createCartRecord = async (req, res) => {

    try {

        const { userId,productId, createdDate,qty} = req.body;
        if(!userId || !productId || !createdDate || !qty){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const cart = new CartSchema({
            userId:userId,
            qty:qty,
            productId:productId,
            createdDate:createdDate,
        });
       const saveData = await cart.save();
       return res.status(201).json({ code:201, message:'Cart record has been  created successfully', data:saveData});

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }


}

const updateCartRecord = async (req, res) => {
    try {

        const { userId,productId, createdDate,qty} = req.body;
        if(!userId || !productId || !createdDate || !qty ){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const updateData = await CartSchema.findOneAndUpdate({'_id':req.params.id},{
            $set:{
                userId:userId,
                productId:productId,
                qty:qty,
                createdDate:createdDate,
            }
        },{new:true});

        return res.status(200).json({code:200 , message:"Cart record has been updated...",data:updateData})

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }
}

const deleteCartRecord = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const deleteData =
            await CartSchema.findOneAndDelete({'_id':req.params.id});

        return res.status(204).json({code:204 , message:"Cart record has been deleted...",data:deleteData})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findCartRecordById = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const findData =
            await CartSchema.findById({'_id':req.params.id});

        if(findData){
            return res.status(200).json({code:200 , message:"Cart data found ...",data:findData})
        }
        return res.status(404).json({code:404 , message:"Cart data not found ...",data:null})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findAllCartRecords = async (req, res) => {

    try{
        const { page=1,size=10} = req.query;

        const CartList = await CartSchema.find()
            .skip((page-1)*size)
            .limit(parseInt(size));

        const count = await CartSchema.countDocuments();
        res.status(200).json({message:"Cart record List.....",list:CartList,count:count});

    }catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    createCartRecord,
    updateCartRecord,
    deleteCartRecord,
    findCartRecordById,
    findAllCartRecords
}