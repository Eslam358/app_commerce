// @ts-nocheck
/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
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
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import {
  CloseOutlined,
  Favorite,
  FavoriteBorderOutlined,
} from "@mui/icons-material";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { wishlist } from "../../reduxtoolkit/slice/Wishlist/Wishlist";
import { wishlist_list } from "../../reduxtoolkit/slice/Wishlist/Wishlist_list";
import { cart_Update_quantity } from "../../reduxtoolkit/slice/Cart/Update_quantity";
import { useState } from "react";

import {

  Update_cart,
  Remove_cart,
} from "../../reduxtoolkit/slice/Cart/Items_Cart";
import { Open_Dialog_test } from "../../reduxtoolkit/slice/global/Dialog_test_sigin";
import Add_Button from "../Button/Add_Button";

export default function ResponsiveDialog({ setOpen, open, item }) {
  const theme = useTheme();
  const Data_Person = useSelector((dat) => dat.Data_Person);
  const cart_list = useSelector((dat) => dat.cart_items);
  const cart_product = cart_list.data.products?.find(
    (a) => a.product.id === item.id
  );
  const width_450 = useMediaQuery('(max-width:500px)');
  const width_800 = useMediaQuery('(max-width:800px)');
  // const width_800 = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  // @ts-ignore
  const Wishlist_list_data = useSelector((dat) => dat.Wishlist_list);
  const Redux_fun = useDispatch();
  const [loading, setLoading] = useState(false);

  const Update_quantity = (id, count) => {
    Redux_fun(cart_Update_quantity({ id, count }));
    if (count === 0) {
      Redux_fun(Remove_cart(id));
      return;
    }
    Redux_fun(Update_cart({ id, count }));
  };
  const Wishlist__ = async (data) => {
    if (Data_Person.message !== "success") {
      Redux_fun(Open_Dialog_test());

      return;
    }
    setLoading(true);
    // @ts-ignore
    await Redux_fun(wishlist(data));
    // @ts-ignore
    await Redux_fun(wishlist_list());
    setLoading(false);
  };

  return (
    <>
      <Dialog
        width_800={width_800}
        maxWidth={"md"}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Stack
            // direction={"row"}
            direction={width_800 ? "column" : "row"}
            sx={{
              position: "relative",

              ".icon.close": {
                position: "absolute",
                right: "-10px",

                top: "-10px",
                transition: "0.3s",
              },
            }}
          >
            <Box>
              <Box
                maxWidth={width_800 ? "100%" : "400px"}
                sx={{
                  textAlign: "center",
                  ".fexx": {
                    display: "inline-block",
                    img: { width: "100%" },
                    overflow: "hidden",
                  },

                  ".swiper-pagination": { marginBottom: "-5px" },
                  ".swiper-pagination-bullet": {
                    width: "50px",
                    height: "50px",

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
                  style={{ padding: "0 0 60px"  }}
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  slidesPerView={1}
                  loop
                  pagination={{
                    dynamicBullets: true,
                    clickable: true,
                    renderBullet: function (index, className) {
                      return (
                        '<span class="fexx ' +
                        className +
                        '">' +
                        ` <img src=${item.images[index]} alt="img" />` +
                        "</span>"
                      );
                    },
                  }}
                >
                  {item.images?.map((img) => (
                    <SwiperSlide key={img}>
                      <img width={"350" } style={{margin:"0 8px"}} src={img} alt="img" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Box>
            <Box flex={1}>
              <Card elevation={0}>
                <CardContent sx={{ textAlign: "start" }}>
                  <Typography
                    variant="h5"
                    color="text"
                    sx={{ fontWeight: "bold" }}
                  >
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
                    sx={{ fontWeight: "bold", py: 3 }}
                  >
                    price: ${item?.price}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                   
                  >
                    quantity : {item?.quantity}
                  </Typography>
                  <Typography variant="h6" component="div" py={1}>
                    brand : {item.brand?.name}
                  </Typography>
                  <Rating readOnly defaultValue={item?.ratingsAverage} />

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
                      <CircularProgress
                        sx={{ position: "absolute" }}
                        size={18}
                      />
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
                        onClick={() => {
                          let count = cart_product.count - 1;
                          Update_quantity(cart_product.product.id, count);
                        }}
                        aria-label="close"
                        sx={{
                          border: `1px solid ${theme.palette.red_main.main} `,
                        }}
                      >
                        <HorizontalRuleIcon fontSize="inherit" />
                        
                      </IconButton>
                    </Stack>
                  ) : (
                    <Add_Button item={item} />
                  )}
                </CardActions>

                <IconButton
                  onClick={handleClose}
                  sx={{
                    zIndex: 9999,
                    bgcolor:`${width_450?"#999":""}`,
                    display: "inline-flex",

                    "&:hover ": {
                      transform: " rotate(180deg)",
                      color: "red",
                    },
                  }}
                  className="icon close"
                  aria-label="close"
                >
                  <CloseOutlined />
                </IconButton>
              </Card>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
