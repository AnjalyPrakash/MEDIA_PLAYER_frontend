import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { addToHistory, deleteAVideo } from '../Services/AllApi';

function VideoCard({item,setDeleteVideoStatus}) {
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const handleShow =async()=>{setShow(true)
    
     const {caption,embedlink}=item
     let today=new Date()
     console.log(today);
     const timeStamp=new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today)
     console.log(timeStamp);
     let videoDetails ={
      caption,embedlink,timeStamp
     }
     
    const response = await addToHistory(videoDetails)
    console.log(response);

    
      
    }
    
   const removeVideo =async(id)=>{
    await deleteAVideo(id)
    setDeleteVideoStatus(true)
   }


   const cardDrag=(e,id)=>{
      console.log(`the id of videocard dragged ${id}`);
      e.dataTransfer.setData('videoId',id)
   }

  return (
    <>
    <div className=' mb-3 me-5 mt-3 container'>
      <Card style={{ width: '100%',height:'400px' }} draggable onDragStart={(e)=>cardDrag(e,item.id)}>
        <Card.Img height={'400px'} width={'100%'} variant="top" src={item.image} onClick={handleShow} />
        <Card.Body>
          <Card.Title className='d-flex justify-content-between align-items-center'>
              <h6>{item.caption}</h6>
               <Button onClick={()=>removeVideo(item?.id)} className='btn btn-danger d-flex ms-auto p-2' ><i class="fa-solid fa-trash-can"></i></Button>
          </Card.Title>
          
        </Card.Body>
      </Card>
      
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{item.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="450" height="400" src={`${item.embedlink}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default VideoCard