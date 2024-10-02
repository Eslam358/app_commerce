import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import {
  Box,
  Container,
  IconButton,
  ListItem,
  ListItemIcon,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DarkModeOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LightModeOutlined,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./header_1.scss";

import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const options = ["A", "B"];

const Header1 = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log(options[index]);

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="header_1" sx={{ pt:"54px"}}>
      <Box
        sx={{
          p: "3px 15px",
          bgcolor: "#2b3445",
          position: "fixed",
          top: "0",
          
          width:"100vw",
          zIndex: "2",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            // @ts-ignore
            variant="div"
            component="span"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography
              marginRight={1}
              component="span"
              sx={{
                borderRadius: "20px",
                p: "3px 9px",
                fontSize: 14,
                fontWeight: "bold",
                width: "23px",
                color: "white",
                backgroundColor: "#d23f57",
                "&:hover": { color: "#d23f57", backgroundColor: "white" },
              }}
            >
              HOT
            </Typography>
            <Typography
              // @ts-ignore
              variant="span"
              sx={{ fontSize: "11px", color: "white" }}
            >
              Free Express Shipping
            </Typography>
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {theme.palette.mode === "light" ? (
              <IconButton
                sx={{
                  "--IconButton-size": "26px",
                }}
                onClick={() => {
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  colorMode.toggleColorMode();
                }}
                color="inherit"
              >
                <LightModeOutlined sx={{ color: "white" }} />
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  "--IconButton-size": "26px",
                }}
                onClick={() => {
                  localStorage.setItem(
                    "mode",
                    theme.palette.mode === "dark" ? "light" : "dark"
                  );
                  colorMode.toggleColorMode();
                }}
                color="inherit"
              >
                <DarkModeOutlined sx={{ color: "white" }} />
              </IconButton>
            )}

            <div>
              <List component="nav" aria-label="Device settings">
                <ListItem
                  sx={{
                    p: 0,
                    color: "white",
                    "&:hover": { cursor: "pointer" },
                  }}
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-label="when device is locked"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClickListItem}
                >
                  <ListItemText
                    primary={options[selectedIndex]}

                    // secondary={options[selectedIndex]}
                  ></ListItemText>
                  <ListItemIcon sx={{ p: 0, minWidth: "20px", color: "white" }}>
                    {!open ? (
                      <KeyboardArrowDown sx={{ p: 0 }} fontSize="small" />
                    ) : (
                      <KeyboardArrowUp sx={{ p: 0 }} fontSize="small" />
                    )}
                  </ListItemIcon>
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
                    key={option}
                    // disabled={index === 0}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>

            <FacebookIcon fontSize="small" sx={{ color: "white" }} />
            <TwitterIcon fontSize="small" sx={{ color: "white" }} />
            <InstagramIcon fontSize="small" sx={{ color: "white" }} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Header1;
