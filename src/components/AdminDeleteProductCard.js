import { MdClose } from "react-icons/md";
import {toast} from "react-toastify";
import SummaryApi from "../common";

const AdminDeleteProductCard = ({onClose,fetchdata,productData}) =>{
    const handleDeleteProductCart = async (_id) => {
        try {
            // Send DELETE request with _id as a URL parameter
            const response = await fetch(`${SummaryApi.deleteProductCard.url}?productId=${_id}`, {
                method: SummaryApi.deleteProductCard.method,
                credentials: 'include', // Include cookies for authentication
            });

            // Parse the response
            const data = await response.json();

            // Handle success or error response
            if (data.success) {
                onClose();
                 fetchdata();
                toast.success(data.message);

            } else {
                toast.error(data.message || "Failed to delete product");
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            toast.error("An error occurred while deleting the product");
        }
    };
    return(
        <div className=' z-10 fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className=' relative bg-white p-4 flex flex-col items-center justify-center rounded w-full max-w-sm h-full max-h-[30%] overflow-hidden'>
                <p className={"font-bold"}>Are you sure you want to delete this product?</p>
                <div  className='flex items-center mt-2 justify-center gap-2'>
                    <button onClick={()=>handleDeleteProductCart(productData?._id)} className={"bg-green-700 hover:bg-green-800 text-white font-bold px-4 py-1 rounded cursor-pointer"}>Yes</button>
                    <button onClick={onClose} className={"bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-1 rounded cursor-pointer"}>Cancel</button>
                </div>
                <MdClose onClick={onClose} className={"absolute top-2 cursor-pointer text-2xl hover:text-red-700 right-3"} />

            </div>

        </div>
    )
}
export default  AdminDeleteProductCard