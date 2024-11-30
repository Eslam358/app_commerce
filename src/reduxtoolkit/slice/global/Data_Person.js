import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const save_Cookies_person = (data) => {
  Cookies.set("Data_person", JSON.stringify(data), { expires: 7 });
};

const data_Cookies_person = Cookies.get("Data_person");
export const Cookies_person  =data_Cookies_person?  JSON.parse(data_Cookies_person):"";



const Data_Person = createSlice({
  initialState: [],
  name: "Data_Person",
  reducers: {
    Data_Person_fun_get: (state, action) => {
      save_Cookies_person(action.payload);

      return (state = action.payload);
    },
    Data_Person_fun_local: () => {
      if (Cookies_person) {
        return Cookies_person;
      }
      return;
    },
  },
});

export const { Data_Person_fun_get, Data_Person_fun_local } =
  Data_Person.actions;
export default Data_Person.reducer;
