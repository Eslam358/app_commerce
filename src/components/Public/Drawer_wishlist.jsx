// @ts-nocheck
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ListItemText from "@mui/material/ListItemText";
import { Button, IconButton, Stack, useTheme } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { wishlist } from "../../reduxtoolkit/slice/Wishlist/Wishlist";
import { wishlist_list } from "../../reduxtoolkit/slice/Wishlist/Wishlist_list";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
 function Wishlist_Drawer({ toggleDrawer, Drawer_open }) {

function clear_list() {
  Wishlist_list_data.data.forEach(prodect => {
   Redux_fun(wishlist({ id: prodect.id, remove: prodect }));
  });
  Redux_fun(wishlist_list());
  toggleDrawer(false)
}

  const theme = useTheme();
  const Redux_fun = useDispatch();
  // @ts-ignore
  const Wishlist_list_data = useSelector((dat) => dat.Wishlist_list);


  // @ts-ignore
  const navigate = useNavigate();
  const [, setProduct] = useState([]);
  const Remove_item = async (product) => {
    await Redux_fun(wishlist({ id: product.id, remove: product }));
    // @ts-ignore
    await Redux_fun(wishlist_list());
  };

  const get_product = (data) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${data}`)
      .then((response) => {
        // وضع البيانات في الحالة
        setProduct(response.data.data);
        navigate(`/Item/${response.data.data.title.split(" ")[0]}`, {
          state: { item: response.data.data },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const DrawerList = (
    <Box
      sx={{
        width: 300,
        position: "relative",
      }}
      role="presentation"
    >
      <List>
        <Stack
          p={1}
          fontSize={"14px"}
          alignItems="center"
          gap={1}
          direction={"row"}
          height="6vh"
        >
          <FavoriteIcon color={Wishlist_list_data.data.length ? "error" : ""} />
          {Wishlist_list_data?.data?.length} items
        </Stack>

        <Divider />
        <Box height="78vh" sx={{ overflow: "auto" }}>
          {Wishlist_list_data.data?.map((product, index) => (
            <Box key={index}>
              <ListItem sx={{ p: 1 }}>
                <ListItemButton
                  onClick={() => get_product(product.id)}
                  sx={{ p: "5px" }}
                >
                  <ListItemIcon sx={{ mr: 1 }}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      width={"50px"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ span: { fontSize: "12px" } }}
                    primary={product.title}
                  />
                </ListItemButton>
                <IconButton
                  onClick={() => {
                    Remove_item(product);
                  }}
                  size="small"
                  sx={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    transition: "0.3s",
                    minWidth: "25px",
                    minHeight: "25px",

                    p: 0,

                    "&:hover ": {
                      transform: " rotate(180deg)",
                      color: "red",
                    },
                  }}
                  className="icon close"
                  aria-label="close"
                >
                  <CloseOutlined fontSize="inherit" />
                </IconButton>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </Box>
        <Divider />

        <Stack
          // className="fex"
          height={"10vh"}
          px={4}
          gap={1}
          direction={"column"}
          // alignItems={"start"}
          justifyContent={"end"}
          // alignContent={"flex-end"}
        >
          <Button
            onClick={() => {
              navigate(`/Categories/Wishlist`, {
                state: { Categories: Wishlist_list_data.data },
              });
              toggleDrawer(false);
            }}
            disabled={
              location.pathname === "/Categories/Wishlist" ? true : false
            }
            sx={{
              textTransform: "capitalize",
              p: "2px",
              // @ts-ignore
              bgcolor: theme.palette.red_main.main,
            }}
            size="small"
            variant="contained"

          >
            view Wishlist
          </Button>
          <Button
          onClick={clear_list}
            sx={{
              textTransform: "capitalize",
              p: "2px",
            }}
            color="error"
            size="small"
            variant="outlined"
          >
            Clear wishlist
          </Button>
        </Stack>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={Drawer_open}
        onClose={() => toggleDrawer(false)}
      >
        {DrawerList}
        <Box>
          {/* <Box sx={{width:"20px",height:"20px",position}}> */}
          <IconButton
            onClick={() => toggleDrawer(false)}
            size="small"
            sx={{
              position: "absolute",
              right: "5px",
              top: "5px",
              transition: "0.3s",
              p: 0,
              minWidth: "25px",
              minHeight: "25px",

              "&:hover ": {
                color: "red",
                transform: " rotate(180deg)",
              },
            }}
            className="icon close "
            aria-label="close"
          >
            <CloseOutlined fontSize="inherit" />
          </IconButton>
        </Box>
      </Drawer>
    </div>
  );
}

export default Wishlist_Drawer;