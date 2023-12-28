import React, {useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function UpDate() {
 const [name, setName]= React.useState('');
 const [price, setPrice]= React.useState('');
 const [category, setCategory]= React.useState('');
 const [company, setCompany]= React.useState('');
 const params = useParams();
 const navigate = useNavigate();

 useEffect(() => {
      getData();
 }, [])
  // fetch data from data base ====================
  const getData = async()=>{
       console.log(params);
       let result = await fetch(`http://localhost:300/product/${params.id}`);
       result =await result.json();
       setName(result.name);
       setPrice(result.price);
       setCategory(result.category);
       setCompany(result.company);
     
  }
  // updating the data from database=================
  const update = async (e)=>{
      e.preventDefault();
      console.log(name, price, category, company);
      let result = await fetch(`http://localhost:300/product/${params.id}`,{
           method:'put',
           body:JSON.stringify({name, price, category, company}),
           headers:{
                'Content-Type':'application/json'
           },
      })
      result = await result.json();
      console.log(result)
      navigate('/')

  }


  return (
   <div className='from_box'>
   <h1>UpDate Product</h1>
   <form  onSubmit={update}>
   <input type='text' placeholder='Enter the product name'
    onChange={(e)=>{setName(e.target.value)}} value={name}/><br></br>
        
   <input type='text' placeholder='Enter the product price'
   onChange={(e)=>{setPrice(e.target.value)}} value={price}/><br></br>
      
   <input type='text' placeholder='Enter the product category'
   onChange={(e)=>{setCategory(e.target.value)}} value={category}/><br></br>
       
   <input type='text' placeholder='Enter the product company'
   onChange={(e)=>{setCompany(e.target.value)}} value={company}/><br></br>
      
   <button type='submit'>UpDate Product</button><br></br><br></br>
        
   </form>
  </div>
  )
}

export default UpDate