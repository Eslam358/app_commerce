import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies_person } from "../Data_Person";
// ---------------------------------------------------------
 const RemoveData_cart_item = async (data) => { 
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${data}`, // رابط API
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
export const Remove_cart_item = createAsyncThunk("wishlist", async (Data, thunkAPI) => {
  try {
    const response = await RemoveData_cart_item(Data);
    console.log("remove_response",response)

    return response; // إرجاع البيانات إذا نجح الطلب
  } catch (error) {
    console.log("uuuuuuuuuu", error);

    return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
  }
});

const Remove_cart_item_ = createSlice({
  name: "Remove_cart_item",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(Remove_cart_item.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(Remove_cart_item.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(Remove_cart_item.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default Remove_cart_item_.reducer;

// ---------------------------------------------------------
