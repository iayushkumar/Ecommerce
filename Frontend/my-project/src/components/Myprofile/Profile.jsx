import React,{useState,useEffect} from 'react'
import { FaAddressCard } from "react-icons/fa";
import Addprod from './Addprod';
import Address from './Address';
import axios from 'axios';

const Profile = () => {
  const [render, setrender] = useState('Address')
  const [userInfo, setuserInfo] = useState({});

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
    <div className='flex flex-col sm:flex-row'>
  
    <aside
      id="default-sidebar"
      className="relative top-0 left-0 z-40 md:w-1/5 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">     
        {userInfo.role==='admin'?( <li onClick={()=>setrender('addprod')}>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Add Products</span>
            </a>
          </li>):null} 
         
          <li onClick={()=>setrender('Address')}>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group"
            >
             <FaAddressCard />
              <span className="flex-1 ms-3 whitespace-nowrap">Add Address</span>
            </a>
          </li>

        </ul>
      </div>
    </aside>

    <div className="  ">
      <div className="">
        
        
       {render==='addprod'&&<Addprod/>}
       {render==='Address'&&<Address/>}

      </div>
    </div>
  </div>
  
  )
}

export default Profile