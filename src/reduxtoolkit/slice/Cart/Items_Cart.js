import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies_person } from "../Data_Person";
// ---------------------------------------------------------

 const cart_items_ = async () => {
  const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/cart", // رابط API

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
export const cart_items = createAsyncThunk(
  "cart_items",
  async (Data, thunkAPI) => {
    try {
      // استدعاء دالة API التي تستخدم axios
      const response = await cart_items_();
      console.log("cart_items", response);
      return response; // إرجاع البيانات إذا نجح الطلب
    } catch (error) {
      console.log("uuuuuuuuuu", error);

      return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
    }
  }
);

const cart_items__ = createSlice({
  name: "cart_items",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    refresh_cart : (state, action)=>{
     return state = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(cart_items.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(cart_items.fulfilled, (state, action) => {
        state.loading = false;
        // const AA = JSON.stringify(action.payload.data)
        // state.data = JSON.parse(AA); // تخزين البيانات المرتجعة في الـ state
        state.data = action.payload.data;
      })
      // الحالة عندما يفشل الطلب
      .addCase(cart_items.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export const { refresh_cart } = cart_items__.actions;
export default cart_items__.reducer;

// ---------------------------------------------------------
