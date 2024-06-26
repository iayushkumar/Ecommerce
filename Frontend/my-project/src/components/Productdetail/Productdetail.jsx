import { useState,useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Example() {
 
const [selectedColor, setSelectedColor] = useState('');
const [selectedSize, setSelectedSize] = useState('');
const [loading, setloading] = useState(true);
const [product, setproduct] = useState([])
let { id } = useParams();


const handlesubmit = async (e) => { 
    e.preventDefault();
    handleDatasubmit(); 
}
 
const handleDatasubmit = async () => { 
    try {
        const response = await axios.post(
            'http://localhost:3000/cartdata/addtocart',
            {productId: id,
              color:selectedColor,size:selectedSize},
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
};



  const fetchProductData = async () => {
   try {
        const response = await axios.get(`http://localhost:3000/prod/fetchprod/${id}`,
       {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data= response.data; 
      setproduct(data.prod);
      setloading(false);
  } catch (error) {
      console.error('Error fetching product data:', error);
      throw error; 
    }
  };

  useEffect(() => {
     fetchProductData();
 }, [])



  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  
  return (
    
      loading===true?(
        <div className='text-lg'>
        Hello
        </div>
      ):(
        
        <div className="bg-white">
        
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product?.breadcrumbs?.map((breadcrumb) => (
              
                  <div className="flex items-center">
                    <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
              
              ))}
              <li className="text-sm">
                <a href={product?.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {product?.name}
                </a>
              </li>
            </ol>
          </nav>
        
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product?.images[0]}
                alt={product?.images[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                src={product?.images[1]}
                alt={product?.images[0]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                src={product?.images[2]}
                alt={product?.images[0]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product?.images[0]}
                alt={product?.images[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.name}</h1>
            </div>
        
            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">&#8377;{product?.price}</p>
        
              
        
              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
        
                  <RadioGroup
                 
                   
                   value={selectedColor} 
                   onChange={setSelectedColor}
                  
                   className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors?.map((color) => (
                        <RadioGroup.Option
                          key={color?.id}
                         
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color?.selectedClass,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color[0]}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color[0],
                              `h-8 w-8 rounded-full border border-black border-opacity-10 bg-${color}-500`
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>






                  
                </div>
        
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>
        
                  <RadioGroup 

                  value={selectedSize} 
                onChange={setSelectedSize}
                  
                  className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes?.map((size) => (
                        <RadioGroup.Option
                          key={size?.id}
                          value={size}
                         
                          className={({ active }) =>
                            classNames(
                             'cursor-pointer bg-white text-gray-900 shadow-sm',
                                
                              active ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                              
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                </div>
        
                <button
                  type="submit"
                  onClick={handlesubmit}
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>
            </div>
        
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
        
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>
        
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
        
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
        
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
        
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )
    
  
  
  )
}


