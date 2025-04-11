
"use client";
import { getShopkeeperFromToken } from '@/lib/auth';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
export default function page() {
  const shopkeeper = useSelector((state) => state.shopkeeper.shopkeeperData);

  const token = getShopkeeperFromToken();
  console.log("token",token)

  console.log(shopkeeper)
  return (
    <div>
      Shopkeeper dashboard
    </div>
  )
}
