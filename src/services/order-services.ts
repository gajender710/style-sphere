import networkClient from "./api-client";


const checkout = async (payload:any) : Promise<any> => {
    return networkClient.post('checkout',payload);
}

const getRazorpayKey = async () : Promise<any> => {
    return networkClient.get('get-payment-key');
}

const paymentVerification = async (payload:any) : Promise<any> => {
    return networkClient.post('payment-verification',payload);
}

const orderServices = {
    checkout,
    getRazorpayKey,
    paymentVerification
}

export default orderServices;