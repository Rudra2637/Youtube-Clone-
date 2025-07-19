import axios from "axios"

export class AuthService {
    
    async createAccount(data) {
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('userName', data.userName);
        formData.append('email', data.email);
        formData.append('password', data.password);

        if (data.avatar && data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0]);  // <-- get File from FileList
        }
        if (data.CoverImage && data.CoverImage.length > 0) {
            formData.append('coverImage', data.CoverImage[0]);
        }

        try {
            const response = await axios.post('/api/v1/user/register',formData)
            return response.data
        } catch (error) {
            
            console.error("Error creating account:", error);
            throw error;
        }
    }
    async login(data){
        const dataToSend = {
            userName:data.userName,
            email:data.email,
            password:data.password,
        }
        try{
            const response = await axios.post('/api/v1/user/login',dataToSend)
            return response.data
        }
        catch(error){
            console.error("Error logging in: ",error)
            throw error
        }
    }
    async logout() {
        try {
            const response = await axios.post('/api/v1/user/logout')
            return response.data
        }
        catch (error){
            console.error("Error loggin out: ",error)
            throw error
        }
    }
    async getUserChannelProfile(userName) {
        try {
            const  data  = await axios.get(`/api/v1/user/c/${userName}`);
            return data;
        } catch (error) {
            console.error("Error fetching user channel profile:", error);
            throw error;
        }
    }
    async getCurrentUser() {
        try{
            const data = await axios.get('api/v1/user/current-user')
            console.log("Current user data: ",data)
            return data
        }
        catch(error){
            console.error("Error fetching current user: ",error)
            throw error
        }
    }


}


const authService = new AuthService

export default authService