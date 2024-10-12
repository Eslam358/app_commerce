import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies_person } from "../Data_Person";
// ---------------------------------------------------------
const postData_cart_item = async (data) => {
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
export const cart_add_item = createAsyncThunk("wishlist", async (Data, thunkAPI) => {
  try {
    const response = await postData_cart_item(Data);
    console.log("cart_add_item", response);

    return response; // إرجاع البيانات إذا نجح الطلب
  } catch (error) {
    console.log("uuuuuuuuuu", error);

    return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
  }
});

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