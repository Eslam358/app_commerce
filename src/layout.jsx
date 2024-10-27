import { useState, useEffect } from "react";
import Person3Icon from "@mui/icons-material/Person3";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import Badge from "@mui/material/Badge";
import {
  alpha,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector, useDispatch } from "react-redux";
import { handleClickOpen } from "./reduxtoolkit/slice/global/DialogSign";
import Cart_Drawer from "./components/Public/Drawer_Cart";
import { Close, KeyboardArrowDown } from "@mui/icons-material";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useLocation } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";

// const options = ["All", "Cars", "Goods", "Event"];

//search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  flexGrow: ".8",
  p: "0",
  border: "1px solid #777",
    // @ts-ignore
  borderRadius: "20px",

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    border: "1px solid red",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Layout = () => {
  const location = useLocation();

  const [Drawer_open, setDrawer_open] = useState(false);

  const toggleDrawer = (newDrawer_open) => () => {
    if (location.pathname === "/ViewCart") {
      return;
    } else {
      setDrawer_open(newDrawer_open);
    }
  };

  // @ts-ignore
  const Data_Person = useSelector((dat) => dat.Data_Person);
  // @ts-ignore
  const cart_list = useSelector((dat) => dat.cart_items);

  const theme = useTheme();
  const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, option) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if (option._id !== "") {
      fetchProducts(option._id);
    } else {
      fetchProducts();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fun_redux = useDispatch();

  // -------------------------------------------------
  const [query, setQuery] = useState("");
  const [open_search, setOpen_search] = useState(false);
  const [products, setProducts] = useState([]);
  const [test_products, setTest_Products] = useState([]);
  // @ts-ignore
  const [isLoading, setIsLoading] = useState(false);

  // دالة لجلب المنتجات من الـ API
  const fetchProducts = async (category) => {
    category = category ? `?category=${category}` : "";

    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products${category}`
      ); // هنا يتم تحديد الصفحة والعدد لكل صفحة
      const data = await response.json();

      if (data.data.length > 0) {
        setProducts(data.data); // إضافة المنتجات الجديدة إلى القائمة
        setTest_Products(data.data);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء جلب المنتجات:", error);
    }

    setIsLoading(false);
  };



  const products_fil = test_products.filter((a) => a.title.includes(query));

  // دالة لتحديث قيمة البحث
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setTest_Products(products);
  };
  const navigate = useNavigate();
  const handleInputChangemm = (option) => {
    navigate(`/Item/${option.title}`, { state: { item: option } });
  };

  // -------------------------------------------------
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!open_search && (
          <IconButton onClick={() => navigate("/")}>
            {theme.palette.mode === "light" ? (
              <img
                width={"100%"}
                src="./assets/logo/logo2.b6e97da2.svg"
                alt="logo"
              />
            ) : (
              <img width={"100%"} src="./assets/All_img/logo.svg" alt="logo" />
            )}
          </IconButton>
        )}

        {!matches_sm || open_search ? (
          <Search>
            <Stack justifyContent={"space-between"} direction={"row"}>
              <Stack sx={{ justifyContent: "center", flexGrow: "1" }}>
                {!matches_sm && (
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                )}

                <Autocomplete
                  freeSolo
                  id="country-select-demo"
                  sx={{
                    width: "90%",
                    outline: "none",
                    ".MuiInputBase-root.MuiOutlinedInput-root": {
                      padding: `${matches_sm ? "0px" : "0"}`,
                    },
                  }}
                  options={products_fil}
                  onInputChange={handleInputChange}
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Box
                        key={option.id}
                        component="li"
                        sx={{
                          "& > img": { mr: 2, flexShrink: 0 },
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          //   "&:hover p":{
                          //     transform:"translateX(-40px)",
                          //     transition:"2s",

                          //  }
                        }}
                        {...optionProps}
                      >
                        <Box
                          onClick={() => handleInputChangemm(option)}
                          sx={{ display: "flex", gap: "15px" }}
                        >
                          <img
                            loading="lazy"
                            width="25"
                            srcSet={option.imageCover}
                            src={option.imageCover}
                            alt=""
                          />
                          <p>{option.title}</p>
                        </Box>
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        ".MuiOutlinedInput-notchedOutline": { all: "unset" },

                        ml: `${matches_sm ? "0px" : "40px"}`,
                      }}
                      {...params}
                      placeholder="Search…"
                      slotProps={{
                        htmlInput: {
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        },
                      }}
                    />
                  )}
                />
              </Stack>
              <div>
                <List
                  component="nav"
                  aria-label="Device settings"
                  sx={{
                    // @ts-ignore
                    bgcolor: theme.palette.bg_main.primary,
                    width: `${matches_sm ? "70px" : "150px"}`,
                    padding: "5px",
                    borderBottomRightRadius: "20px",
                    borderTopRightRadius: "20px",
                    px: "0px",
                    ".css-10zu4gy-MuiListItem-root": {
                      p: `0`,
                    },
                  }}
                >
                  <ListItem
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClickListItem}
                    sx={{ cursor: "pointer", textAlign: "end" }}
                  >
                    <ListItemText
                      primary={options[selectedIndex]?.name.split(" ")[0]}
                    />

                    <KeyboardArrowDown />
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "lock-button",
                    role: "listbox",
                  }}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      selected={index === selectedIndex}
                      onClick={(event) =>
                        handleMenuItemClick(event, index, option)
                      }
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Stack>
          </Search>
        ) : (
          <Box flexGrow={1} />
        )}

        <Stack justifyContent={"end"} direction={"row"}>
          {matches_sm && (
            <IconButton
              onClick={() => setOpen_search(!open_search)}
              size="small"
            >
              {!open_search ? (
                <SearchIcon />
              ) : (
                <Close
                  fontSize="inherit"
                  sx={{ "&:hover": { color: "red" } }}
                />
              )}
            </IconButton>
          )}
          {!open_search && (
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={() => fun_redux(handleClickOpen())}
                className="fex"
              >
                <Person3Icon />
              </IconButton>
              <Typography
                sx={{
                  position: "absolute",
                  fontSize: "11px",
                  left: "-30%",
                  bottom: "-5px",
                  width: "60px",
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                {Data_Person.message === "success" &&
                  Data_Person.user.name.split(" ")[0]}
              </Typography>
            </Box>
          )}

          {!open_search && (
            <IconButton onClick={toggleDrawer(true)}>
              <Badge
                badgeContent={cart_list.data.products?.length}
                sx={{
                  span: {
                    // @ts-ignore
                    bgcolor: `${theme.palette.red_main.main}`,
                    color: "white",
                    top: "-5px",
                    right: "-5px",
                  },
                }}
              >
                <LocalGroceryStoreIcon color="action" />
              </Badge>
            </IconButton>
          )}
        </Stack>
        <Cart_Drawer
          toggleDrawer={toggleDrawer}
          Drawer_open={Drawer_open}
          data={cart_list.data.products}
        />
      </Container>
    </>
  );
};

export default Layout;

const options = [
  {
    _id: "",
    name: "All",
  },
  {
    _id: "6439d5b90049ad0b52b90048",
    name: "Men's Fashion",
    slug: "men's-fashion",
    image:
      "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
    createdAt: "2023-04-14T22:37:45.627Z",
  },
  {
    _id: "6439d58a0049ad0b52b9003f",
    name: "Women's Fashion",
    slug: "women's-fashion",
    image:
      "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg",
    createdAt: "2023-04-14T22:36:58.118Z",
  },
  {
    _id: "6439d2f467d9aa4ca97064a8",
    name: "Mobiles",
    slug: "mobiles",
    image:
      "https://ecommerce.routemisr.com/Route-Academy-categories/1681511156008.png",
    createdAt: "2023-04-14T22:25:56.071Z",
  },
  {
    _id: "6439d2d167d9aa4ca970649f",
    name: "Electronics",
    slug: "electronics",
    image:
      "https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png",
    createdAt: "2023-04-14T22:25:21.783Z",
  },
];


