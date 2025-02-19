import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import AdminDeleteProductCard from './AdminDeleteProductCard';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,setEditProduct] = useState(false)
    const [deleteProduct,setDeleteProduct] = useState(false)

  return (
    <div className='bg-white p-4 rounded '>
       <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
              <img src={data?.productImage[0]} alt={"productImg"}  className='mx-auto object-fill h-full'/>
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

            <div>

                <p className='font-semibold'>
                  {
                    displayINRCurrency(data.sellingPrice)
                  }
        
                </p>
                <div className={" mt-1 flex justify-between items-center"}>
                <div className=' relative group w-fit  p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline/>
                    <span className="absolute left-1/2 -translate-x-1/2 -top-7 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs rounded px-2 py-1">
                      Edit
                   </span>
                </div>

                <div className='w-fit p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setDeleteProduct(true)}>
                    <MdDelete/>
                </div>
                </div>
            </div>

          
       </div>
        
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
          )
        }
        {
            deleteProduct && (
                <AdminDeleteProductCard productData={data} onClose ={()=>setDeleteProduct(false)} fetchdata={fetchdata}/>
            )
        }
    
    </div>
  )
}

export default AdminProductCard