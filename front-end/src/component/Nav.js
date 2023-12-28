import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Nav() {
  const auth = localStorage.getItem('user');
  // let ame = JSON.parse(auth).name;
  const navigate = useNavigate();
  const logout = ()=>{
      localStorage.clear('user');
      navigate('/singup');
  }
  return (
    <nav>
      { auth?<ul className='link_box'>
          <li><Link to='/'>Product</Link></li>
          <li><Link to='/addProduct'>Add Products </Link></li>
          <li><Link to='/updateProduct/:'>Update Products</Link></li>
          {/* <li><Link to='/logout'>Logout</Link></li> */}
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to='/singup' onClick={logout}>Logout </Link></li>
          <li>[ {JSON.parse(auth).name} ]</li>
       </ul>:
       <ul className='link_box'>
          <li><Link to='/singup'>SingUp</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      }
    </nav>
  )
}
  
export default Nav