const CategorySchema =  require('../model/CatergorySchema');


const createCategory = async (req, res) => {

    try {

        const { categoryName, file, countryIds } = req.body;
        if(!categoryName || !file || !countryIds){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const category = new CategorySchema({
            //client side ,ust send the file resource
            //need to upload the icon into S3 bucket amd then you can get the response body.
            //client send the ids of all the available countries, and the system must find all the countries from the request
            categoryName: categoryName,
            icon:{
                hash:'',
                resourceUrl:'https://www.gep.com/prod/s3fs-public/blog-images/how-a-solid-foundation-is-critical-to-category-management-success.jpg',
                fileName:'Temp File Name',
                directory:'Temp Directory'
            },
            availableCountries:[
                {
                    countryId: 'Temp-Id-1',
                    countryName:'Sri lanka',
                },
                {
                    countryId: 'Temp-Id-2',
                    countryName:'USA',
                },

            ] ,

        });

       const saveData = await category.save();
       return res.status(201).json({ code:201, message:'Category created successfully', data:saveData});

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }


}

const updateCategory = async (req, res) => {
    try {

        const { categoryName } = req.body;
        if(!categoryName){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const updateData = await CategorySchema.findOneAndUpdate({'_id':req.params.id},{
            $set:{
                categoryName:categoryName
            }
        },{new:true});

        return res.status(200).json({code:200 , message:"category has been updated...",data:updateData})

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }
}

const deleteCategory = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const deleteData =
            await CategorySchema.findOneAndDelete({'_id':req.params.id});

        return res.status(204).json({code:204 , message:"category has been deleted...",data:deleteData})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findCategoryById = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const findData =
            await CategorySchema.findById({'_id':req.params.id});

        if(findData){
            return res.status(200).json({code:200 , message:"category data found ...",data:findData})
        }
        return res.status(404).json({code:404 , message:"category data not found ...",data:null})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findAllCategory = async (req, res) => {

    try{
        const { searchText='',page=1,size=10} = req.query;

        const filter = searchText
            ? { categoryName: { $regex: searchText, $options: "i" } }
            : {};

        const categoryList = await CategorySchema.find(filter)
            .skip((page-1)*size)
            .limit(parseInt(size));

        const count = await CategorySchema.countDocuments(filter);
        res.status(200).json({message:"Category List.....",list:categoryList,count:count});

    }catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    findCategoryById,
    findAllCategory
}