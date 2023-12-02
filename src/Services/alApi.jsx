//add video

import { commonAPI } from "./commonAPI"
import { serverUrl } from "./serverUrl"


//upload video

 export const uploadVideo=async(reqBody)=>{
   return await commonAPI('POST',`${serverUrl}/video`,reqBody)

}

//display video

export const displayVideo=async()=>{
  return await commonAPI('GET',`${serverUrl}/video`,'')
}

//delete video

export const deleteAVideo=async(id)=>{
 return await commonAPI('DELETE',`${serverUrl}/video/${id}`,{})
}

//add to history

export const addToHistory=async(videodetails)=>{
  return await commonAPI('POST',`${serverUrl}/history`,videodetails)

}

//display history

export const displayHistory=async()=>{
   return await commonAPI('GET',`${serverUrl}/history`,'')
}

//delete history

export const deleteHistory=async(id)=>{
  return await commonAPI('DELETE',`${serverUrl}/history/${id}`,{})
}

//upload category

export const uploadCategory=async(body)=>{
    return await commonAPI('POST',`${serverUrl}/category`,body)
}

//display category
 
export const displayCategory=async()=>{
  return await commonAPI('GET',`${serverUrl}/category`,'')
}

//delete category

export const deleteACategory=async(id)=>{
  return await commonAPI('DELETE',`${serverUrl}/category/${id}`,{})
}

//to get particular video from http://localhost:4000/video

export const getAVideo=async(id)=>{
  return await commonAPI('GET',`${serverUrl}/video/${id}`,'')
}

//update category with new videos

export const updateCategory=async(id,body)=>{
  return await commonAPI('PUT',`${serverUrl}/category/${id}`,body)
}

//remove video from  category

export const removeVidFromCategory=async(id)=>{
  return await commonAPI('DELETE',`${serverUrl}/video/${id}`,{})
}