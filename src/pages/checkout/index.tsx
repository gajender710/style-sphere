import BackToProductButton from "@/components/BackToProductButton";
import { ProductItem } from "@/models/homeModel";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

import { useReducer, Reducer, useRef } from "react";
import useCartStore from "@/store/cart";
import clsx from "clsx";
import Dropdown from "@/components/Dropdown";
import states from "../../store/location/states.json";
import { DropdownOption } from "@/models/dropdownModel";
import TextInput from "@/components/TextInput";
import SimpleReactValidator from "simple-react-validator";
import orderServices from "@/services/order-services";
import { CheckoutDetailForm, RazorOrderDetail } from "@/models/orderModel";
import toast from "react-hot-toast";
import { orderMapper } from "@/utils/helpers";
import useAuthStore from "@/store/auth";

const cStateOptions = states.map((item, index) => ({ ...item, id: index }));
const initialState = {
  address: "",
  city: "",
  cState: null,
  landmark: "",
  pincode: "",
  email: "",
  mobile_number: "",
};

interface ReducerAction {
  type: keyof CheckoutDetailForm;
  value: any;
}

const getPriceDetail = (cart: ProductItem[]) => {
  const subtotal = cart.reduce((acc, it) => {
    return acc + (it.quantity ?? 1) * it.price;
  }, 0);
  let gst = Number(((subtotal * 18) / 100).toFixed(1));
  let finalPrice = (subtotal + gst).toFixed(1);
  return { gst, finalPrice };
};

function CheckoutPage() {
  const navigate = useNavigate();
  const { userDetail } = useAuthStore((state) => state);
  const { cart, resetCart } = useCartStore((state) => state);
  const priceDetails = useRef(getPriceDetail(cart));

  const validator = useRef(
    new SimpleReactValidator({
      className: "validation-error",
    })
  );

  const reducer = (state: CheckoutDetailForm, action: ReducerAction) => {
    const newState = { ...state };
    newState[action.type] = action.value;
    return newState;
  };

  const [state, dispatch] = useReducer<
    Reducer<CheckoutDetailForm, ReducerAction>,
    CheckoutDetailForm
  >(reducer, initialState, () => initialState);

  const { address, city, cState, landmark, mobile_number, pincode } = state;

  const checkout = async () => {
    if (!validator.current.allValid() || !cState) {
      validator.current.showMessages();
      await toast.error("Validation error");
      dispatch({ type: "address", value: address });
      return;
    }
    try {
      const formattedFormDetail = orderMapper(state);
      const payload = {
        user_form: {
          ...formattedFormDetail,
          email: userDetail.email,
        },
        cart_items: cart,
      };
      const response = await orderServices.checkout(payload);
      const keyResponse = await orderServices.getRazorpayKey();
      const data: RazorOrderDetail = response.data;

      var options = {
        key: keyResponse.key,
        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Gajender",
        description: "Test Transaction",
        image: Logo,
        order_id: data.id,

        // callback_url: `${
        //   import.meta.env.VITE_SERVER_URL
        // }/payment-verification?source=web`,
        handler: async function (response: any) {
          try {
            await orderServices.paymentVerification(response);
            resetCart();
            navigate("payment-success");
          } catch (error) {
            console.error(error, "invalid payment");
          }
        },

        notes: {
          address: "Test Address",
        },
        prefill: {
          name: name,
          email: userDetail.email,
          contact: mobile_number,
        },

        theme: {
          color: "#3399cc",
        },
      };
      console.log(options, "data");
      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("razorpay error");
    }
  };

  console.log(userDetail, "userdetail");

  if (!cart.length) {
    return (
      <div className="flex w-full items-center justify-center">
        <Link
          to={"/"}
          className="btn bg-purple-500 p-2 rounded-lg text-white hover:text-white"
        >
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex  h-full flex-col md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto border-purple-100 border-[1px] py-6 px-6 my-8 rounded-lg pb-40">
      <h1 className="font-bold text-xl self-center mb-6">GETTING YOUR ORDER</h1>
      <div className="flex w-full flex-col lg:flex-row justify-between">
        <div className="flex w-full lg:w-1/2 flex-col h-full space-y-2 ">
          <TextInput
            label="mobile number"
            value={mobile_number}
            required
            onChangeText={(val) =>
              dispatch({ type: "mobile_number", value: val })
            }
            type="mobile_number"
            validator={[validator, "required|min:10|max:10|integer"]}
          />

          <TextInput
            label="address"
            value={address}
            required
            onChangeText={(val) => dispatch({ type: "address", value: val })}
            validator={[validator, "required|alpha_space"]}
          />

          <div className="flex flex-row items-start gap-x-2">
            <TextInput
              label="City"
              value={city}
              required
              onChangeText={(val) => dispatch({ type: "city", value: val })}
              validator={[validator, "required|alpha_space"]}
            />
            <Dropdown
              label="State"
              required
              data={cStateOptions}
              onSelect={(val) => dispatch({ type: "cState", value: val })}
              value={cState}
            />
          </div>

          <div className="flex flex-row items-center gap-x-2">
            <TextInput
              label="landmark"
              value={landmark}
              required
              onChangeText={(val) => dispatch({ type: "landmark", value: val })}
              validator={[validator, "required|alpha_space"]}
            />
            <TextInput
              label="pincode"
              value={pincode}
              required
              onChangeText={(val) => dispatch({ type: "pincode", value: val })}
              validator={[validator, "required|min:6|max:6|integer"]}
            />
          </div>
        </div>
        <div className="flex  w-full lg:w-2/4 flex-col px-2 lg:px-8 mt-4 lg:mt-0">
          <h2 className="text-lg font-semibold mb-2">Cart Items: </h2>
          <div className="flex flex-col ">
            <div className="h-[23rem] w-full overflow-y-scroll scrollbar px-2">
              {cart.map((item: ProductItem, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between pb-2 mb-4 border-b-[1px] border-b-gray-300"
                  >
                    <div className="flex flex-row">
                      <div className="relative">
                        <img
                          src={item.images[0]}
                          className="h-10 w-10 rounded-md bg-orange-300"
                        />
                        {item.quantity && item.quantity > 1 && (
                          <span className="flex absolute justify-center items-center text-white text-xs font-bold -bottom-1  -right-2 h-5 w-5 bg-green-400 rounded-full">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      <span className="ml-2">{item.title}</span>
                    </div>
                    <span>₹ {item.price * (item.quantity ?? 1)}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between font-medium">
              <h4 className=" text-sm ">GST(18%)</h4>{" "}
              <h4>₹ {priceDetails.current.gst}</h4>
            </div>
            <div className="flex justify-between font-medium">
              <h4 className=" text-sm ">Total</h4>{" "}
              <h4>₹ {priceDetails.current.finalPrice}</h4>
            </div>
            <button
              type="submit"
              className="w-[50%] bg-purple-600 text-white mt-1 mx-auto"
              onClick={checkout}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  productDetail: ProductItem;
}

export default CheckoutPage;
