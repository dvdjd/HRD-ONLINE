import moment from "moment";
// import React, {Component} from 'react'
// import {render} from 'react-dom'
// import { EditorState } from 'draft-js'
// import {Editor} from 'react-draft-wysiwyg'

export const capitalizeWords = (str) => {
    if(str === null){
        return ''
    }
    else{
        return str
            .toLowerCase() // Convert the entire string to lowercase
            .split(' ') // Split the string into an array of words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(' '); // Join the words back into a single string
    }
    
};

export const getTime = (time) => {
    const today = new Date()
    const today2 = new Date()
    today.setHours(0, 0, 0, 0)
    if(moment(time).tz('Asia/Manila').format('MMMM DD, YYYY') === moment(today).tz('Asia/Manila').format('MMMM DD, YYYY')){
        if(today2.getHours() == moment(time).tz('Asia/Manila').format('HH')){
            if(today2.getMinutes() == moment(time).tz('Asia/Manila').format('MM')){
                return 'Just Now'
            }
            else{
                return `${today2.getMinutes() - moment(time).tz('Asia/Manila').format('MM')} Minutes Ago`
            }
        }
        else{
            return `${today2.getHours() - moment(time).tz('Asia/Manila').format('HH')} Hours Ago`
        }
    }
    else{
        return moment(time).tz('Asia/Manila').format('MMMM DD, YYYY hh:MM A')
    }
    
}

export const isAdmin = () => {
    let num = 0
    if(sessionStorage.getItem('isLogin') === 'true'){
        JSON.parse(sessionStorage.getItem('user')).Administrator === 1 ? num = 1 : num = 0
    }
    return num
}

export const isDeptESH = () => {
    let num = 0
    if(sessionStorage.getItem('isLogin') === 'true'){
        JSON.parse(sessionStorage.getItem('user')).Department === "ESH" ? num = 1 : num = 0
    }
    return num
}

export const timeAgo = (date) => {
    const now = moment();
    const diffInMinutes = now.diff(moment(date), 'minutes');
    const diffInHours = now.diff(moment(date), 'hours');
    const diffInDays = now.diff(moment(date), 'days');

    if (diffInMinutes < 1) {
        return "just now";
    } else if (diffInHours < 2) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours === 2) {
        return "2 hours ago";
    } else if (diffInDays === 1) {
        return "yesterday";
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else {
        return moment(date).format('MMMM D, YYYY');
    }
}