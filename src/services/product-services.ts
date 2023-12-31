import networkClient from "./api-client";


const getProducts = async () => {
    return networkClient.get('products');
}

const productServices = {
    getProducts,
}

export default productServices;