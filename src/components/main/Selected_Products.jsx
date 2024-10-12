import { Box, Stack, Typography } from "@mui/material";
import MainSwiper from "../Public/MainSwiper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";
import { useState,useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const SelectedProducts = () => {
  const theme = useTheme();

  const [alignment, setAlignment] = useState("?category=6439d2d167d9aa4ca970649f");
  const [products, setProducts] = useState([]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const category = (alignment) => {
    // جلب البيانات باستخدام axios
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/products${alignment}`
      )
      .then((response) => {
        // وضع البيانات في الحالة
        setProducts(response.data.data);
   
        
        // setLoading(false);
      })
      .catch((error) => {
        // التعامل مع الأخطاء
        // setError(error);
        // setLoading(false);
        console.log(error);
        
      });
  };

  useEffect(() => {
    category(alignment);
    // SubCategories();
  }, [alignment]);


  return (
    <>
      <Box pb={4}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          // justifyContent={"space-around"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            overflow: "hidden",
            mt: 7,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="p"
              //   textAlign={"center"}
              fontWeight={"bold"}
              color={  theme.palette.text.primary}
              flexGrow={"1"}
            >
              Selected Products
            </Typography>

            <Typography
              textAlign={"center"}
              color={  theme.palette.text.primary}
              fontSize={"17px"}
              mt={0}
            >
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>
          <Box>
            <ToggleButtonGroup
              color="error"
              value={alignment}
              exclusive
              onChange={handleChange}
              //   aria-label="Platform"

              sx={{
                display:"flex",
                flexWrap:"wrap",
                // gap:"10px",
                ".MuiButtonBase-root": {
                  border: "1px solid #aaa",
                  width: "120px",
                  height:"75px",
                  py: "10px",
                  m: 1,
                  fontWeight: "bold",
                  fontSize: "24",
                  transition: "0.5s",
                  textTransform: "capitalize",
                  "&:not(.Mui-selected)": {
                    color: "#222",
                    bgcolor: "#fff",
                    "&:hover": {
                      bgcolor: "#1f2937",
                      color: "white",
                    },
                  },
                },
              }}
              size="large"
             
            >
              <ToggleButton value="?category=6439d2d167d9aa4ca970649f">New Arrivals</ToggleButton>
              <ToggleButton value="?sort=-price">Best Seller</ToggleButton>
              <ToggleButton value="?sort=-price&price[lte]=1000">Most Popular</ToggleButton>
              <ToggleButton value="?page=2">View All</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Stack>
        <MainSwiper Arr={products} num={4} />
      </Box>
    </>
  );
};

export default SelectedProducts;
