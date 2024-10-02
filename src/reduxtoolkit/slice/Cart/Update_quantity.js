import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies_person } from "../Data_Person";
// ---------------------------------------------------------
const postData_cart_item = async (data) => {
  const response = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${data.id}`, // رابط API
    {
     
    count: data.count
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
export const cart_Update_quantity = createAsyncThunk("wishlist", async (Data, thunkAPI) => {
  try {
    const response = await postData_cart_item(Data);
    console.log("cart_Update_quantity", response);

    return response; // إرجاع البيانات إذا نجح الطلب
  } catch (error) {
    console.log("uuuuuuuuuu", error);

    return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
  }
});

const cart_Update_quantity_ = createSlice({
  name: "cart_Update_quantity",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(cart_Update_quantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(cart_Update_quantity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(cart_Update_quantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default cart_Update_quantity_.reducer;

// ---------------------------------------------------------
