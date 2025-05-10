const DiscountSchema =  require('../model/DiscountSchema');


const createDiscount = async (req, res) => {

    try {

        const { discountName, percentage, startDate,endDate,lastUpdate } = req.body;
        if(!discountName || !percentage || !startDate || !endDate || !lastUpdate){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const discount = new DiscountSchema({
            discountName: discountName,
            percentage:percentage,
            startDate:startDate,
            endDate:endDate,
            lastUpdate:lastUpdate
        });

       const saveData = await discount.save();
       return res.status(201).json({ code:201, message:'Discount created successfully', data:saveData});

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }


}

const updateDiscount = async (req, res) => {
    try {

        const { discountName, percentage, startDate,endDate,lastUpdate } = req.body;
        if(!discountName || !percentage || !startDate || !endDate || !lastUpdate){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }
        const updateData = await DiscountSchema.findOneAndUpdate({'_id':req.params.id},{
            $set:{
                discountName: discountName,
                percentage:percentage,
                startDate:startDate,
                endDate:endDate,
                lastUpdate:lastUpdate
            }
        },{new:true});

        return res.status(200).json({code:200 , message:"Discount has been updated...",data:updateData})

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }
}

const deleteDiscount = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const deleteData =
            await DiscountSchema.findOneAndDelete({'_id':req.params.id});

        return res.status(204).json({code:204 , message:"Discount has been deleted...",data:deleteData})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findDiscountById = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const findData =
            await DiscountSchema.findById({'_id':req.params.id});

        if(findData){
            return res.status(200).json({code:200 , message:"Discount data found ...",data:findData})
        }
        return res.status(404).json({code:404 , message:"Discount data not found ...",data:null})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findAllDiscount = async (req, res) => {

    try{
        const { searchText='',page=1,size=10} = req.query;

        const filter = searchText
            ? { categoryName: { $regex: searchText, $options: "i" } }
            : {};

        const discount = await DiscountSchema.find(filter)
            .skip((page-1)*size)
            .limit(parseInt(size));

        const count = await DiscountSchema.countDocuments(filter);
        res.status(200).json({message:"Discount List.....",list:discount,count:count});

    }catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    createDiscount,
    updateDiscount,
    deleteDiscount,
    findDiscountById,
    findAllDiscount
}