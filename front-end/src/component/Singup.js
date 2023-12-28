import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Singup() {
   const [name, setName]= useState('');
   const [email, setEmail]= useState('');
   const [password, setPassword]= useState('');
   const navigate = useNavigate();


   useEffect(() => {
          const auth = localStorage.getItem('user');
          if(auth){
               navigate('/')
          }
   },[])

   const sub =  async(e)=>{
         e.preventDefault();
         console.log(name, email, password);
         let result = await fetch('http://localhost:300/register',{
              method:'post',
              body: JSON.stringify({name,email,password}),
              headers:{
                    'Content-Type':'application/json'
              },
         });
         result = await result.json();
         console.warn(result);
         if(result.email){
            localStorage.setItem('user',JSON.stringify(result));
            if(result){
               navigate('/')
            }
         }else{
           alert("user is alredy exit");
               console.log(result.email)
         }
    }
  return (
    <div className='from_box'>
      <h1>Register</h1>
       <form onSubmit={sub} >
          <input type="text" name="name" placeholder='Enter name'
          value={name} onChange={(e)=> setName(e.target.value)}/><br></br>
          <input type="email" name="email" placeholder='Enter email'
           value={email} onChange={(e)=> setEmail(e.target.value)}/><br></br>
          <input type="password" name="password" placeholder='password'
          value={password} onChange={(e)=> setPassword(e.target.value)}/><br></br>
          <button type='submit'>sinUp</button>
       </form> 
    </div>
  )
}

export default Singup