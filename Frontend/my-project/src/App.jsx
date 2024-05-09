import { Routes,Route} from "react-router-dom";

import Home from "./Pages/Home/Home"
import Login from "./Pages/Loginpage/Loginpage"
import Signup from "./Pages/Signuppage/Signuppage"
import Viewproducts from "./Pages/viewproductpage/Viewproductpage"
import Productdetail from "./Pages/Productdetailpage/Productdetailpage"
import Cart from "./Pages/Cartpage/Cartpage"
import Checkout from "./Pages/Checkoutpage/Checkoutpage"
import Profilepage from "./Pages/Profile/Profilepage";

function App() {



  return (
    <div className=''>

      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path="/login" element={<Login />}/> 
        <Route path="/signup" element={<Signup />}/> 
        <Route path="/Productdetail/:id" element={<Productdetail />}/> 
        <Route path="/Checkout" element={<Checkout />}/> 
        <Route path="/Cart" element={<Cart />}/> 
        <Route path="/viewproducts" element={<Viewproducts />}/> 
        <Route path="/profile" element={<Profilepage />}/> 

       
      </Routes>


    </div>
  )
}

export default App
