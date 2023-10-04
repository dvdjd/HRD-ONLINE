import axios from "axios";
const api = import.meta.env.VITE_API_URL

//birthday
export const birthdayCelebrants = async () => {
    try{
        const {data} = await axios.post(`${api}/birthday`, {})
        return data.data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return []
    }
}

//login
export const login = async (loginDetails) => {
    try{
        const {data} = await axios.post(`${api}/login`, loginDetails)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//post
export const newPost = async (postDetails) => {
    try{
        const {data} = await axios.post(`${api}/post`, postDetails)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//fetchPost
export const getPost = async () => {
    try{
        const {data} = await axios.post(`${api}/getPosts`,)
        return data.data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}