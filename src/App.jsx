import { ThemeProvider } from "@mui/material/styles"; //--3
import CssBaseline from "@mui/material/CssBaseline"; //--3

import { ColorModeContext, useMode } from "./theme";

import { useSelector, useDispatch } from "react-redux";

import { wishlist_list } from "./reduxtoolkit/slice/Wishlist/Wishlist_list";
import { cart_items } from "./reduxtoolkit/slice/Cart/Items_Cart";
import { Categories_items } from "./reduxtoolkit/slice/Categories/Get_categories";
import { useEffect } from "react";
import { Data_Person_fun_local } from "./reduxtoolkit/slice/global/Data_Person";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Roote />}>
      <Route index element={<Home />} />
      <Route path="Item/:name" element={<Item />} />
      <Route path="Categories/:name" element={<Categories />} />
      <Route path="ViewCart" element={<ViewCart />} />

      <Route path="*" element={<Notfound />} />
    </Route>
  )
);

function App() {
   // @ts-ignore
  const Data_Person = useSelector((dat) => dat.Data_Person);
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();

  useEffect(() => {
     // @ts-ignore
    dispatch(Categories_items());
   (async () => {
      // @ts-ignore
      await dispatch(Data_Person_fun_local());
      if (Data_Person.message === "success") {
        // @ts-ignore
        
        dispatch(wishlist_list());
        // @ts-ignore
        dispatch(cart_items());
       
      }
    })()
    
  }, [Data_Person.message, dispatch]);

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
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
