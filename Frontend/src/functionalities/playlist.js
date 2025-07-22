import axios from "axios";

export class PlaylistService{
    async createPlaylist(name,content){
        try {
            const response = await axios.post("/api/v1/playlist/",{
                name:name,
                description:content
            })
            return response.data
        } catch (error) {
            console.error("Error in Creating Playlist ",error)
            throw error
        }
    }
    async getUserPlaylist(id){
        try {
            const response = await axios.get(`/api/v1/playlist/user/${id}`)
            return response.data
        } catch (error) {
            console.error("Error in fetching Playlist ",error)
            throw error
        }
    }
    async addVideo(videoId,playlistId){
        try {
            const response = await axios.patch(`/api/v1/playlist/add/${videoId}/${playlistId}`)
            return response.data
        } catch (error) {
            console.error("Error in adding Video ",error)
            throw error
        }
    }
    async removeVideo(videoId,playlistId){
        try{
            const response = await axios.patch(`/api/v1/playlist/remove/${videoId}/${playlistId}`)
            return response.data
        }
        catch(error){
            console.error("Error in removing video ",error)
            throw error
        }
    }
}

const playlistService = new PlaylistService()
export default playlistService