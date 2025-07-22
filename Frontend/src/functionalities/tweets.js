import axios from "axios";

export class TweetService{
    async createTweet(data){
        try {
            const response = await axios.post("/api/v1/tweets/",{
                content:data
            })    
            return response.data
        } catch (error) {
            console.error("Error in creating tweet ",error)
            throw error
        }
    }
    async getUserTweet(id){
        try {
            const response = await axios.get(`/api/v1/tweets/user/${id}`)
            return response.data
        } catch (error) {
            console.error("Error in fetching user Tweets ",error)
            throw error
        }
    }
    async deleteTweet(id){
        try {
            const response = await axios.delete(`/api/v1/tweets/${id}`)
            return response.data
        } catch (error) {
            console.error("Error in deleting user tweets ",error)
            throw error
        }
    }
    async updateTweet(id,data){
        try {
            const response = await axios.patch(`/api/v1/tweets/${id}`,{
                content:data
            })
            return response.data
        } catch (error) {
            console.error("Error in updating tweets ",error)
            throw error
        }
    }
}

const tweetService = new TweetService()
export default tweetService