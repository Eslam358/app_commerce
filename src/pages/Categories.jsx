import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorderOutlined,
  LocalGroceryStore,
  Visibility,
} from "@mui/icons-material";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useSelector, useDispatch } from "react-redux";
import { wishlist } from "../reduxtoolkit/slice/Wishlist/Wishlist";
import { wishlist_list } from "../reduxtoolkit/slice/Wishlist/Wishlist_list";
import { useState } from "react";
import { useParams,useLocation, useNavigate } from "react-router-dom";

import { cart_add_item } from "../reduxtoolkit/slice/Cart/Add_Item";
import { cart_items } from "../reduxtoolkit/slice/Cart/Items_Cart";
import ResponsiveDialog from "../components/Public/Dialog";

export default function Categories() {
    const Params = useParams() || "";

  const Location = useLocation();
  const Navigate = useNavigate();

  const item = Location.state.Categories || [];


  const theme = useTheme();


  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  // ---------------------------------------------
  // @ts-ignore
  const [open, setOpen] = useState(false);
  const [loading_item, setloading_item] = useState("");
  const [item_, setItem] = useState([]);
  const handleClickOpen = (item_) => {
      setOpen(true);
    setItem(item_);
  };
  // @ts-ignore
  const Cart_list = useSelector((dat) => dat.cart_items);
  const add_item = async (data) => {
    // @ts-ignore
    await Redux_fun(cart_add_item(data));
    // @ts-ignore
    await Redux_fun(cart_items());
  };
  // ---------------------------------------------

  return (
    <>
     <Container maxWidth="xl" sx={{my:5}}>
      <Box sx={{p:2, border:"1px solid #eee", textAlign:"center", fontWeight:"bold", m:2, mb:6, fontSize:"28px"}}>{Params.
// @ts-ignore
      name}</Box>
      <Stack
        direction={fullScreen ? "column" : "row"}
        gap={2}
        sx={{
          position: "relative",
        }}
      >

        <Stack
          p={1}
          pt={2}
          fontSize={"14px"}
          alignItems="center"
          justifyContent={"space-between"}
          gap={1}
          flexWrap={"wrap"}
          direction={"row"}
        >
          {/* ------------------------------------------------------- */}
          {item.map((item) => (
            <Card
          
              key={item.id}
              onClick={() => {
                Navigate(`/Item/${item.title}`, { state: { item: item } });
              }}
              sx={{
                cursor: "pointer",
                py: 1,
                px: 2,
                position: "relative",
                border: "1px solid white",
                zIndex: "0",
                width:"300px",

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

              {/* <Link to={{pathname:"/Item/eslam"}} state={{item:item}}>kkkkkkkkkk</Link> */}
              <CardContent sx={{ textAlign: "start" }}>
                <Typography variant="body1" color="text.secondary" height={55}>
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
                      <LocalGroceryStore color="action" />
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
                  Add to Cart
                  {Cart_list.loading && loading_item == item.id && (
                    <CircularProgress sx={{ position: "absolute" }} size={18} />
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
                <Visibility fontSize="inherit" />
              </IconButton>
              <IconButton
                disabled={loading}
                className="icon Favorite"
                aria-label="Favorite"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  Wishlist__({
                    id: item.id,
                    remove: Wishlist_list_data.data?.find(
                      (a) => a.id === item.id
                    ),
                  });
                }}
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
            </Card>
          ))}

          {/* ------------------------------------------------------- */}
        </Stack>
      </Stack>
      </Container>
      <ResponsiveDialog setOpen={setOpen} open={open} item={item_} />
    </>
  );
}
