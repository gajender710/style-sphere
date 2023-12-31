import { useState, useRef, useReducer, useEffect } from "react";
import ProductImage from "@/components/ProductImage";
import Price from "@/components/Price";
import BackToProductButton from "@/components/BackToProductButton";
import { ProductItem } from "@/models/homeModel";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "@/store/cart";
import TextInput from "@/components/TextInput";
import SimpleReactValidator from "simple-react-validator";
import toast from "react-hot-toast";

function ProductDetailPage() {
  const productData: ProductItem = useLocation().state;
  const [_update, forceUpdate] = useReducer((x) => x + 1, 0);
  const { cart, addToCart, resetCart } = useCartStore((state) => state);
  const [product, setProduct] = useState(
    cart.find((item) => item.id == productData.id) ?? productData
  );

  const variants: any = [{ node: 0 }];
  const [quantity, setQuantity] = useState("1");
  // const [variantId, setVariantId] = useState(variants[0].node.id);
  const [variant, setVariant] = useState(variants[0]);
  const validator = useRef(
    new SimpleReactValidator({
      className: "validation-error",
    })
  );

  const handleAddToCart = () => {
    if (!validator.current.allValid()) {
      toast.error(validator.current.errorMessages.quantity);
      forceUpdate();
      return;
    }

    // update store context
    if (Number(quantity) >= 1) {
      addToCart(product, Number(quantity));
      setProduct(cart.find((item) => item.id == productData.id) ?? productData);
    }
  };

  function updateQuantity(val: number) {
    setQuantity(val ? Math.floor(val).toString() : "");
  }

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 my-12 lg:my-8 max-w-6xl w-11/12 mx-auto ">
      <ProductImage images={product.images} />
      <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-md mx-auto space-y-4 min-h-128">
        <BackToProductButton />
        <div className=" font-primary">
          <h1 className="leading-relaxed font-extrabold text-3xl text-primary my-2 line-clamp-2 overflow-ellipsis">
            {product.title}
          </h1>
          <p className="font-medium text-lg line-clamp-7 overflow-ellipsis">
            {product.description}
          </p>
          <div className="text-xl text-primary font-medium py-4 px-1">
            <Price currency="₹ " num={product.price} numSize="text-2xl" />
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-start items-end space-x-2 w-full">
            <div className="flex flex-col items-start space-y-1 flex-grow-0">
              {/* <label className="text-gray-500 text-base">Qty.</label> */}
              <TextInput
                label="quantity"
                onChangeText={(val) => updateQuantity(parseInt(val))}
                value={quantity}
                validator={[validator, "required|numeric|min:0,num"]}
                showError={false}
              />
            </div>
            <button
              className={
                "h-9 bg-primary text-white w-full rounded-md font-primary font-semibold text-xl flex  justify-center items-center shadow-md"
              }
              aria-label="cart-button"
              onClick={handleAddToCart}
            >
              Add To Cart
              <FaShoppingCart className="w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
