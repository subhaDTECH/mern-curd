import React,{useState,useEffect} from 'react'
import FormComponent from "./FormComponent"
import "./App.css"
import axios from "./axios"

const VacinationApp = () => {
  const [user,setUser]=useState([])
  const [updateData,setUpdateData]=useState({
    id:"",
    name:"",
    email:"",
    phone:"",
    aadhar:"",
    status:"",
  })
  console.log("user->",user)
  console.log("update->",updateData)
  const FtechAllUser=async()=>{
      try{
        const res=await axios.get('/user/gets');
        setUser(res.data)

      }catch(e){
          console.log(e)
      }

  }
  useEffect(()=>{
      FtechAllUser();
  },[])
  //update user
  const updateUser=async(id)=>{
      const res=await axios.get(`/user/get/${id}`);
      if(res.status===200){
         setUpdateData({...updateData,id:res.data._id,name:res.data.name,email:res.data.email,phone:res.data.phone,aadhar:res.data.aadhar,status:res.data.status})
      }

  }

  const deleteUser=async(id)=>{
     const res=await axios.delete(`/user/delete/${id}`)
     if(res.status===200){
         alert("User Delete successfully")
         window.location='/';
     }else{
         alert(" User not  delete")
     }
  }
  //handele update
  let name;
  let value; 
  const handleUpdate=(e)=>{
      name=e.target.name;
      value=e.target.value;
      setUpdateData({...updateData,[name]:value})
  }
  let upDateId;
  const UpdateFormSubmit=async(e)=>{
      e.preventDefault();
      const res=await axios.patch(`/user/update/${updateData.id}`,{
          name:updateData.name,
          email:updateData.email,
          phone:updateData.phone,
          aadhar:updateData.aadhar,
          status:updateData.status,
      })
      console.log(res)
      if(res.status===200){
          alert('User Update Successfully !!!!')
          window.location='/';
      }else{
          alert("User not updated")
      }
      console.log("e",e)
      
    //   const res=await axios.patch(`/user/update/${}`)

  }
    return (
        <>
        <div className="vacination__app">
              <div className="container-fluid">
                   <h4 className="text-center">MERN CURD PROJECT</h4>
                 <h3 className="text-center alert alert-info">Vacination Table</h3>
                    <div className="row">
                        <div className="col-md-4 col-12 mx-auto">
                         <h4>ADD USER</h4>
                               <FormComponent/>  
                        </div>
                        <div className="col-md-8 col-12 mx-auto respon__table">
                         <h3 className='alert alert-success mt-3'>Vacination Table</h3>
                        <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Addhar</th>
      <th scope="col">status</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
      
    </tr>
  </thead>
                {
                    user.map((CurUser,index)=>{
                         return (
                   
                    <tbody key={index}>
                            <tr>
                            <th scope="row">{CurUser.name}</th>
                            <td>{CurUser.email}</td>
                            <td>{CurUser.phone}</td>
                            <td>{CurUser.aadhar}</td>
                            <td>{CurUser.status}</td>
                            <td  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>updateUser(CurUser._id)}>
                           
                                <button className="btn btn-warning">Edit</button>
                            </td>


  
                <td  onClick={()=>deleteUser(CurUser._id)}>
                                <button  className="btn btn-danger">
                                    Delete
                                </button>
                            </td>



                            </tr>
                   </tbody>
                   
                   
                         )
               
                    })
                }
                
   
    
 
                    </table>
                        </div>

                    </div>

              </div>
        </div>
        



<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form action="">
            <p>Name</p>
            <input
            className="form-control my-2 py-3"
             onChange={handleUpdate}           
             type="text" name="name" value={updateData.name} />
              
              <p>Email</p>
               <input
            className="form-control my-2 py-3"
             onChange={handleUpdate}           
             type="text" name="email" value={updateData.email} />

               <p>Phone No</p>
               <input
            className="form-control my-2 py-3"
             onChange={handleUpdate}           
             type="text" name="phone" value={updateData.phone} />

           <p>Aadhar No</p>
               <input
            className="form-control my-2 py-3"
             onChange={handleUpdate}           
             type="text" name="aadhar" value={updateData.aadhar} />

             <p>Status</p>
               <input
            className="form-control my-2 py-3"
             onChange={handleUpdate}           
             type="text" name="name" value={updateData.status} />
              <button 
              type="submit"
              onClick={UpdateFormSubmit}
               className="btn btn-primary">Save changes</button>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
</>
    )
}

export default VacinationApp
