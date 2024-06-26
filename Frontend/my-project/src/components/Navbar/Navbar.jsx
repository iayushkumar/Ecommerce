import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate=useNavigate();
  const [userInfo, setuserInfo] = useState({});
  const [button, setbutton] = useState(false);
 const handlesignout=()=>
 {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navigate('/');
 }


const fetchuser=async()=>
  {
   const response=await axios.get('http://localhost:3000/Auth//signinfo',

  {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
  }
  }
   )
    const data=await response.data;
    console.log(data,"user inf");
    setuserInfo(data);
  

  }

useEffect(() => {
  fetchuser();
}, [])

useEffect(() => {
  console.log(userInfo);
}, [userInfo])




  return (
    <nav className="bg-teal-50 border-gray-200 dark:bg-gray-900 ">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
     <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse w-40 h-10">
      
        {localStorage.getItem('user')==='true'?(<>

          <Link to ="/Cart">
          <div className='cart h-30 w-30 '>
              <FaShoppingCart className='h-6 w-6 mr-5'/>
              </div>
           </Link> 

          <button
          type="button"
          className="flex text-sm mr-5 bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          // aria-expanded="false"
          onClick={()=>setbutton(!button)}
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="user photo"
          />
        </button>
        </>):
        (<div className='flex'>
          <Link to="/login">
          <div className='w-20 p-2 border-2 border-teal-400 hover:cursor-pointer pl-4'>Login</div>
          </Link>
          <Link to="/signup">
          <div className='w-20 p-2 border-2 border-teal-400 hover:cursor-pointer pl-4 ml-2'>Signup</div>
          </Link>
         

        </div>)
        }
      
        {/* Dropdown menu */}
        {button ? (
  <div
    // className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    className={`z-50 ${button ? '' : 'hidden'} mt-20 my-5 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
    id="user-dropdown"
  >
    <div className="px-4 py-3">
      <span className="block text-sm text-gray-900 dark:text-white">
        {userInfo.name}
      </span>
      <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
        {userInfo.email}
      </span>
    </div>
    <ul className="py-2" aria-labelledby="user-menu-button">
      <Link to="/profile">
        <li>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            My profile
          </a>
        </li>
      </Link>
      <li>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          onClick={handlesignout}
        >
          Sign out
        </a>
      </li>
    </ul>
  </div>
) : null}

      

     
      </div>
      <div
        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
     
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-teal-50 rounded-lg bg-teal-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-teal-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
           <li>
             <Link 
               to="/"
               className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
               aria-current="page"
             >
               Home
             </Link>
           </li>
         </ul>
      </div>
    </div>
  </nav>
  
  )
}

export default Navbar