import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row } from 'react-bootstrap';
import VideoCard from './VideoCard';
import { deleteACategory, displayCategory, getAVideo, updateCategory, uploadCategory } from './Services/allApi';
function Category() {

  const [viewCategory,setViewCategory]=useState([])

  const [category,setCategory] =useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const addCategory=async()=>{
  console.log(category);

    if(category){
    let body={
      category,
      allvideos:[]
   }

   const response = await uploadCategory(body)
   console.log(response);
   if(response.status>=200 && response.status<300){ 
    // setViewCategory()
   toast.success('Category added successfully')
   setCategory("")
   handleClose()
  }
  else{
    toast.error('something went wrong.Please try again later.')
  }
  }
  else{
    toast.warning('please fill the form completely..')
  }
    
  
  }

  const allCategory =async()=>{
    const {data}= await displayCategory()
    setViewCategory(data)
   }
   console.log(viewCategory);


   const removeCategory=async(id)=>{
    await deleteACategory(id)

    allCategory()
   }

   //function to prevent reload so that the data that we sent wont lost

   const dragOver =(e)=>{
    e.preventDefault()
   }
   
   const videoDrop=async(e,categoryid)=>{
      console.log('dropped on the category',categoryid);
      //to get the data sent from the video card
     let videoId=e.dataTransfer.getData("videoId")
     console.log(videoId);
    const {data}= await getAVideo(videoId)
    console.log(data);
    
    const selectedCategory =  viewCategory.find((item)=>item.id===categoryid)
    selectedCategory.allvideos.push(data)
    console.log(selectedCategory);

    await updateCategory(categoryid,selectedCategory)
    allCategory()
   }

    useEffect(()=>{
      allCategory()
    },[])

  return (
    <>
            <div className=' d-grid ms-3'>
        <button onClick={handleShow} className='btn btn-warning'>Add New Category</button>
       
    </div>

    {viewCategory?.length>0?
    viewCategory.map((item)=>(
      <div className='m-5 border border-secondary p-3 rounded' droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)}>
      <div className='d-flex justify-content-between align-items-center '  >
      <h6>{item.category}</h6> 
       <Button onClick={()=>removeCategory(item?.id)} className='btn btn-danger ms-2 '><i class="fa-solid fa-trash "></i></Button>
      </div>
  
  <Row>
    <Col>
  {item?.allvideos?.length>0?
  item?.allvideos?.map((card)=>(
    <VideoCard item={card} />
  ))
   :
    <p>nothing to display</p>
}
    </Col>
  </Row>
     </div>
    ))    
  :<p className='text-center text-danger fs-2 mt-5'>
  No Category Added
  </p> 
  }

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-pencil"></i>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='border border-secondary rounded p-3'> 

            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={(e)=>setCategory(e.target.value)} type="text" placeholder="Category name"/>
            </Form.Group> 
          </form>
        </Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center'>
         
          <Button onClick={addCategory} variant="success" >Add</Button>
          <Button  variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        <ToastContainer position='top-center' theme='colored' autoClose={2000}/>

    </>
  )
}

export default Category