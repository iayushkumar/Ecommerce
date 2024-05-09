import React,{useEffect, useState} from 'react'
import axios from"axios"

const Address = () => {

  const [userInfo, setUserInfo] = useState({ Address: [] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/address/Addaddress", userInfo.Address[0], {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      // Clearing the form after successful submission
      setUserInfo({ ...userInfo, Address: [] });
      fetchUser();
    } catch (error) {
      console.error("Error occurred while submitting:", error);
    }
  }

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
    <div className='p-4 sm:ml-64'>
    <div>
       <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700'>
    <div className='w-full h-full '>

      <form className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="home"
      id="home"
      value={userInfo.Address[0]?.home || ""}
      onChange={(e) => setUserInfo({ ...userInfo, Address: [{ ...userInfo.Address[0], home: e.target.value }] })}
    
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required=""
    />
    <label
      htmlFor="home"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Home
    </label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="Landmark"
      id="Landmark"
    
      value={userInfo.Address[0]?.Landmark || ""}
      onChange={(e) => setUserInfo({ ...userInfo, Address: [{ ...userInfo.Address[0], Landmark: e.target.value }] })}

      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required=""
    />
    <label
      htmlFor="Landmark"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Landmark
    </label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="state"
      id="state"
      value={userInfo.Address[0]?.state || ""}
      onChange={(e) => setUserInfo({ ...userInfo, Address: [{ ...userInfo.Address[0], state: e.target.value }] })}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required=""
    />
    <label
      htmlFor="state"
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
     state
    </label>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name="Area"
        id="Area"

        value={userInfo.Address[0]?.Area || ""}
        onChange={(e) => setUserInfo({ ...userInfo, Address: [{ ...userInfo.Address[0], Area: e.target.value }] })}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required=""
      />
      <label
        htmlFor="Area"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Area
      </label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name="pin_code"
        id="pin_code"
        value={userInfo.Address[0]?.pin_code || ""}
        onChange={(e) => setUserInfo({ ...userInfo, Address: [{ ...userInfo.Address[0], pin_code: e.target.value }] })}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required=""
      />
      <label
        htmlFor="pin_code"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        pin code
      </label>
    </div>
  </div>
 
  <button
    type="submit"
    onClick={handleSubmit}
    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Submit
  </button>
</form>
   
   

    </div>
    
    </div>
    </div>
    <div className="p-4">
      {userInfo.Address.map((address, index) => (
        <div key={index} className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p>Home: {address.home}</p>
          <p>Landmark: {address.Landmark}</p>
          <p>State: {address.state}</p>
          <p>Area: {address.Area}</p>
          <p>Pin Code: {address.pin_code}</p>
        </div>
      ))}
    </div>
   </div>
       
  )
}

export default Address