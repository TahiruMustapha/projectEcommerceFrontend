const backendDomin = process.env.REACT_APP_BACKEND_DOMAIN

const SummaryApi = {
    signUP : {
        url : `/api/signup`,
        method : "post"
    },
    signIn : {
        url : `/api/signin`,
        method : "post"
    },
    current_user : {
        url : `/api/user-details`,
        method : "get"
    },
    sendReceiptEmail:{
        url : `/api/send-receipt`,
        method : "post"
    },
    sendSmsUrl:{
        url : `/api/send-sms`,
        method : "post",
    },
    logout_user : {
        url : `/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `/api/get-product`,
        method : 'get'
    },
    deleteProductCard:{
        url : `/api/delete-product-card`,
        method : 'delete'
    },
    updateProduct : {
        url : `/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `/api/delete-cart-product`,
        method : 'post'
    },
    clearUserCart:{
        url:`/api/delete-user-cart`,
        method : 'delete'
    },
    searchProduct : {
        url : `/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `/api/filter-product`,
        method : 'post'
    },
    clearCart:{
        url : `/api/cart-clear`,
        method : 'delete'
    },
    checkAuth:{
        url:"/api/check-auth",
        method:"get"
    }
}


export default SummaryApi