import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.MY_CLOUD_NAME, 
  api_key: process.env.MY_API_KEY, 
  api_secret: process.env.API_SECRET_KEY
});

const uploadOnCloudinary = async (localfilePath) => {
    try{
        if(!localfilePath)return null

        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto"
        })
        // console.log("File is uploaded successfully",response.url)
        // const publicId = response.public_id
        // console.log("Response from cloudinary:", response)
        // console.log("PublicID ",publicId)
        fs.unlinkSync(localfilePath)
        // return {
        //     response,
        //     publicId
        // }
        return response
    } catch(error){
        fs.unlinkSync(localfilePath)
        //remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

// const deleteImage = async(publicId) => {
//     try {
//         const result = await cloudinary.uploader.destroy(publicId);
//         console.log('Image deleted:', result);
//     }catch (error) {
//         console.error('Error deleting image:', error);
//     }
// }


export {
    uploadOnCloudinary,
    // deleteImage
}