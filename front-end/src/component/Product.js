import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';

function Product() {
  const [product, setProduct] = React.useState([]);
  // let userid = JSON.parse(localStorage.getItem('user'))._id;
  // const [empty , setEmpty] = React.useState([]);

  useEffect(() => {
     getProduct();
  }, []);

  // geting the data ===================
  const getProduct =async()=>{
        let userid = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`http://localhost:300/products/${userid}`);
        result = await result.json();;
        setProduct(result); 
  }

  const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:300/product/${id}`,{
            method:"Delete"
        });
        result = await result.json();
        if(result){
            alert("ITEM IS DELETE");
           getProduct();
        }
  }
//   search item of product ==============================
  const searchItem = async(event)=>{
        let useId = JSON.parse(localStorage.getItem('user'))._id;
        let key = event.target.value;
        console.log(useId,key);
        if(key){
            let result = await fetch(`http://localhost:300/search/${useId}/${key}`);
            result = await result.json();
            if(result){
                setProduct(result);
            }
        }else{
            getProduct();
        }
  }
  return (
    <div className='product_box'>
        <h3>Product List</h3>
        <br></br>
        <input type='text' placeholder='Search Item' style={{marginLeft:100, padding:5}}
         onChange={searchItem}/>
        <br></br><br></br>
<table>
  <thead>
    <tr>
      <th>S No.</th>
      <th>Name</th>
      <th>Price</th>
      <th>Category</th>
      <th>company</th>
      <th>Operation</th>
    </tr>
  </thead>
  <tbody >

   {
    product.length>0? product.map((cuElm , index)=>{
    return( 
  <tr key={index}>
     <td>{index}</td>
     <td>{cuElm.name}</td>
     <td>Rs.{cuElm.price}</td>
     <td>{cuElm.category}</td>
     <td>{cuElm.company}</td>
     <td><button onClick={()=> deleteProduct(cuElm._id)} style={{marginRight:10}}>Delete</button>
         <button><Link to={`/updateProduct/${cuElm._id}`}>update</Link></button>
     </td>
   </tr> )
    })
    :""
   }
   
    
  </tbody>
</table>
    </div>
  )
}

export default Product