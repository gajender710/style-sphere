import Price from "@/components/Price";
import { Link, useNavigate } from "react-router-dom";
import Dog from "../assets/images/dog.png";
import { ProductItem } from "@/models/homeModel";

function ProductListings({ products }: Props) {
  const navigate = useNavigate();
  // const title = product.node.title;
  // const description = product.node.description;
  // const price = product.node.variants.edges[0].node.price;
  console.log(products, "products");

  const onProductSelect = (item: ProductItem) => {
    navigate(`product/${item.id}`, { state: item });
  };

  return (
    <div className="w-full px-2 py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
      {products &&
        products.map((product: ProductItem, index: any) => (
          <div
            key={index}
            onClick={() => onProductSelect(product)}
            className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter cursor-pointer"
          >
            <div className="flex items-center justify-center h-72 border-b-2 border-palette-lighter relative">
              <img
                src={product.images[0]}
                className="w-40 h-40 transform duration-500 ease-in-out hover:scale-110  "
              />
            </div>
            <div className="h-48 relative ">
              <span className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
                {product.title}
              </span>
              <span className="text-md text-gray-600 px-4 font-primary font-light line-clamp-4 overflow-ellipsis ">
                {product.description}
              </span>
              <div
                className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
                 rounded-tl-sm triangle"
              >
                <Price currency="र " num={product.price} numSize="text-lg" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

interface Props {
  products: ProductItem[] | null;
}

export default ProductListings;
