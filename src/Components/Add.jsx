import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../Services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({setUploadVideoStatus}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [videos,setVideos]=useState({
      id:'',
      caption:'',
      image:'',
      embedlink:''
    })
    console.log(videos);
    
    const embedVideoLink=(e)=>{
       const {value} = e.target
       console.log(value.slice(-11));
       const link=`https://www.youtube.com/embed/${value.slice(-11)}`
       setVideos({...videos,embedlink:link})
    }

    const handleUpload=async()=>{
        const {id,caption,image,embedlink}=videos
        if(!id || !caption || !image || !embedlink){
          toast.warning('please fill the form Completely..!!')
        }

        else{
          const response=await uploadVideo(videos)
          console.log(response);
          if(response.status>=200 && response.status<300){
            setUploadVideoStatus(response.data)
            toast.success('uploaded successfully')
            handleClose()
          }
          else{
            console.log(response);
            toast.error('Something went wrong...try again Later..')
          }
          
        }
    }

  return (
    <>
    <div className="d-flex align-items-center container">
      <h5>Upload New Videos</h5>
    <button  onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-down fs-5"></i></button>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film me-2 text-warning"></i>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='border border-secondary rounded p-3'>
          <Form.Group className="mb-3"  controlId="formBasicEmail">
                 <Form.Control onChange={(e)=>setVideos({...videos,id:e.target.value})} type="text" placeholder="Enter Video id"  />
   </Form.Group>  

            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={(e)=>setVideos({...videos,caption:e.target.value})} type="text"  placeholder="Enter Video Caption" />
            </Form.Group>  

            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={(e)=>setVideos({...videos,image:e.target.value})} type="text" placeholder="Enter Video Image Url" />
            </Form.Group> 

            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={embedVideoLink}  type="text"  placeholder="Enter Youtube Video Link" />
            </Form.Group>  
          </form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center'>
          
          <Button onClick={handleUpload}  variant="success">Upload</Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    
    </>
  )
}

export default Add