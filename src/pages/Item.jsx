import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { wishlist } from "../reduxtoolkit/slice/Wishlist/Wishlist";
import { wishlist_list } from "../reduxtoolkit/slice/Wishlist/Wishlist_list";
import { cart_Update_quantity } from "../reduxtoolkit/slice/Cart/Update_quantity";
import { useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { refresh_cart } from "../reduxtoolkit/slice/Cart/Items_Cart";

import { cart_add_item } from "../reduxtoolkit/slice/Cart/Add_Item";
import { cart_items } from "../reduxtoolkit/slice/Cart/Items_Cart";

export default function Item() {
  const Params = useParams() || "";
  const Location = useLocation();
  const Navigate = useNavigate();

  const item = Location.state.item || [];


  const theme = useTheme();
  const cart_list = useSelector((dat) => dat.cart_items);

  const Update_quantity_ = useSelector((dat) => dat.Update_quantity);

  const cart_product = cart_list.data?.products?.find(
    (a) => a.product.id === item.id
  );

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // @ts-ignore
  const Wishlist_list_data = useSelector((dat) => dat.Wishlist_list);
  const Redux_fun = useDispatch();
  const [loading, setLoading] = useState(false);

  const Update_quantity = (id, count) => {
      // @ts-ignore
    Redux_fun(cart_Update_quantity({ id, count }));
  };
  const Wishlist__ = async (data) => {
    setLoading(true);
    // @ts-ignore
    await Redux_fun(wishlist(data));
    // @ts-ignore
    await Redux_fun(wishlist_list());
    setLoading(false);
  };

  const add_item = async (data) => {
    // @ts-ignore
    await Redux_fun(cart_add_item(data));
    // @ts-ignore
    await Redux_fun(cart_items());
  };

  useEffect(() => {
    //Update_quantity_.data.data.products);

    if (Update_quantity_.data?.products && !Update_quantity_.loading) {
      Redux_fun(refresh_cart(Update_quantity_));
    }
  }, [Update_quantity_.data]);

  return (
  
     <Container maxWidth="xl">
      <Stack
        direction={fullScreen ? "column" : "row"}
        gap={2}
        sx={{
          position: "relative",
          my:4,
          
        }}
      >
        <Box>
          <Box
            maxWidth={fullScreen ? "100vw" : "50vw"}
            sx={{
              img: {
                width: "55%",
                margin: "0  23%",
              },

              ".fexx": {
                display: "inline-flex",
                justifyContent: "center",

                img: { width: "100%" },
                overflow: "hidden",
              },

              ".swiper-pagination": { marginBottom: "-5px" },
              ".swiper-pagination-bullet": {
                width: "90px",
                height: "90px",

                bgcolor: "#FFF",
                opacity: 0.7,
                transition: "0.8s",
              },
              ".swiper-pagination-bullet.swiper-pagination-bullet-active": {
                border: "1px solid #999",
                opacity: 1,
              },
            }}
          >
            <Swiper
              style={{ padding: "0 0 130px" }}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              // slidesPerView={1}
              // loop
              pagination={{
                dynamicBullets: true,
                clickable: true,
                renderBullet: function (index, className) {
                  return (
                    '<span class="fexx ' +
                    className +
                    '">' +
                    ` <img src=${item.images[index]} alt="ppppp" />` +
                    "</span>"
                  );
                },
              }}
            >
              {item.images?.map((img) => (
                <SwiperSlide key={img}>
                  <img src={img} alt="ppppp" />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
        <Box flex={1}>
          <Card elevation={0}>
            <CardContent sx={{ textAlign: "start" }}>
              <Typography variant="h5" color="text" sx={{ fontWeight: "bold" }}>
                {item?.title}
              </Typography>
              <Typography
                minHeight="150px"
                pt={2}
                variant="h6"
                color="text.secondary"
              >
                {item?.description}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", py: 2 }}
              >
                price: ${item?.price}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                // sx={{ fontWeight: "bold" }}
              >
                quantity : {item?.quantity}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                // sx={{ fontWeight: "bold" }}
              >
                category : {item?.category.name}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                // sx={{ fontWeight: "bold" }}
              >
                sold : {item?.sold}
              </Typography>
              <Typography variant="h6" component="div">
                brand : {item.brand?.name}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                py={1}
                sx={{
                  fontWeight: "bold",
                  py: 1,
                  color: theme.palette.red_main.main,
                }}
              >
                {cart_product &&
                  "total : " + cart_product?.price * cart_product?.count}
              </Typography>
              <Rating
                // name="size-small"
                defaultValue={item?.ratingsAverage}
              />
              {"(" + item?.ratingsAverage + ")"}
              <IconButton
                sx={{ ml: 4, mb: 2 }}
                disabled={loading}
                className="icon Favorite"
                aria-label="Favorite"
                onClick={() =>
                  Wishlist__({
                    id: item.id,
                    remove: Wishlist_list_data.data?.find(
                      (a) => a.id === item.id
                    ),
                  })
                }
              >
                {Wishlist_list_data.data?.find((a) => a.id === item.id) ? (
                  <Favorite color={"error"} fontSize="inherit" />
                ) : (
                  <FavoriteBorderOutlined fontSize="inherit" />
                )}
                {loading && (
                  <CircularProgress sx={{ position: "absolute" }} size={18} />
                )}
              </IconButton>
            </CardContent>
            <CardActions>
              {cart_product ? (
                <Stack
                  direction={"row"}
                  gap={3}
                  alignItems={"center"}
                  sx={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  <IconButton
                    sx={{
                      border: `1px solid ${theme.palette.red_main.main} `,
                      //  fontSize: "14px",
                    }}
                    onClick={() => {
                      let count = cart_product?.count + 1;
                      Update_quantity(cart_product.product.id, count);
                    }}
                    //  size="small"
                    aria-label="close"
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                  <p>{cart_product.count}</p>
                  <IconButton
                    //  disabled={cart_product?.count === 1}
                    onClick={() => {
                      let count = cart_product.count - 1;
                      Update_quantity(cart_product.product.id, count);
                    }}
                    //  size="small"
                    aria-label="close"
                    sx={{
                      border: `1px solid ${theme.palette.red_main.main} `,
                      //  fontSize: "14px",
                    }}
                  >
                    <HorizontalRuleIcon fontSize="inherit" />
                  </IconButton>
                </Stack>
              ) : (
                <Button
                  onClick={() => add_item(item.id)}
                  sx={{
                    width: "90%",
                    py: 1,
                    mx: "auto",
                    color: theme.palette.text.button,
                    fontWeight: "bold",
                    transition: "0.5s",
                    border: "1px solid #777",
                    textTransform: "capitalize",
                    fontSize: "18px",

                    "&:hover": {
                      bgcolor: "#1f2937",
                      color: "white",
                    },
                  }}
                  size="large"
                >
                  Add to Cart
                </Button>
              )}
            </CardActions>
          </Card>
        </Box>
      </Stack>
      </Container>
  
  );
}
