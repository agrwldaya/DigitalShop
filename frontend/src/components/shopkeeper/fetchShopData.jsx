// src/hooks/useFetchShopData.js
import { getProfile as setProfile,getTotalProduct as setProduct } from '@/app/redux/shopkeeperSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export const useFetchShopData = () => {
  const dispatch = useDispatch();

  const fetchProfile = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/shops/profile",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

    //   console.log("response",response.data)

      if (response.data.success) {
        dispatch(setProfile(response.data.shop));
        // console.log(response.data.message);
      } else {
        toast(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast(error?.response?.data?.message || "An unexpected error occurred");
    }
  };

  const fetchProducts = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/shops/get-all-products",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

    console.log("response",response.data)

      if (response.data.success) {
        dispatch(setProduct(response.data.products));
        // console.log(response.data.message);
      } else {
        toast(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast(error?.response?.data?.message || "An unexpected error occurred");
    }
  };

  return { fetchProfile,fetchProducts };
};
