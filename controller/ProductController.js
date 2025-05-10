const ProductSchema =  require('../model/ProductSchema');


const createProduct = async (req, res) => {

    try {

        const { productName,file, actualPrice,oldPrice,description,discount,categoryId ,qty} = req.body;
        if(!productName || !file || !actualPrice || !oldPrice || !description || !discount || !categoryId || !availableCountries || !qty){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const product = new ProductSchema({

            productName: productName,
            images:[
                {
                    hash: '',
                    resourceUrl: 'https://www.gep.com/prod/s3fs-public/blog-images/how-a-solid-foundation-is-critical-to-category-management-success.jpg',
                    fileName: 'Temp File Name',
                    directory: 'Temp Directory'
                }
            ],
            actualPrice:actualPrice,
            oldPrice:oldPrice,
            description:description,
            discount:discount,
            categoryId:categoryId,
            qty:qty,
        });
       const saveData = await product.save();
       return res.status(201).json({ code:201, message:'product created successfully', data:saveData});

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }


}

const updateProduct = async (req, res) => {
    try {

        const { productName,file, actualPrice,oldPrice,description,discount,categoryId ,qty} = req.body;
        if(!productName || !file || !actualPrice || !oldPrice || !description || !discount || !categoryId || !availableCountries || !qty){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const updateData = await ProductSchema.findOneAndUpdate({'_id':req.params.id},{
            $set:{
                productName: productName,
                actualPrice:actualPrice,
                oldPrice:oldPrice,
                description:description,
                discount:discount,
                categoryId:categoryId,
                qty:qty,
            }
        },{new:true});

        return res.status(200).json({code:200 , message:"Product has been updated...",data:updateData})

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }
}

const deleteProduct = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const deleteData =
            await ProductSchema.findOneAndDelete({'_id':req.params.id});

        return res.status(204).json({code:204 , message:"Product has been deleted...",data:deleteData})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findProductById = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const findData =
            await ProductSchema.findById({'_id':req.params.id});

        if(findData){
            return res.status(200).json({code:200 , message:"Product data found ...",data:findData})
        }
        return res.status(404).json({code:404 , message:"Product data not found ...",data:null})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findAllProduct = async (req, res) => {

    try{
        const { searchText='',page=1,size=10} = req.query;

        const filter = searchText
            ? { productName: { $regex: searchText, $options: "i" } }
            : {};

        const productList = await ProductSchema.find(filter)
            .skip((page-1)*size)
            .limit(parseInt(size));

        const count = await ProductSchema.countDocuments(filter);
        res.status(200).json({message:"Product List.....",list:productList,count:count});

    }catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    findAllProduct
}