import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './component/Nav';
import Footer from './component/Footer';
import Singup from './component/Singup';
import PrivateCom from './component/PrivateCom';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import Product from './component/Product';
import UpDate from './component/UpDate';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
       <Nav/>
      <Routes>
        <Route element={<PrivateCom/>}>
          <Route path="/" element={<Product/>}/>
          <Route path='/addProduct' element={<AddProduct/>} />
          <Route path="/updateProduct/:id" element={<UpDate/>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>

          <Route path="/singup" element={<Singup/>} />
          <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
   </BrowserRouter>
    </div>
  );
}

export default App;
