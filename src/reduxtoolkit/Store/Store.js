import { configureStore } from "@reduxjs/toolkit";
import {Sign_in, Sign_up} from "../slice/DialogSign";
import Data_Person from "../slice/Data_Person";
import Snackbars from "../slice/Snackbars";
import Wishlist from "../slice/Wishlist/Wishlist";
import Wishlist_list from "../slice/Wishlist/Wishlist_list";
import cart_add_item from "../slice/Cart/Add_Item";
import Remove_cart_item from "../slice/Cart/Remove_Item";
import cart_items from "../slice/Cart/Items_Cart";
import Clear_cart from "../slice/Cart/Clear_Cart";
import Update_quantity from "../slice/Cart/Update_quantity";
import Categories from "../slice/Categories/Get_categories";
import category_Item from "../slice/Categories/category_Item";


const store = configureStore({
  reducer: {
    Sign_in,
    Sign_up,
    Data_Person,
    Snackbars,
    Wishlist,
    Wishlist_list,
    cart_add_item,
    Remove_cart_item,
    cart_items,
    Clear_cart,
    Update_quantity,
    Categories,
    category_Item,
  },
});

export default store;