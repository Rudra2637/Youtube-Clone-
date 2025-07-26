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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`,formData,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
                { withCredentials: true })
            
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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,dataToSend,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
                {withCredentials:true})
            return response.data
        }
        catch(error){
            console.error("Error logging in: ",error)
            throw error
        }
    }
    async logout() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
                {withCredentials:true})
            return response.data
        }
        catch (error){
            console.error("Error loggin out: ",error)
            throw error
        }
    }
    async getUserChannelProfile(userName) {
        try {
            const  data  = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/c/${userName}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
                {withCredentials:true});
            return data;
        } catch (error) {
            console.error("Error fetching user channel profile:", error);
            throw error;
        }
    }
    async getCurrentUser() {
        try{
            const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/current-user`,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
                {withCredentials:true})
            // console.log("Current user data: ",data)
            return data
        }
        catch(error){
            console.error("Error fetching current user: ",error)
            throw error
        }
    }
    async updateAccount(fullName,email){
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update-account`,{
                fullName:fullName,
                email:email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            },
            {withCredentials:true})
            return response.data
        } catch (error) {
            console.error("Error in updating user Details ",error)
            throw error
        }
    }


}


const authService = new AuthService

export default authService