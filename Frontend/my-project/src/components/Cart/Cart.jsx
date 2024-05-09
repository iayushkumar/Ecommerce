import { Fragment, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import axios from 'axios'



export default function Cart() {

  const [products, setproducts] = useState([]);
  const [open, setOpen] = useState(true);
  
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


let gst=0;

gst=totalprice *(18/100);
gst=Math.floor(gst)

let discout=(10/100)*totalprice;
discout=Math.floor(discout)
let Total=totalprice+gst-discout;
Total=Math.floor(Total)


const removecart = (id) => {
  axios.delete('http://localhost:3000/cartdata/deletecartitem', {
      headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
      },
      data: {
          productId: id
      }
  })

  fetchcart();
 
}



  return (
 
        <div className="px-10">
          <div className="">
           
          
          <div className="md:grid  md:grid-cols-2 gap-4  bg-white  h-full w-full">
                  {/* <div className="h-full flex-col overflow-y-scroll bg-white shadow-xl w-full sm:grid-cols-1 md:grid-cols-2"> */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:h-1/2 md:h-full ">
                      <div className="flex items-start justify-between">
                        <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                           
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.product.images[0]}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.product.name}</a>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty 1</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      onClick={()=>removecart(product.product._id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-8 sm:px-6 sm:h-1/2 md:h-full">
                        <div className=' bg-slate-50 px-10 py-10'>
                      <div className="flex justify-between text-base font-small text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalprice}</p>
                      </div>
                      <div className="flex justify-between text-base font-small text-gray-900">
                        <p>Gst</p>
                        <p>+${gst}</p>
                      </div>
                     
                      <div className="flex justify-between text-base font-small text-gray-900">
                        <p>Discount</p>
                        <p>$-{discout}</p>
                      </div>
                      <br />
                    
                      <hr />
                     
                     <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${Total}</p>
                      </div>

                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link to ="/checkout"
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <Link to="/viewproducts">
                            Continue Shopping
                            </Link>
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                    </div>
                  </div>
           
            </div>
          </div>
       

  )
}