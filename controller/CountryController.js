const CountrySchema =  require('../model/CountrySchema');


const createCountry = async (req, res) => {

    try {

        const { countryName,file, countryCode } = req.body;
        if(!countryName || !file || !countryCode){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const country = new CountrySchema({
            //the client side must send the file resource
            //need to upload the icon into S3 bucket amd then you can get the response body.
            //client sends the ids of all the available countries, and the system must find all the countries from the request
            countryName: countryName,
            flag:{
                hash:'',
                resourceUrl:'https://www.gep.com/prod/s3fs-public/blog-images/how-a-solid-foundation-is-critical-to-category-management-success.jpg',
                fileName:'Temp File Name',
                directory:'Temp Directory'
            },
            countryCode:countryCode,
        });

        const saveData = await country.save();
        return res.status(201).json({ code:201, message:'Country created successfully', data:saveData});

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }


}

const updateCountry = async (req, res) => {
    try {

        const { countyName,countryCode } = req.body;
        if(!countyName || !countryCode){
            return res.status(400).json({
                message:'Please provide all the required fields'
            })
        }

        const updateData = await CountrySchema.findOneAndUpdate({'_id':req.params.id},{
            $set:{
                countyName:countyName,
                countryCode:countryCode
            }
        },{new:true});

        return res.status(200).json({code:200 , message:"Country has been updated...",data:updateData})

    } catch (error) {
        res.status(500).json({ code:500, message:'Internal server error', error:error.message});
    }
}

const deleteCountry = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const deleteData =
            await CountrySchema.findOneAndDelete({'_id':req.params.id});

        return res.status(204).json({code:204 , message:"Country has been deleted...",data:deleteData})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findCountryById = async (req, res) => {
    try{
        if(!req.params.id){
            return res.status(400).json({code:400 ,message:"fields are missing"})
        }
        const findData =
            await CountrySchema.findById({'_id':req.params.id});

        if(findData){
            return res.status(200).json({code:200 , message:"Country data found ...",data:findData})
        }
        return res.status(404).json({code:404 , message:"Country data not found ...",data:null})

    }catch (error){
        res.status(500).json({ code:500, message:'Internal server error', error:error.message})
    }
}

const findAllCountry = async (req, res) => {

    try{
        const { searchText='',page=1,size=10} = req.query;

        const filter = searchText
            ? { categoryName: { $regex: searchText, $options: "i" } }
            : {};

        const countryList = await CountrySchema.find(filter)
            .skip((page-1)*size)
            .limit(parseInt(size));

        const count = await CountrySchema.countDocuments(filter);
        res.status(200).json({message:"Country List.....",list:countryList,count:count});

    }catch(e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {
    createCountry,
    updateCountry,
    deleteCountry,
    findCountryById,
    findAllCountry
}