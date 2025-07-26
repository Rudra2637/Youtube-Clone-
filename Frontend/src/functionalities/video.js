import axios from 'axios'

export class VideoService{

    async createVideo(data){
        const formData = new FormData()
        formData.append('title',data.title)
        formData.append('description',data.description)
        formData.append('videoFile',data.video[0])
        formData.append('thumbnail',data.thumbnail[0])

        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/`,formData,{withCredentials:true})
            if(response) return response.data
        } catch (error) {
            console.error("Error in uploading a Video ",error)
            throw error
        }
    }
    async getChannelStats(){
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/stats`,{withCredentials:true})
            return response.data;
        } catch (error) {
            console.error("Error in get Channel Stats ",error)
            throw error
        }
        
    }
    async getAllVideos() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/`,{withCredentials:true})
            return response.data
        } catch (error) {
            console.error("Error in fetching all videos ",error)
            throw error
        }
    }
    async getChannelVideos(){
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/videos`,{withCredentials:true})
            return response.data;
        } catch (error) {
            console.error("Error in get Channel Stats ",error)
            throw error
        }
        
    }
    async getLikedVideos() {
        try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/likes/videos`,{withCredentials:true}) 
            return response.data
        }
        catch(error){
            console.error("Error in fetching Liked videos ",error)
            throw error
        }
    }
    async getVideoById(id){
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/${id}`,{withCredentials:true})
            if(response)return response.data
        } catch (error) {
            console.error("Error in getting video By id ",error)
            throw error
        }
    }
    async likeVideo(id){
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/likes/toggle/v/${id}`,{withCredentials:true})
            if(response)return response.data
        } catch (error) {
            console.error("Error in liking video ",error)
            throw error
        }
    }
}

const videoService = new VideoService()

export default videoService