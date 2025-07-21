import axios from "axios";

export class TweetService{
    async createTweet(data){
        const formData = new FormData()

        try {
            
        } catch (error) {
            console.error("Error in creating tweet ",error)
        }
    }
}

const tweetService = new TweetService()
export default tweetService