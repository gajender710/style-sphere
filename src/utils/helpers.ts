import { CheckoutDetailForm } from "@/models/orderModel";
import Cookies from "js-cookie"

export const orderMapper = (info:CheckoutDetailForm) =>{
    const {
        address,
        city,
        cState,
        landmark,
        mobile_number,
        pincode,
      } = info;

    return {
        mobile_number:parseInt(mobile_number),
        shipping_information:{
            address:address,
            city:city,
            state:cState?.value,
            landmark:landmark,
            pincode:parseInt(pincode),
        }
    }
}
