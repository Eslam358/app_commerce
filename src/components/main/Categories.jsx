import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import MainSwiper from "../Public/MainSwiper";
import ButtonShop from "../Public/Button_shop";
// import { useSelector, useDispatch } from "react-redux";
// import { Category_items } from "../../reduxtoolkit/slice/Categories/category_Item";
import { useEffect, useState } from "react";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Categories = ({ category_id }) => {
  const [products, setProducts] = useState([]);
  const [products_, setProducts_] = useState([]);
  const [SubCategories_data, setSubCategories_data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();

  const matches_md = useMediaQuery(theme.breakpoints.only("md"));

  const category = () => {
    // جلب البيانات باستخدام axios
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${category_id}`
      )
      .then((response) => {
        // وضع البيانات في الحالة
        setProducts(response.data.data);
        setProducts_(response.data.data);

        setLoading(false);
      })
      .catch((error) => {
        // التعامل مع الأخطاء
        setError(error);
        setLoading(false);
      });
  };
  const SubCategories = () => {
    // جلب البيانات باستخدام axios
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${category_id}/subcategories`
      )
      .then((response) => {
        // وضع البيانات في الحالة
        setSubCategories_data(response.data.data.reverse());
      })
      .catch((error) => {
        // التعامل مع الأخطاء
        setError(error);
        setLoading(false);
      });
  };
  const subcategory_fe = (subcategory_id) => {
    const filter_ = products_;
    const subcat_ = filter_.filter(
      (a) => a.subcategory[0]._id == subcategory_id
    );

    setProducts(subcat_);
  };

  useEffect(() => {
    category();
    SubCategories();
  }, []);

  return (
    <>
      <Stack direction={{ xs: "column", lg: "row" }} gap={2}>
        <Card sx={{ p: 3, minWidth: "350px" }}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography
                sx={{ mt: 1, mb: 0, pl: 0 }}
                variant="h6"
                component="div"
              >
                {products_[0]?.category?.name}
              </Typography>

              <List>
                {SubCategories_data.map((Category) => (
                  <ListItem key={Category._id}>
                    <Button
                      onClick={() => subcategory_fe(Category._id)}
                      sx={{
                        ":hover": { color: "red" },
                        color: theme.palette.text.primary,
                        width: "fit-content",
                        p: 0,
                        textTransform: "capitalize",
                      }}
                    >
                      {Category.name}
                    </Button>
                  </ListItem>
                ))}

                <ButtonShop bg_color={theme.palette.text.primary} />
              </List>
            </Box>
            {matches_md && (
              <Box sx={{ flex: "1", textAlign: "center" }}>
                <img width="300px" src={products_[0]?.category?.image} alt="" />
              </Box>
            )}
          </Stack>
        </Card>
        <MainSwiper Arr={products} num={3} />
      </Stack>
    </>
  );
};

export default Categories;
