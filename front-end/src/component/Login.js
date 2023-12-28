import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
function Login() {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const navigate = useNavigate();
   useEffect(() => {
    const auth = localStorage.getItem('user');
    if(auth){
         navigate('/')
    }
},[])

    const log =  async(e)=>{
        e.preventDefault();
       console.log(email);
        let result = await fetch('http://localhost:300/login',{
         method:'post',
         body: JSON.stringify({email,password}),
         headers:{
               'Content-Type':'application/json'
         },
       });  
       result = await result.json();
       if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate('/')
       }else{
            alert("PLEASE ENTER VALIDE ID OR PASSWORD");
       }
    }
  return (
    <>
    <div className='from_box'>
        <h1>Login</h1>
       <form onSubmit={log} >
          <input type="email" name="email" placeholder='Enter email'
           value={email} onChange={(e)=> setEmail(e.target.value)}/><br></br>
          <input type="password" name="password" placeholder='password'
          value={password} onChange={(e)=> setPassword(e.target.value)}/><br></br>
          <button type='submit'>login</button>
       </form> 
    </div>
    </>
  )
}

export default Login