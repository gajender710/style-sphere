import { CheckoutDetailForm } from "@/models/orderModel";

export const orderMapper = (info:CheckoutDetailForm) =>{
    const {
        name,
        address,
        city,
        cState,
        landmark,
        email,
        mobile_number,
        pincode,
      } = info;

    return {
        name:name,
        mobile_number:parseInt(mobile_number),
        email:email,
        shipping_information:{
            address:address,
            city:city,
            state:cState?.value,
            landmark:landmark,
            pincode:parseInt(pincode),
        }
    }
}