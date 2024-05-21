"use client";
import React from "react";
import Loading from "@/app/loading";
import { useGetSingleOrderByOrderIdQuery } from "@/redux/api/orders/ordersApi";
import { useGetSingleProductQuery } from "@/redux/api/products/productsApi";
import { useGetSingleUserQuery } from "@/redux/api/users/user-api";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetSingleOrderByOrderIdQuery(id);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetSingleUserQuery(order?.userId, {
    skip: !order?.userId,
  });

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetSingleProductQuery(order?.productId, {
    skip: !order?.productId,
  });

  if (isOrderLoading || isUserLoading || isProductLoading) {
    return <Loading />;
  }

  if (isOrderError) {
    return <p>Failed to load order data.</p>;
  }

  if (isUserError) {
    return <p>Failed to load user data.</p>;
  }

  if (isProductError) {
    return <p>Failed to load product data.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-semibold md:text-lg">Order Details</h1>
      {/* Buyer Info */}
      <div>
        <p>Buyer Info</p>
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details as needed */}
        </div>
      </div>
      {/* Product Info */}
      <div>
        <p>Order Info</p>
        <div>
          <p>Product Name: {product.name}</p>
          <p>Price: ${product.price}</p>
          {/* Add more product details as needed */}
        </div>
      </div>
    </div>
  );
};

export default Page;
