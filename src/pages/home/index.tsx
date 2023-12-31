import PageTitle from "@/components/PageTitle";
import ProductListings from "@/components/ProductListings";
import { ProductItem } from "@/models/homeModel";
import productServices from "@/services/product-services";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState<ProductItem[] | null>(null);
  const fetchList = async () => {
    try {
      const res = await productServices.getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error, "error in fetch list");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full">
      <PageTitle text="STYLE SPHERE" />
      <p className="max-w-xl text-center px-2 mx-auto text-base text-gray-600">
        Step into a work of style 
      </p>
      <ProductListings products={products} />
    </div>
  );
};

export default Home;
