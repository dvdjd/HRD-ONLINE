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

//getUser
export const getUser = async (id) => {
    try{
        const {data} = await axios.post(`${api}/getUser`, id)
        return data.data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//reactPost
export const reactPost = async (react) => {
    try{
        const {data} = await axios.post(`${api}/react`, react)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//reactPost
export const countReact = async (postID) => {
    try{
        const {data} = await axios.post(`${api}/countReact`, postID)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//checkReact
export const checkReact = async (details) => {
    try{
        const {data} = await axios.post(`${api}/checkReact`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//postComment
export const postComment = async (details) => {
    try{
        const {data} = await axios.post(`${api}/comment`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//getComments
export const getComments = async (details) => {
    try{
        const {data} = await axios.post(`${api}/getComments`, details)
        return data.data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//getReact
export const getReact = async (details) => {
    try{
        const {data} = await axios.post(`${api}/getReact`, details)
        return data.data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//getReact
export const deletePost = async (details) => {
    try{
        const {data} = await axios.post(`${api}/removePost`, details)
        return data.status
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//hr_uploads
export const hrUpload = async (details) => {
    try{
        const {data} = await axios.post(`${api}/hrUpload`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//getHrUploads
export const getHrUpload = async (details) => {
    try{
        const {data} = await axios.post(`${api}/getHrUpload`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//getUploadItems
export const getUploadItems = async (details) => {
    try{
        const {data} = await axios.post(`${api}/getUploadItems`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//updateItem
export const updateItem = async (details) => {
    try{
        const {data} = await axios.post(`${api}/updateItem`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//removeItem
export const removeItem = async (details) => {
    try{
        const {data} = await axios.post(`${api}/removeItem`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//getByMenu
export const getByMenu = async (details) => {
    try{
        const {data} = await axios.post(`${api}/getByMenu`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}

//Send Email
export const sendMail = async (details) => {
    try{
        const {data} = await axios.post(`${api}/sendMail`, details)
        return data
    }
    catch(err){
        console.log(`Ne may error : ${err}`)
        return {data: [], status: 'failed'}
    }
}