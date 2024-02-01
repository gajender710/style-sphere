import networkClient from "./api-client";


const checkout = async (payload:any) : Promise<any> => {
    return networkClient.post('user/checkout',payload);
}

const getRazorpayKey = async () : Promise<any> => {
    return networkClient.get('user/get-payment-key');
}

const paymentVerification = async (payload:any) : Promise<any> => {
    return networkClient.post('user/payment-verification',payload);
}

const getOrders = async () : Promise<any> => {
    return networkClient.get('user/orders');
}

const orderServices = {
    checkout,
    getRazorpayKey,
    paymentVerification,
    getOrders
}

export default orderServices;