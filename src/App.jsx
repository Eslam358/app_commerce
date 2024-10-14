import { ThemeProvider } from "@mui/material/styles"; //--3
import CssBaseline from "@mui/material/CssBaseline"; //--3

import { ColorModeContext, useMode } from "./theme";

import { useDispatch } from "react-redux";

import { wishlist_list } from "./reduxtoolkit/slice/Wishlist/Wishlist_list";
import { cart_items } from "./reduxtoolkit/slice/Cart/Items_Cart";
import {Categories_items} from "./reduxtoolkit/slice/Categories/Get_categories";
import { useEffect } from "react";
import { Data_Person_fun_local } from "./reduxtoolkit/slice/Data_Person";

import Roote from "./pages/Roote";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Categories from "./pages/Categories";
import Notfound from "./pages/Notfound";
import ViewCart from "./pages/ViewCart";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dialog_test_signIn from "./components/Public/Dialog_test_Signin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Roote />}>
      <Route index element={<Home />} />
      <Route path="Item/:name" element={<Item />} />
      <Route path="Categories/:name" element={<Categories />} />
      <Route path="ViewCart" element={<ViewCart />} />
    
      <Route path="*" element={<Notfound/>} />
    </Route>
  )
);


function App() {
  const [theme, colorMode] = useMode();
  const redux_Fun = useDispatch();
  // @ts-ignore

  useEffect(() => {
    // @ts-ignore
    redux_Fun(wishlist_list());
    // @ts-ignore
    redux_Fun(cart_items());
    redux_Fun(Data_Person_fun_local());
    // @ts-ignore
    redux_Fun(Categories_items());
  }, []);

  return (
    <>
      <ColorModeContext.Provider
        // @ts-ignore
        value={colorMode}
      >
        <ThemeProvider
          // @ts-ignore
          theme={theme}
        >
          <CssBaseline />
          <RouterProvider router={router} />
          <Dialog_test_signIn />

        </ThemeProvider>
      </ColorModeContext.Provider>
  
    </>
  );
}

export default App;
