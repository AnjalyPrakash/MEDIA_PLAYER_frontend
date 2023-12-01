import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { displayVideo } from '../Services/allApi'

function View({uploadVideoStatus}) {

  const [allVideo,setAllVideo]=useState([])
  const [deleteVideoStatus,setDeleteVideoStatus]=useState(false)


  const displayUploadedVideos=async()=>{
   const response=await displayVideo()
  //  console.log(response);
   const {data}=response
  //  console.log(data);
  setAllVideo(data)
  }
  
  console.log(allVideo);

  useEffect(()=>{
    displayUploadedVideos()
    setDeleteVideoStatus(false)
  },[uploadVideoStatus,deleteVideoStatus])


  return (
    <>
<Row className='container'>
    {allVideo?.length>0?
    allVideo.map((vid)=>(
      <Col sm={12} md={6} lg={4} xl={3}>
      <VideoCard item={vid} setDeleteVideoStatus={setDeleteVideoStatus}/>
       </Col>
    ))
    :
    <p className='text-danger text-center fs-3'>nothing to display</p>
    }
 </Row>
    </>
  )
}

export default View