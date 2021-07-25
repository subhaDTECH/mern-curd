import React,{useState} from 'react'
import axios  from './axios';

const FormComponent = () => {
const [userData,setUserData]=useState({
    name:"",
    email:"",
    phone:"",
    aadhar:"",
    status:"",
})
let name,value;
const handleChange=(e)=>{
    name=e.target.name;
    value=e.target.value;


    setUserData({...userData,[name]:value});

}
    const FormSubmit=async(e)=>{
        e.preventDefault();
        const res=await axios.post('/user/add',{
            name:userData.name,
            email:userData.email,
            phone:userData.phone,
            aadhar:userData.aadhar,
            status:userData.status,
        });
        console.log(res)
        if(res.status===201){
            alert("User Created successfully")
            window.location='/';
        }else{
            alert("User not Store")
        }

    }
    return (
        <div className="form__box">
           <form action="" autoComplete="off">
              <div  className="form-group my-4">
                   <input
                    value={userData.name}
                    onChange={handleChange}
                    className="form-control" type="text" name="name" placeholder="Enter User name" />
              </div>
              <div  className="form-group my-4">
                   <input 
                   value={userData.email}
                   onChange={handleChange}
                   className="form-control" type="email" name="email" placeholder="Enter User Email" />
              </div>
              <div  className="form-group my-4">
                   <input 
                   value={userData.phone}
                   onChange={handleChange}
                   className="form-control" type="number" name="phone" placeholder="Enter User phone no" />
              </div>
              <div  className="form-group my-4">
                   <input 
                   value={userData.aadhar}
                   onChange={handleChange}
                   className="form-control" type="number" name="aadhar" placeholder="Enter User Addhar no" />
              </div>
              <div  className="form-group my-4">
                   <input 
                   value={userData.status}
                   onChange={handleChange}
                   className="form-control" type="text" name="status" placeholder="Enter Status" />
              </div>
              <button type="submit" onClick={FormSubmit} className="btn btn-info">
                  Submit
              </button>

           </form>
            
        </div>
    )
}

export default FormComponent
