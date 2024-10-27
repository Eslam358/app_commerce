import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// ---------------------------------------------------------
const postData_cart_item = async (data) => {
  const data_Cookies_person = Cookies.get("Data_person");
  const Cookies_person = data_Cookies_person
    ? JSON.parse(data_Cookies_person)
    : "";
  const response = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`, // رابط API
    {
      productId: data,
    },
    {
      headers: {
        token: Cookies_person.token || "",
      },
    }
  );
  return response.data;
};
// ---------------------------------------------------------
// --------------------createAsyncThunk-------------------------------------

// تعريف thunk لإرسال طلب POST
export const cart_add_item = createAsyncThunk(
  "wishlist",
  async (Data, thunkAPI) => {
    try {
      const response = await postData_cart_item(Data);

      return response; // إرجاع البيانات إذا نجح الطلب
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
    }
  }
);

const cart_add_item_ = createSlice({
  name: "cart_add_item",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(cart_add_item.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(cart_add_item.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(cart_add_item.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default cart_add_item_.reducer;

// ---------------------------------------------------------
