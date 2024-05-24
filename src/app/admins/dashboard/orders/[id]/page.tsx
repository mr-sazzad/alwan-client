"use client";

import Loading from "@/app/loading";
import OrderPageProductCard from "@/components/admins/dashboard/orders/product-card";
import {
  useGetSingleOrderByOrderIdQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orders/ordersApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { ITShirt } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const url =
  "https://alwan-api-server.vercel.app/api/v1/products/single-product";

interface ProductWithDetails extends ITShirt {
  orderStatus:
    | "processing"
    | "onTheWay"
    | "delivered"
    | "requestToReturn"
    | "returned";
  size: string;
  quantity: number;
}

const Page = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [itemId, setItemId] = useState<string>();
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const { data: order, isLoading: isOrderLoading } =
    useGetSingleOrderByOrderIdQuery(id);

  const { data: buyer, isLoading: isUserLoading } = useGetSingleUserQuery(
    order?.userId,
    {
      skip: !order?.userId,
    }
  );

  useEffect(() => {
    const fetchProductData = async (productId: string) => {
      const response = await fetch(`${url}/${productId}`);
      const data = await response.json();
      return data.data;
    };

    const fetchProducts = async () => {
      if (order) {
        const productData = await Promise.all(
          order.items.map(async (item: any) => {
            const product = await fetchProductData(item.productId);
            setItemId(item.id);
            return {
              ...product,
              size: item.size,
              quantity: item.quantity,
              orderStatus: item.orderStatus,
            };
          })
        );
        setProducts(productData);
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [order]);

  if (isOrderLoading || isUserLoading || loadingProducts) {
    return <Loading />;
  }

  const handleOrderStatusChange = async (orderStatus: string) => {
    const result = await updateOrderStatus({ id: itemId, orderStatus });
    console.log("STATUS RESULT => ", result);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-semibold md:text-lg">Order Details</h1>
      <div className="flex md:flex-row flex-col gap-5 w-full">
        <div className="flex-1">
          <p className="md:font-semibold font-medium mb-2 ml-3">Buyer Info</p>
          <div className="flex flex-col gap-2 border border-dashed rounded border-gray-500 p-5">
            <div>
              <p className="text-gray-700 font-semibold">Name:</p>
              <p className="ml-2 text-gray-700 capitalize">{buyer.username}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="ml-2 text-gray-700">{buyer.email}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Phone:</p>
              <p className="ml-2 text-gray-700">
                {buyer.phone ? buyer.phone : order.phone}
              </p>
            </div>
            {buyer.altPhone && (
              <div>
                <p className="text-gray-700 font-semibold">Alternate Phone:</p>
                <p className="ml-2 text-gray-700">{buyer.altPhone}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 w-full h-full">
          <p className="md:font-semibold font-medium mb-2 ml-3">Order Status</p>
          <div className="flex flex-col gap-2 border border-dashed rounded border-gray-500 p-5">
            <p>
              The value will be only just{" "}
              <span className="font-semibold">cancelled</span> or{" "}
              <span className="font-semibold">normal</span>
            </p>
            
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <p className="md:font-semibold font-medium mb-2 ml-3">Order Info</p>
        <div className="flex flex-col gap-2 border border-dashed rounded border-gray-500 p-5 relative">
          {products.map((product, index) => (
            <div key={index}>
              <OrderPageProductCard
                product={product}
                size={product.size}
                quantity={product.quantity}
                orderStatus={product.orderStatus}
                handleOrderStatusChange={handleOrderStatusChange}
                isLoading={isUpdating}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex md:flex-row gap-5 flex-col w-full">
        <div className="flex-1">
          <p className="md:font-semibold font-medium mb-2 ml-3">
            Delivery Info
          </p>
          <div className="flex flex-col gap-2 border border-dashed rounded border-gray-500 p-5">
            <div>
              <p className="text-gray-700 font-semibold">Shipping City: </p>
              <p className="ml-2 text-gray-700">{order.shippingCity}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Shipping Address: </p>
              <p className="ml-2 text-gray-700">{order.shippingAddress}</p>
            </div>
            {order.orderNote && (
              <div>
                <p className="text-gray-700 font-semibold">Additional Note: </p>
                <p className="ml-2 text-gray-700">{order.orderNote}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <p className="md:font-semibold font-medium mb-2 ml-3">
            Charge & Fee&apos;s
          </p>
          <div className="flex flex-col gap-2 border border-dashed rounded border-gray-500 p-5">
            <div>
              <p className="text-gray-700 font-semibold">Total Cost:</p>
              <p className="ml-2 text-gray-700">{order.totalCost}</p>
            </div>
            <div>
              <p className="text-gray-700 font-semibold">Delivery Fee:</p>
              <p className="ml-2 text-gray-700">
                {order.shippingCity === "Dhaka" ? 70 : 130}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
