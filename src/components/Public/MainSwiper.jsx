import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Rating } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Badge from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ResponsiveDialog from "./Dialog";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { wishlist } from "../../reduxtoolkit/slice/Wishlist/Wishlist";
import { wishlist_list } from "../../reduxtoolkit/slice/Wishlist/Wishlist_list";
import { cart_add_item } from "../../reduxtoolkit/slice/Cart/Add_Item";
import { cart_items } from "../../reduxtoolkit/slice/Cart/Items_Cart";
import { useNavigate } from "react-router-dom";

import { Open_Dialog_test } from "../../reduxtoolkit/slice/global/Dialog_test_sigin";

// eslint-disable-next-line react/prop-types
function MainSwiper({ Arr, num }) {
  const Arr_loading = [1, 2, 3, 4, 5];
  // @ts-ignore
  const Data_Person = useSelector((dat) => dat.Data_Person);
  // @ts-ignore
  const Cart_list = useSelector((dat) => dat.cart_items);
  const cart_add_item_data = useSelector((dat) => dat.cart_add_item);
  // @ts-ignore
  const Wishlist_list_data = useSelector((dat) => dat.Wishlist_list);
  const Redux_fun = useDispatch();
  const [loading, setLoading] = useState(false);

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matches_md = useMediaQuery(theme.breakpoints.up("md"));
  const matches_lg = useMediaQuery(theme.breakpoints.up("lg"));
  num = matches_lg ? num : matches_md ? 3 : matches ? 2 : 1;

  const [open, setOpen] = useState(false);
  const [loading_item, setloading_item] = useState("");
  const [item, setItem] = useState([]);
  const handleClickOpen = (item) => {
    setOpen(true);
    setItem(item);
  };
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          overflow: "hidden",
          position: "relative",

          ".swiper-button-prev": { transition: "0.3s" },
          "&:hover .swiper-button-prev": {
            transform: "translateX(0)",
          },
          ".swiper-button-next": { transition: "0.3s" },
          "&:hover .swiper-button-next": {
            transform: "translateX(0)",
          },
        }}
      >
        <Swiper
          className="Swiper-one"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={matches ? 50 : 10}
          slidesPerView={num}
          navigation
          loop
          // slidesPerGroup={num}
          // loopedSlides={num - 1}
        >
          {[...Arr].length > 0 ? (
            <>
              {[...Arr].map((item) => (
                <SwiperSlide key={item._id}>
                  <Card
                    onClick={() => {
                      navigate(`/Item/${item.title}`, {
                        state: { item: item },
                      });
                    }}
                    sx={{
                      cursor: "pointer",
                      py: 1,
                      px: 2,
                      position: "relative",
                      border: "1px solid white",
                      zIndex: "0",

                      "&:hover .MuiCardMedia-root": {
                        scale: "0.9",
                      },
                      ".icon": {
                        position: "absolute",
                        right: "-25px",
                        color: "#777",
                        ".Visibility": {},
                        top: "20px",
                        transition: "0.3s",
                      },
                      ".Favorite": {
                        top: "45px",
                        transition: "0.45s",
                      },

                      "&:hover .icon.Favorite, &:hover .icon.Visibility": {
                        right: "11px",
                      },

                      "&:hover ": {
                        border: "1px solid #777",
                      },
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: "350px",
                        width: "100%",
                        m: "auto",
                        scale: "0.8",
                        transition: "0.3s",
                      }}
                      image={item.imageCover}
                    />

                    <CardContent sx={{ textAlign: "start" }}>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        height={55}
                      >
                        {item.title.length <= 45
                          ? item.title
                          : item.title.slice(0, 40) + " ..."}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        ${item.price}
                      </Typography>
                      <Box>
                        <Rating
                          readOnly
                          name="size-small"
                          defaultValue={item.ratingsAverage}
                          sx={{ fontSize: "15px" }}
                        />
                        {Cart_list.data.products?.find(
                          (a) => a.product.id === item.id
                        ) ? (
                          <Badge
                            badgeContent={
                              Cart_list.data.products?.find(
                                (a) => a.product.id === item.id
                              ).count
                            }
                            sx={{
                              position: "absolute",
                              right: "30%",
                              span: {
                                // @ts-ignore
                                bgcolor: `${theme.palette.red_main.main}`,
                                color: "white",
                                top: "0px",
                                right: "0px",
                              },
                            }}
                          >
                            <LocalGroceryStoreIcon color="action" />
                          </Badge>
                        ) : (
                          ""
                        )}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();

                          if (Data_Person.message !== "success") {
                            Redux_fun(Open_Dialog_test());

                            return;
                          }
                          add_item(item.id);
                          setloading_item(item.id);
                        }}
                        sx={{
                          width: "90%",

                          mx: "auto",
                          color: theme.palette.text.button,
                          fontWeight: "bold",
                          transition: "0.5s",
                          border: "1px solid #777",
                          textTransform: "capitalize",

                          "&:hover": {
                            bgcolor: "#1f2937",
                            color: "white",
                          },
                        }}
                        size="medium"
                      >
                       {((cart_add_item_data.loading || Cart_list.loading) && loading_item === item.id) ? "loading...":" Add to Car"}
                        {((cart_add_item_data.loading || Cart_list.loading) && loading_item === item.id) && (
                       
                          <CircularProgress
                         sx={{ position: "absolute"}}
                            size={25}
                          />
                     
                          
                        )}
                      </Button>
                    </CardActions>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();

                        handleClickOpen(item);
                      }}
                      className="icon Visibility"
                      aria-label="Visibility"
                      size="small"
                    >
                      <VisibilityIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      disabled={loading}
                      className="icon Favorite"
                      aria-label="Favorite"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (Data_Person.message !== "success") {
                          Redux_fun(Open_Dialog_test());

                          return;
                        }

                        Wishlist__({
                          id: item.id,
                          remove: Wishlist_list_data.data?.find(
                            (a) => a.id === item.id
                          ),
                        });
                      }}
                    >
                      {Wishlist_list_data.data?.find(
                        (a) => a.id === item.id
                      ) ? (
                        <FavoriteIcon color={"error"} fontSize="inherit" />
                      ) : (
                        <FavoriteBorderOutlinedIcon fontSize="inherit" />
                      )}
                      {loading && (
                        <CircularProgress
                          sx={{ position: "absolute" }}
                          size={18}
                        />
                      )}
                    </IconButton>
                  </Card>
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {Arr_loading.map((item) => (
                <SwiperSlide key={item}>
                  <Card sx={{ p: 1 }}>
                    <CardMedia
                      sx={{
                        height: "250px",
                        width: "100%",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                      />
                    </CardMedia>

                    <CardContent sx={{ textAlign: "start" }}>
                      <Skeleton height={70} />
                      <Skeleton width="60%" />
                      <Skeleton />
                    </CardContent>
                    <CardActions>
                      <Skeleton width="60%" height={50} />
                    </CardActions>
                  </Card>
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
        <ResponsiveDialog setOpen={setOpen} open={open} item={item} />
      </Box>
    </>
  );
}

export default MainSwiper;
