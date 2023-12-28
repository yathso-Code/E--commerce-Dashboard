import React from 'react'

function AddProduct() {
 const [name, setName]= React.useState('');
 const [price, setPrice]= React.useState('');
 const [category, setCategory]= React.useState('');
 const [company, setCompany]= React.useState('');
 const [error, setError] = React.useState(false);
 const [sub, setSub] = React.useState(false);

 const add = async(e)=>{
      e.preventDefault();
      console.log(!name);
      if(!name || !price || !category || !company ){
          setError(true);
          return false;
      }
      console.log(name, price, category, company);
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      let result = await fetch('http://localhost:300/add-product',{
             method:'post',
             body:JSON.stringify({name, price, category, company, userId}),
             headers:{
                  'content-Type':"application/json"
             }
      });
      result = await result.json();
      if(result){
          setSub(true);
      
     }
 }

  return (
    <div className='from_box'>
     <h1>Add Product</h1>
     <form onSubmit={add}>
     <input type='text' placeholder='Enter the product name'
      onChange={(e)=>{setName(e.target.value)}} value={name}/><br></br>
          {error && !name? <span style={{color:'red'}}>Enter name</span>: ""}
     <input type='text' placeholder='Enter the product price'
     onChange={(e)=>{setPrice(e.target.value)}} value={price}/><br></br>
          {error && !price? <span style={{color:'red'}}>Enter price</span>:''}
     <input type='text' placeholder='Enter the product category'
     onChange={(e)=>{setCategory(e.target.value)}} value={category}/><br></br>
          {error && !category? <span style={{color:'red'}}>Enter category</span>:''}
     <input type='text' placeholder='Enter the product company'
     onChange={(e)=>{setCompany(e.target.value)}} value={company}/><br></br>
          {error && !company?<span style={{color:'red'}}>Enter company</span>:''}<br></br>
     <button type='submit'>Add Product</button><br></br><br></br>
          {sub ?<span style={{color:'green'}}>YOUR ITEM IS SUBMIT</span>:""}
     </form>
    </div>
  )
}

export default AddProduct