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
import { handleClickOpen } from "../../reduxtoolkit/slice/DialogSign";
import Cart_Drawer from "../Public/Drawer_Cart";
import { Close, KeyboardArrowDown, Padding } from "@mui/icons-material";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

// const options = ["All", "Cars", "Goods", "Event"];

//search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  flexGrow: ".8",
  p: "0",
  border: "1px solid #777",

  // ".MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiAutocomplete-inputRoot.css-1ira68j-MuiInputBase-root-MuiOutlinedInput-root": {Padding:0},

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

const Header2 = () => {
  const [Drawer_open, setDrawer_open] = useState(false);

  const toggleDrawer = (newDrawer_open) => () => {
    setDrawer_open(newDrawer_open);
  };

  // @ts-ignore
  const Data_Person = useSelector((dat) => dat.Data_Person);
  // @ts-ignore
  const cart_list = useSelector((dat) => dat.cart_items);

  const theme = useTheme();
  const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));
  // const matches_sm = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, option) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    console.log(option);
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
    console.log("category", category);

    try {
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products${category}`
      ); // هنا يتم تحديد الصفحة والعدد لكل صفحة
      const data = await response.json();
      console.log(data);

      if (data.data.length > 0) {
        setProducts(data.data); // إضافة المنتجات الجديدة إلى القائمة
        setTest_Products(data.data);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء جلب المنتجات:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const products_fil = test_products.filter((a) => a.title.includes(query));

  // دالة لتحديث قيمة البحث
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setTest_Products(products);
    console.log("hhhhhhhhh");
  };
  const navigate = useNavigate();
  const handleInputChangemm = (option) => {
    navigate(`/Item/${option.title}`, { state: { item: option } });
    console.log("hhhhhhhhhfffffffffffff", option);
  };
  // -------------------------------------------------
  return (
    <>
      <Box className="header_1" sx={{ mb: 2 }}>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!open_search && (
         <div>
         
             <Logo/>
         </div>
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
                        p: `${matches_sm ? "0px" : "9px"}`,
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

          <Stack justifyContent={"end"} direction={"row"} >
            {matches_sm && (
              <IconButton onClick={() => setOpen_search(!open_search)} size="small">
                {!open_search ? <SearchIcon /> : <Close fontSize="inherit" sx={{"&:hover":{color:"red"}}} />}
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
      </Box>
    </>
  );
};

export default Header2;

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


const Logo = () => {
  return (
    <div>
         <svg width="105" height="50" viewBox="0 0 105 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.3718 4.33013C22.7752 2.36517 26.9684 2.36517 30.3718 4.33013L39.9114 9.83782C43.3148 11.8028 45.4114 15.4342 45.4114 19.3641V30.3795C45.4114 34.3094 43.3148 37.9408 39.9114 39.9058L30.3718 45.4135C26.9684 47.3784 22.7752 47.3784 19.3718 45.4135L9.8322 39.9058C6.42878 37.9408 4.33219 34.3094 4.33219 30.3795V19.3641C4.33219 15.4342 6.42878 11.8028 9.83219 9.83782L19.3718 4.33013Z" stroke="#4B566B" strokeWidth="2"/>
<g clipPath="url(#clip0_9440_81122)">
<path d="M32.0397 23.7245C31.9049 23.742 31.7668 23.7525 31.6217 23.7525C30.7235 23.7525 29.9221 23.3537 29.3729 22.7382C28.8236 23.3537 28.0222 23.7525 27.1206 23.7525C26.219 23.7525 25.4176 23.3537 24.8683 22.7382C24.319 23.3537 23.5211 23.7525 22.616 23.7525C21.7179 23.7525 20.9165 23.3537 20.3672 22.7382C19.8179 23.3537 19.0165 23.7525 18.1135 23.7525C17.9733 23.7525 17.832 23.742 17.6949 23.7245C15.7839 23.4657 14.8797 21.1852 15.9017 19.5484L17.8821 16.3771C18.0583 16.092 18.373 15.9178 18.7091 15.9178H31.0344C31.3695 15.9178 31.6839 16.092 31.86 16.3771L33.8394 19.5484C34.8654 21.1887 33.9569 23.4657 32.0397 23.7245ZM32.1848 24.8332C32.3022 24.8157 32.4715 24.7878 32.6096 24.7528V31.5871C32.6096 32.8217 31.6182 33.8255 30.3988 33.8255H19.3447C18.1239 33.8255 17.1339 32.8217 17.1339 31.5871V24.7528C17.2676 24.7878 17.4054 24.8157 17.5474 24.8332H17.5515C17.7332 24.8577 17.9225 24.8717 18.1135 24.8717C18.5433 24.8717 18.9578 24.8052 19.3447 24.6828V29.3486H30.3988V24.6863C30.7857 24.8052 31.1968 24.8717 31.6217 24.8717C31.8151 24.8717 32.0017 24.8577 32.1848 24.8332Z" fill="#2B3445"/>
</g>
<rect x="39" y="12" width="65" height="25" rx="12.5" fill="#2B3445" stroke="#2B3445" strokeWidth="2"/>
<rect width="46.759" height="13.2484" transform="translate(43.7743 17.9076)" fill="#2B3445"/>
<path d="M71.8919 21.3025C72.0233 21.3025 72.1546 21.332 72.2859 21.3911C72.4238 21.4437 72.542 21.5159 72.6405 21.6078C72.7521 21.7129 72.8342 21.831 72.8867 21.9624C72.9392 22.0937 72.9655 22.2283 72.9655 22.3662C72.972 22.504 72.9491 22.6386 72.8965 22.77C72.844 22.9013 72.7685 23.0162 72.67 23.1147L67.4994 28.3247H72.0889C72.2399 28.3247 72.3811 28.3542 72.5124 28.4133C72.6437 28.4724 72.7554 28.5512 72.8473 28.6497C72.9458 28.7482 73.0213 28.8631 73.0738 28.9944C73.1329 29.1192 73.1624 29.2538 73.1624 29.3982C73.1624 29.5427 73.1329 29.6805 73.0738 29.8119C73.0213 29.9432 72.9458 30.0581 72.8473 30.1566C72.7554 30.2485 72.6437 30.324 72.5124 30.3831C72.3811 30.4356 72.2399 30.4619 72.0889 30.4619H65.0963C64.9124 30.4619 64.745 30.4225 64.594 30.3437C64.443 30.2583 64.3215 30.1467 64.2296 30.0088C64.0589 29.779 63.9834 29.5262 64.0031 29.2505C64.0228 29.0272 64.1147 28.8335 64.2788 28.6694L69.4396 23.4397H65.1751C65.0306 23.4397 64.8927 23.4101 64.7614 23.351C64.6301 23.2919 64.5185 23.2132 64.4266 23.1147C64.3346 23.0162 64.2591 22.9013 64.2 22.77C64.1475 22.6321 64.1212 22.4909 64.1212 22.3465C64.1212 22.202 64.1475 22.0674 64.2 21.9427C64.2591 21.8113 64.3346 21.6997 64.4266 21.6078C64.5185 21.5159 64.6301 21.4437 64.7614 21.3911C64.8927 21.332 65.0306 21.3025 65.1751 21.3025H71.8919Z" fill="white"/>
<path d="M96.1372 29.4081C96.1372 29.5525 96.1109 29.6904 96.0584 29.8217C96.0059 29.953 95.9304 30.0646 95.8319 30.1566C95.74 30.2485 95.6316 30.324 95.5069 30.3831C95.3821 30.4356 95.2475 30.4619 95.1031 30.4619C94.9521 30.4619 94.8076 30.4356 94.6697 30.3831C94.5384 30.324 94.4235 30.2485 94.325 30.1566C94.2265 30.0646 94.1477 29.953 94.0886 29.8217C94.0295 29.6904 94 29.5525 94 29.4081V26.2269C94 25.5506 94.128 24.9137 94.3841 24.3162C94.6467 23.7187 95.0013 23.1967 95.4478 22.7503C95.8943 22.3038 96.4162 21.9525 97.0137 21.6964C97.6112 21.4338 98.2448 21.3025 98.9146 21.3025H98.9343C99.2888 21.3025 99.5613 21.4043 99.7517 21.6078C99.9487 21.8048 100.047 22.0576 100.047 22.3662C100.047 22.5172 100.018 22.6583 99.9585 22.7897C99.8994 22.921 99.8174 23.0359 99.7123 23.1344C99.6138 23.2263 99.4956 23.3018 99.3577 23.3609C99.2264 23.4134 99.0853 23.4397 98.9343 23.4397H98.9146C98.5403 23.4397 98.1825 23.5119 97.841 23.6564C97.5062 23.8008 97.214 23.9978 96.9645 24.2473C96.715 24.4968 96.5147 24.789 96.3637 25.1238C96.2127 25.4587 96.1372 25.8165 96.1372 26.1973V29.4081Z" fill="white"/>
<path d="M54.0082 26.0004C54.0082 25.3503 54.1329 24.743 54.3824 24.1783C54.6319 23.6071 54.9701 23.1081 55.3969 22.6813C55.8236 22.2545 56.3194 21.9197 56.884 21.6767C57.4553 21.4272 58.0626 21.3025 58.7061 21.3025C59.3561 21.3025 59.9667 21.4272 60.5379 21.6767C61.1092 21.9197 61.6049 22.2545 62.0251 22.6813C62.4519 23.1081 62.7867 23.6071 63.0297 24.1783C63.2726 24.743 63.3941 25.3503 63.3941 26.0004V29.4868C63.3941 29.6379 63.3645 29.779 63.3055 29.9103C63.2529 30.0417 63.1774 30.1566 63.0789 30.2551C62.9804 30.3535 62.8623 30.4323 62.7244 30.4914C62.5931 30.5505 62.4519 30.5801 62.3009 30.5801C62.0448 30.5801 61.8281 30.5046 61.6509 30.3535C61.4736 30.2025 61.3554 30.0121 61.2963 29.7823C60.922 30.0646 60.515 30.2879 60.075 30.452C59.6417 30.6162 59.1854 30.6983 58.7061 30.6983C58.0626 30.6983 57.4553 30.5768 56.884 30.3338C56.3194 30.0843 55.8236 29.7462 55.3969 29.3194C54.9701 28.8926 54.6319 28.3936 54.3824 27.8224C54.1329 27.2512 54.0082 26.6438 54.0082 26.0004ZM56.1454 26.0004C56.1454 26.3484 56.211 26.6799 56.3423 26.9951C56.4802 27.3037 56.6641 27.5762 56.8939 27.8126C57.1303 28.0424 57.4027 28.2262 57.7113 28.3641C58.0199 28.4954 58.3515 28.5611 58.7061 28.5611C59.0606 28.5611 59.3922 28.4954 59.7008 28.3641C60.016 28.2262 60.2884 28.0424 60.5182 27.8126C60.748 27.5762 60.9286 27.3037 61.0599 26.9951C61.1912 26.6799 61.2569 26.3484 61.2569 26.0004C61.2569 25.6458 61.1912 25.3142 61.0599 25.0056C60.9286 24.6905 60.748 24.418 60.5182 24.1882C60.2884 23.9584 60.016 23.7778 59.7008 23.6465C59.3922 23.5086 59.0606 23.4397 58.7061 23.4397C58.3581 23.4397 58.0265 23.5086 57.7113 23.6465C57.4027 23.7778 57.1303 23.9584 56.8939 24.1882C56.6641 24.418 56.4802 24.6905 56.3423 25.0056C56.211 25.3142 56.1454 25.6458 56.1454 26.0004Z" fill="white"/>
<path d="M84 26.0004C84 25.3503 84.1248 24.743 84.3743 24.1783C84.6238 23.6071 84.9619 23.1081 85.3887 22.6813C85.8155 22.2545 86.3112 21.9197 86.8759 21.6767C87.4471 21.4272 88.0544 21.3025 88.6979 21.3025C89.3479 21.3025 89.9585 21.4272 90.5298 21.6767C91.101 21.9197 91.5967 22.2545 92.0169 22.6813C92.4437 23.1081 92.7786 23.6071 93.0215 24.1783C93.2644 24.743 93.3859 25.3503 93.3859 26.0004V29.4868C93.3859 29.6379 93.3564 29.779 93.2973 29.9103C93.2447 30.0417 93.1692 30.1566 93.0708 30.2551C92.9723 30.3535 92.8541 30.4323 92.7162 30.4914C92.5849 30.5505 92.4437 30.5801 92.2927 30.5801C92.0366 30.5801 91.82 30.5046 91.6427 30.3535C91.4654 30.2025 91.3472 30.0121 91.2881 29.7823C90.9139 30.0646 90.5068 30.2879 90.0669 30.452C89.6335 30.6162 89.1772 30.6983 88.6979 30.6983C88.0544 30.6983 87.4471 30.5768 86.8759 30.3338C86.3112 30.0843 85.8155 29.7462 85.3887 29.3194C84.9619 28.8926 84.6238 28.3936 84.3743 27.8224C84.1248 27.2512 84 26.6438 84 26.0004ZM86.1372 26.0004C86.1372 26.3484 86.2029 26.6799 86.3342 26.9951C86.4721 27.3037 86.6559 27.5762 86.8857 27.8126C87.1221 28.0424 87.3946 28.2262 87.7032 28.3641C88.0117 28.4954 88.3433 28.5611 88.6979 28.5611C89.0524 28.5611 89.384 28.4954 89.6926 28.3641C90.0078 28.2262 90.2803 28.0424 90.5101 27.8126C90.7399 27.5762 90.9204 27.3037 91.0517 26.9951C91.1831 26.6799 91.2487 26.3484 91.2487 26.0004C91.2487 25.6458 91.1831 25.3142 91.0517 25.0056C90.9204 24.6905 90.7399 24.418 90.5101 24.1882C90.2803 23.9584 90.0078 23.7778 89.6926 23.6465C89.384 23.5086 89.0524 23.4397 88.6979 23.4397C88.3499 23.4397 88.0183 23.5086 87.7032 23.6465C87.3946 23.7778 87.1221 23.9584 86.8857 24.1882C86.6559 24.418 86.4721 24.6905 86.3342 25.0056C86.2029 25.3142 86.1372 25.6458 86.1372 26.0004Z" fill="white"/>
<path d="M74 26.0004C74 25.3503 74.1248 24.743 74.3743 24.1783C74.6238 23.6071 74.9619 23.1081 75.3887 22.6813C75.8155 22.2545 76.3112 21.9197 76.8759 21.6767C77.4471 21.4272 78.0544 21.3025 78.6979 21.3025C79.3479 21.3025 79.9585 21.4272 80.5298 21.6767C81.101 21.9197 81.5967 22.2545 82.0169 22.6813C82.4437 23.1081 82.7786 23.6071 83.0215 24.1783C83.2644 24.743 83.3859 25.3503 83.3859 26.0004V29.4868C83.3859 29.6379 83.3564 29.779 83.2973 29.9103C83.2447 30.0417 83.1692 30.1566 83.0708 30.2551C82.9723 30.3535 82.8541 30.4323 82.7162 30.4914C82.5849 30.5505 82.4437 30.5801 82.2927 30.5801C82.0366 30.5801 81.82 30.5046 81.6427 30.3535C81.4654 30.2025 81.3472 30.0121 81.2881 29.7823C80.9139 30.0646 80.5068 30.2879 80.0669 30.452C79.6335 30.6162 79.1772 30.6983 78.6979 30.6983C78.0544 30.6983 77.4471 30.5768 76.8759 30.3338C76.3112 30.0843 75.8155 29.7462 75.3887 29.3194C74.9619 28.8926 74.6238 28.3936 74.3743 27.8224C74.1248 27.2512 74 26.6438 74 26.0004ZM76.1372 26.0004C76.1372 26.3484 76.2029 26.6799 76.3342 26.9951C76.4721 27.3037 76.6559 27.5762 76.8857 27.8126C77.1221 28.0424 77.3946 28.2262 77.7032 28.3641C78.0117 28.4954 78.3433 28.5611 78.6979 28.5611C79.0524 28.5611 79.384 28.4954 79.6926 28.3641C80.0078 28.2262 80.2803 28.0424 80.5101 27.8126C80.7399 27.5762 80.9204 27.3037 81.0517 26.9951C81.1831 26.6799 81.2487 26.3484 81.2487 26.0004C81.2487 25.6458 81.1831 25.3142 81.0517 25.0056C80.9204 24.6905 80.7399 24.418 80.5101 24.1882C80.2803 23.9584 80.0078 23.7778 79.6926 23.6465C79.384 23.5086 79.0524 23.4397 78.6979 23.4397C78.3499 23.4397 78.0183 23.5086 77.7032 23.6465C77.3946 23.7778 77.1221 23.9584 76.8857 24.1882C76.6559 24.418 76.4721 24.6905 76.3342 25.0056C76.2029 25.3142 76.1372 25.6458 76.1372 26.0004Z" fill="white"/>
<mask id="mask0_9440_81122"  maskUnits="userSpaceOnUse" x="43" y="17" width="11" height="14">
<path d="M43.7743 19.0205C43.7743 18.8629 43.8006 18.7185 43.8531 18.5872C43.9122 18.4493 43.9877 18.3311 44.0796 18.2326C44.1781 18.1275 44.293 18.0488 44.4243 17.9962C44.5556 17.9371 44.6968 17.9076 44.8478 17.9076C45.0054 17.9076 45.1466 17.9371 45.2713 17.9962C45.4026 18.0488 45.5142 18.1275 45.6062 18.2326C45.7047 18.3311 45.7802 18.4493 45.8327 18.5872C45.8852 18.7185 45.9115 18.8629 45.9115 19.0205V22.0933C46.2857 21.8504 46.6863 21.6633 47.113 21.532C47.5464 21.3941 47.9994 21.3251 48.4722 21.3251C49.1222 21.3251 49.7295 21.4499 50.2942 21.6994C50.8654 21.9423 51.3612 22.2772 51.7814 22.704C52.2082 23.1242 52.543 23.6199 52.7859 24.1911C53.0355 24.7624 53.1602 25.373 53.1602 26.023C53.1602 26.6665 53.0355 27.2738 52.7859 27.845C52.543 28.4163 52.2082 28.9153 51.7814 29.3421C51.3612 29.7688 50.8654 30.107 50.2942 30.3565C49.7295 30.5994 49.1222 30.7209 48.4722 30.7209C47.8287 30.7209 47.2214 30.5994 46.6501 30.3565C46.0789 30.107 45.5799 29.7688 45.1531 29.3421C44.7263 28.9153 44.3882 28.4163 44.1387 27.845C43.8958 27.2738 43.7743 26.6665 43.7743 26.023V19.0205ZM45.9115 26.023C45.9115 26.371 45.9771 26.7026 46.1085 27.0177C46.2463 27.3263 46.4302 27.5988 46.66 27.8352C46.8964 28.065 47.1688 28.2488 47.4774 28.3867C47.786 28.518 48.1176 28.5837 48.4722 28.5837C48.8267 28.5837 49.1583 28.518 49.4669 28.3867C49.7755 28.2488 50.0447 28.065 50.2745 27.8352C50.5109 27.5988 50.6947 27.3263 50.826 27.0177C50.9574 26.7026 51.023 26.371 51.023 26.023C51.023 25.6684 50.9574 25.3369 50.826 25.0283C50.6947 24.7131 50.5109 24.4406 50.2745 24.2108C50.0447 23.981 49.7755 23.8005 49.4669 23.6691C49.1583 23.5313 48.8267 23.4623 48.4722 23.4623C48.1176 23.4623 47.786 23.5313 47.4774 23.6691C47.1688 23.8005 46.8964 23.981 46.66 24.2108C46.4302 24.4406 46.2463 24.7131 46.1085 25.0283C45.9771 25.3369 45.9115 25.6684 45.9115 26.023Z" fill="white"/>
</mask>
<g mask="url(#mask0_9440_81122)">
<rect x="43.2521" y="20.7802" width="10.3587" height="10.4457" fill="white"/>
<path d="M44.5536 25.8519C44.5536 23.6164 46.3658 21.8042 48.6013 21.8042H53.7806V29.8996H48.6013C46.3658 29.8996 44.5536 28.0874 44.5536 25.8519Z" fill="white"/>
<ellipse cx="48.4313" cy="25.9595" rx="2.48085" ry="2.48085" fill="white"/>
<path d="M43.2961 20.7802L53.5677 10.5085V20.7802H43.2961Z" fill="white"/>
<path d="M53.6106 10.5085L43.339 20.7802L43.339 10.5085L53.6106 10.5085Z" fill="white"/>
<path d="M49.7596 25.7008L39.488 35.9724L39.488 25.7008L49.7596 25.7008Z" fill="white"/>
<circle cx="48.4313" cy="25.9595" r="1.00105" fill="white"/>
<path d="M48.3878 23.4786C48.7136 23.4786 49.0362 23.5428 49.3372 23.6674C49.6382 23.7921 49.9117 23.9749 50.142 24.2052C50.3724 24.4356 50.5552 24.7091 50.6798 25.0101C50.8045 25.3111 50.8687 25.6337 50.8687 25.9595C50.8687 26.2852 50.8045 26.6078 50.6798 26.9088C50.5552 27.2098 50.3724 27.4833 50.142 27.7137C49.9117 27.9441 49.6382 28.1268 49.3372 28.2515C49.0362 28.3761 48.7136 28.4403 48.3878 28.4403L48.3878 25.9595L48.3878 23.4786Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_9440_81122">
<rect width="19.8974" height="17.9077" fill="white" transform="translate(14.9231 15.9178)"/>
</clipPath>
</defs>
</svg>
    </div>
  );
}


