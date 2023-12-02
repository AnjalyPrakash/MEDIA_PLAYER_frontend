import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistory, displayHistory } from './Services/allApi'


function WatchHistory() {

  const [history,setHistory]=useState([])

  const allHistory=async()=>{
    const {data}=await displayHistory()
    console.log(data);
    setHistory(data)
  }
  console.log(history);

  const removeHistory=async(id)=>{
    await deleteHistory(id)
    //to get remainaing history
    allHistory()
  }

  useEffect(()=>{
    allHistory()
  },[])

  return (
    <div>
         <div className='container mt-3 d-flex justify-content-between'>
      <h3>Watch History</h3>
      <Link to={'/home'} className='d-flex align-items-center ' style={{textDecoration:"none",color:"white",fontSize:"20px"}}><i class="fa-solid fa-arrow-left fa-beat me-2"></i>  Back To Home</Link>
    </div>

    <table className='table mt-5 mb-5 container' >
      <thead >
        <tr >
          <th className='text-warning'>#</th>
          <th className='text-warning'>Caption</th>
          <th className='text-warning'>URL</th>
          <th className='text-warning'>Time Stage</th>
          <th className='text-warning'>Action</th>
        </tr>
      </thead>
      <tbody>
        
          {history?.length>0?
          history.map((item,index)=>(
            <tr >
            <td style={{color:'white'}}>{index+1}</td>
            <td style={{color:'white'}}>{item.caption}</td>
            <td style={{color:'white'}}><a href={`${item.embedlink}?autoplay=1`} target='_blank'> {item.embedlink}</a></td>
            <td style={{color:'white'}}>{item.timeStamp}</td>
            <td style={{color:'white'}}><button className='btn btn-danger' onClick={()=>removeHistory(item?.id)} ><i class="fa-solid fa-trash-can"></i></button></td>
          </tr>
          ))   
      :<p className='align-items-center d-flex justify-content-center text-danger text-center fs-2 mt-5'>Nothing to display</p>  
      }
      </tbody>
    </table>
    </div>
  )
}

export default WatchHistory