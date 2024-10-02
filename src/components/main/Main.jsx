import { Container } from "@mui/material";
import Titel2 from "../Titile/Titel_2_";
import MainSwiper from "../Public/MainSwiper";
import Titel3 from "../Titile/Titile_3";
import Titel4 from "../Titile/Titile_4";
import Titel5 from "../Titile/Titile_5";
import SelectedProducts from "./Selected_Products";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Categories";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // جلب البيانات باستخدام axios
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((response) => {
        // وضع البيانات في الحالة
        setProducts(response.data.data);
        console.log("response22355",response)
        setLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        // التعامل مع الأخطاء
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Container maxWidth="xl">
     
        <MainSwiper Arr={products} num={4} />
        <Titel2 />
        {/* Electronics */}
        <Categories category_id={"6439d2d167d9aa4ca970649f"} />

        <Titel3 />

        {/* Men's Fashion */}
        <Categories category_id={"6439d5b90049ad0b52b90048"} />
        <Titel4 />

        {/* Women's Fashion */}
        <Categories category_id={"6439d58a0049ad0b52b9003f"} />
        <Titel5 />
        <SelectedProducts />
      </Container>
      <Footer />
    </>
  );
};

export default Main;
