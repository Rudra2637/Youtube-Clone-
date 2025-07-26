import axios from "axios"

export class CommentService{
    async getComments(id) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comments/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
            {withCredentials:true})
            
            return response.data
        } catch (error) {
            console.error("Error in fetching in comment ",error)
            throw error
        }
    }
    async addComment(id,text){
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comments/${id}`, {
                content: text,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
            {withCredentials:true})
            return response.data
        } catch (error) {
            console.error("Error in Adding Comment ",error)
            throw error
        }
    }
}

const  commentService = new CommentService()

export default commentService