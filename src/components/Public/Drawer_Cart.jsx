import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button, IconButton, Stack, useTheme } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useSelector, useDispatch } from "react-redux";
import { Remove_cart_item } from "../../reduxtoolkit/slice/Cart/Remove_Item";
import { cart_Update_quantity } from "../../reduxtoolkit/slice/Cart/Update_quantity";
import { cart_items } from "../../reduxtoolkit/slice/Cart/Items_Cart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function Cart_Drawer({ toggleDrawer, Drawer_open }) {
  const theme = useTheme();
  const fun_redux = useDispatch();
  // @ts-ignore
  const cart_list = useSelector((dat) => dat.cart_items);

  // @ts-ignore
  const navigate = useNavigate();
  const [, setProduct] = useState([]);
  const Remove_item = async (product_id) => {
    // @ts-ignore
    await fun_redux(Remove_cart_item(product_id));
    // @ts-ignore
    await fun_redux(cart_items());
  };
  const Update_quantity = (id, count) => {
    // @ts-ignore
    fun_redux(cart_Update_quantity({ id, count }));
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
      console.error(error)
      
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
          <Bag /> {cart_list.data?.products?.length} items
        </Stack>

        <Divider />
        <Box height="78vh" sx={{ overflow: "auto" }}>
          {cart_list.data?.products?.map((product, index) => (
            <Box key={index}>
              <ListItem sx={{ p: 1 }}>
                <Box textAlign="center" sx={{ fontSize: "14px" }}>
                  <IconButton
                    sx={{
                      // @ts-ignore
                      border: `1px solid ${theme.palette.red_main.main} `,
                      fontSize: "14px",
                    }}
                    onClick={() => {
                      let count = product.count + 1;
                      Update_quantity(product.product.id, count);
                    }}
                    size="small"
                    aria-label="close"
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                  <p>{product.count}</p>
                  <IconButton
                    disabled={product.count === 1}
                    onClick={() => {
                      let count = product.count - 1;
                      Update_quantity(product.product.id, count);
                    }}
                    size="small"
                    aria-label="close"
                    sx={{
                      // @ts-ignore
                      border: `1px solid ${theme.palette.red_main.main} `,
                      fontSize: "14px",
                    }}
                  >
                    <HorizontalRuleIcon fontSize="inherit" />
                  </IconButton>
                </Box>
                <ListItemButton
                  onClick={() => get_product(product.product.id)}
                  sx={{ p: "5px" }}
                >
                  <ListItemIcon sx={{ mr: 1 }}>
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      width={"50px"}
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ span: { fontSize: "12px" } }}
                    primary={product.product.title}
                  />
                </ListItemButton>
                <IconButton
                  onClick={() => {
                    Remove_item(product.product.id);
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
            sx={{
              textTransform: "capitalize",
              p: "2px",
              // @ts-ignore
              bgcolor: theme.palette.red_main.main,
            }}
            size="small"
            variant="contained"
          >
            Contained
          </Button>
          <Button
            sx={{
              textTransform: "capitalize",
              p: "2px",
              // bgcolor: theme.palette.red_main.main,
            }}
            color="error"
            size="small"
            variant="outlined"
            disabled={location.pathname === "/ViewCart"?true:false}
            onClick={() => navigate(`/ViewCart`)}
          >
            view cart
          </Button>
        </Stack>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={Drawer_open} onClose={toggleDrawer(false)}>
        {DrawerList}
        <Box>
          {/* <Box sx={{width:"20px",height:"20px",position}}> */}
          <IconButton
            onClick={toggleDrawer(false)}
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

// eslint-disable-next-line react-refresh/only-export-components
const Bag = () => {
  return (
    <>
      <svg
        width="25px"
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1mbx69x"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 20 23"
        data-testid="CartBagIcon"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33329 7.37181V5.37181C5.33329 2.79431 7.42079 0.705139 9.99996 0.705139C12.5791 0.705139 14.6666 2.79431 14.6666 5.37181V7.37181H17.3333C18.4375 7.37181 19.3333 8.26764 19.3333 9.37181V18.0385C19.3333 20.2468 17.5416 22.0385 15.3333 22.0385H4.66663C2.45746 22.0385 0.666626 20.2468 0.666626 18.0385V9.37181C0.666626 8.26764 1.56204 7.37181 2.66663 7.37181H5.33329ZM7.33329 7.37181H12.6666V5.37181C12.6666 3.89889 11.4708 2.70514 9.99996 2.70514C8.52913 2.70514 7.33329 3.89889 7.33329 5.37181V7.37181ZM2.66663 9.37181V18.0385C2.66663 19.1426 3.56204 20.0385 4.66663 20.0385H15.3333C16.4375 20.0385 17.3333 19.1426 17.3333 18.0385V9.37181H14.6666V11.7051C14.6666 12.2593 14.2208 12.7051 13.6666 12.7051C13.1125 12.7051 12.6666 12.2593 12.6666 11.7051V9.37181H7.33329V11.7051C7.33329 12.2593 6.88746 12.7051 6.33329 12.7051C5.77913 12.7051 5.33329 12.2593 5.33329 11.7051V9.37181H2.66663Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
};
