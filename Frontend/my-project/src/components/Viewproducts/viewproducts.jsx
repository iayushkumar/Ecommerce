import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
const viewproducts = () => {

    const [productcart, setproductcart] = useState([]);

    const fetchproduct=async()=>
    {
        const response = await fetch('http://localhost:3000/prod/fetchAllprod');
        const productcart= await response.json();
        console.log(productcart)
        setproductcart(productcart.prod);
    }

    useEffect(() => {
        fetchproduct()
    
    }, [])

    const handleaddcart=async(id,color,size)=>
      {
        try {
          const response = await axios.post(
              'http://localhost:3000/cartdata/addtocart',
              {productId: id,
                color:color,size:size},
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'auth-token': localStorage.getItem('token')
                  }
              }
          );
         const data = await response.data;
          console.log(data);
        
          if (data.message === 'Item added to cart successfully') {
              toast.success('Item added to cart successfully');
          } else if (data.msg === 'Item already exists') {
              toast.error('Item already exists');
          }  
      } catch (error) {
          console.error('Error fetching login data:', error);
      }
      }

  return (
    <>
  
  <section
    id="Projects"
    className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
  >
 
    {productcart.map((product)=>
    ( 
        <div key={product._id} className="w-72 bg-white shadow-md rounded-xl ">
      
         <Link to={`/Productdetail/${product._id}`}>
          <img
            src={product?.images[0]}
            alt="Product"
            className="h-80 w-72 object-cover rounded-t-xl"
          />
              </Link>
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">{product.BrandName} xyz</span>
            <p className="text-lg font-bold text-black truncate block capitalize">
             {product?.name}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${product?.price}
              </p>
             
              <div className="ml-auto">
               {/* Add to cart */}
               <button className='bg-pink-500 hover:bg-pink-600 p-2 text-white hover:cursor-pointer rounded-md shadow-md' onClick={()=>
                {
                  console.log(product?._id,"id")
                  console.log(product?.colors[0],"color")
                  console.log(product?.sizes[0] ,"size") 
                  handleaddcart(product?._id,product?.colors[0],product?.sizes[0] ) ;

               
                }
                
                
                }>Add to cart</button>

              </div>
            </div>
          </div>
    
      </div>
    ))}
    

  </section>
 
</>

  )
}

export default viewproducts