import { ThemeProvider } from "@mui/material/styles"; //--3
import CssBaseline from "@mui/material/CssBaseline"; //--3

import { ColorModeContext, useMode } from "./theme";

import { useDispatch } from "react-redux";

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
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(wishlist_list());
    // @ts-ignore
    dispatch(cart_items());
    dispatch(Data_Person_fun_local());
    // @ts-ignore
    dispatch(Categories_items());
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
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
