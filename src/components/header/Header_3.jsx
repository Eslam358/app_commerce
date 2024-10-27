import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Container, Stack, useTheme } from "@mui/material";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Header3 = () => {
  // @ts-ignore
  const Categories = useSelector((dat) => dat.Categories);

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id, name) => {
    get_product(id, name);
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const get_product = (id, name) => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`)
      .then((response) => {
        // وضع البيانات في الحالة
        navigate(`/Categories/${name}`, {
          state: { Categories: response.data.data },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        mt={3}
        >
          <div>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              sx={{
                 // @ts-ignore
                bgcolor: theme.palette.bg_main.primary,
                justifyContent: "left",
                color: "#222",
                 // @ts-ignore
                "&:hover": { bgcolor: theme.palette.bg_main.primary },
              }}
              disableElevation
              onClick={handleClick}
              endIcon={
                open ? (
                  <KeyboardArrowDownIcon sx={{ ml: "5px" }} />
                ) : (
                  <ChevronRightOutlinedIcon sx={{ ml: "5px" }} />
                )
              }
              startIcon={<GridViewRoundedIcon />}
            >
              Categories
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              
            >
       <Box py={1}>
               {Categories.data.slice(0).map((item) => (
                 <MenuItem
                   sx={{
                     img: {
                       width: "25px",
                       height: "25px",
                       borderRadius: "50%",
                       mr: "15px",
                     },
                   }}
                   key={item._id}
                   onClick={() => handleClose(item._id, item.name)}
                   disableRipple
                 >
                   <img src={item.image} alt={item.name} />
                   {item.name}
                 </MenuItem>
               ))}
       </Box>
            </StyledMenu>
          </div>
        </Stack>
      </Container>
    </>
  );
};

export default Header3;
