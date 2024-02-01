import { useState, useEffect } from "react";
import BackToProductButton from "@/components/BackToProductButton";
import orderServices from "@/services/order-services";
import { Order, OrderItem } from "@/models/orderModel";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const navigate = useNavigate();
  const getOrders = async () => {
    try {
      const response = await orderServices.getOrders();
      setOrders(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const onView = (item: any) => {
    navigate(`/product/${item.productId}`, { state: item });
  };

  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 my-12 lg:my-8 max-w-6xl w-11/12 mx-auto ">
      <div className="flex flex-col justify-between h-full w-full  mx-auto space-y-4">
        <div className="w-full sm:w-1/3">
          <BackToProductButton />
        </div>

        <div>
          {orders &&
            orders.map((order: any) => (
              <div
                key={order._id}
                className="flex flex-col  w-full border p-6 mb-8 rounded-lg shadow-md "
              >
                <div className="flex justify-between w-full">
                  <h2 className="text-2xl font-bold mb-4">
                    Date Placed <br />{" "}
                    <span className="text-lg font-medium">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </h2>
                  <h2 className="text-2xl font-bold mb-4">
                    Order Status <br />
                    <span
                      className={clsx([
                        `text-lg font-medium rounded-xl px-8 py-1`,
                        {
                          "bg-green-200 text-green-600":
                            order.status == "Success",
                          "bg-yellow-200 text-yellow-600":
                            order.status == "Pending",
                        },
                      ])}
                    >
                      {order.status}
                    </span>
                  </h2>
                  <h2 className="text-2xl font-bold mb-4">
                    Total Amount (Inc. GST)
                    <br />{" "}
                    <span className="text-lg font-medium">
                      ₹{order.totalAmount.toFixed(2)}
                    </span>
                  </h2>
                </div>

                <div className="w-full h-[1px] bg-gray-200 my-2" />

                <table className="table-auto text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="w-[40%] ">Product</th>
                      <th className="w-[20%] ">Quantity</th>
                      <th className="w-[20%]">Price</th>
                      <th className="w-[20%]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item: OrderItem, index: number) => {
                      return (
                        <tr className="text-gray-800 " key={index}>
                          <td className="w-[40%] ">{item.title}</td>
                          <td className="w-[20%] pl-2">{item.quantity}</td>
                          <td className="w-[20%] ">
                            ₹ {item.price.toFixed(2)}
                          </td>
                          <td className="w-[20%] px-2">
                            <button
                              onClick={() => onView(item)}
                              className="bg-primary text-white w-full py-1"
                            >
                              {"View"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* <ul className="list-none">
                  {order.orderItems.map((item: any) => (
                    <li key={item._id} className="text-gray-800">
                      <span className="font-bold">{item.title}</span> -
                      Quantity: {item.quantity} - Price: $
                      {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
