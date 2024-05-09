import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Profile from '../Myprofile/Profile';
import { Link } from "react-router-dom";
const Checkout = () => {

  const [userInfo, setUserInfo] = useState({ Address: [] });

  const [products, setproducts] = useState([]);

  
  const fetchcart = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cartdata/fetchcart', {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const data = await response.data;
      console.log(data);
      setproducts(data.cartItem);
    } catch (error) {
      // Handle error
      console.error('Error fetching cart:', error);
    }
  }
  
  useEffect(() => {
    fetchcart();
  }, []);
  
  useEffect(() => {
    console.log(products);
  }, [products]); // Log cartItems when it changes
  
let totalprice=0;

products.forEach(element => {
     totalprice+=element.product.price;
});

totalprice=Math.floor(totalprice)


let total=totalprice+8


const fetchUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/Auth/signinfo', {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    setUserInfo(response.data);
  } catch (error) {
    console.error("Error occurred while fetching user info:", error);
  }
}

useEffect(() => {
  fetchUser();
}, []);




  return (
    <div>
        <>

  <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 xl:py-16">
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
       { products.map((product)=>
       <div  key={product._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
       <img
         className="m-2 h-24 w-28 rounded-md border object-cover object-center"
         src={product.product.images[0]}
         alt=""
       />
       <div className="flex w-full flex-col px-4 py-4">
         <span className="font-semibold">
          {product.product.name}
         </span>
         <span className="float-right text-gray-400">  {product.color}</span>
         <p className="text-lg font-bold">${product.product.price}</p>
       </div>
     </div>
      )}
       
  
      </div>
     
    </div>
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
     
      <div className="">
        <div className='flex flex-col'>
        <Link to="/profile">
        <div className='bg-gray-200 w-52 p-2 hover:cursor-pointer  rounded-xl pl-6' >
          create new Address
        </div>
        </Link>
        <div className="p-4">
      {userInfo.Address.map((address, index) => (
        <div key={index} className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p>Home: {address.home}</p>
       
          <p>Pin Code: {address.pin_code}</p>
        </div>
      ))}
    </div>
    </div>
       
        {/* Total */}
        <div className="mt-6 border-t border-b py-2 ">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">${totalprice}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">$8.00</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">${total}</p>
        </div>
      </div>
      <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
        Place Order
      </button>
    </div>
  </div>
</>

    </div>
  )
}

export default Checkout