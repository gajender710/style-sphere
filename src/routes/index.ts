import { Layout } from "@/layout";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import Home from "@/pages/home";
import PaymentSuccessPage from "@/pages/payment-success";
import ProductDetailPage from "@/pages/product-detail";

type RedirectProps = {
    redirect: true;
    pathTo: string;
  };
  
  type ComponentProps = {
    redirect: false;
    component: () => JSX.Element;
    subRoutes?: RouteOption[];
  };

export type RouteOption = {
    path: string;
    name: string;
  } & (RedirectProps | ComponentProps);


  const allRoutes : RouteOption[] = [
    {
      path:"",
      name:"Home",
      component:Home,
      redirect:false,
  },
  {
    path:"product/:id",
    name:"Product Detail",
    component:ProductDetailPage,
    redirect:false,
  },

  {
    path:"cart",
    name:"Cart",
    component:CartPage,
    redirect:false,
  },
  {
    path:"checkout",
    name:"Checkout",
    component:CheckoutPage,
    redirect:false,
  },
  {
    path:"checkout/payment-success",
    name:"Payment Success",
    component:PaymentSuccessPage,
    redirect:false,
  },
  
]


 const mainRoutes : RouteOption[] = [
    {
    path: "/",
    name: "main",
    component:Layout,
    subRoutes:allRoutes,
    redirect: false,
  },  
 ]
 export default mainRoutes;