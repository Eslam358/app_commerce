import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import {
  Box,
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
import useMediaQuery from "@mui/material/useMediaQuery";

import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const options = ["A", "B"];

const Header1 = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  // const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const matches_xs400 = useMediaQuery("(max-width:400px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          px: "15px",
          py: `${matches_xs400 ? "5px" : "0px"}`,
          mb:3,

          bgcolor: "#2b3445",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction={matches_xs400 ? "column" : "row"}
            justifyContent="space-between"
            // justifyContent={matches_xs400? "start":"space-between"}
            alignItems={matches_xs400 ? "start" : "center"}
            gap={1}
          >
            <Typography
              // component="h1"
              // variant="h6"
              sx={{
                borderRadius: "20px",
                p: "1px 9px",
                fontSize: 14,
                fontWeight: "bold",

                color: "white",
                backgroundColor: "#d23f57",
                "&:hover": { color: "#d23f57", backgroundColor: "white" },
              }}
            >
              HOT
            </Typography>
            <Typography
              //  p={matches_xs400? "15px":"0px"}
              //  component={matches_xs400? "span":"p"}
              sx={{ fontSize: "11px", color: "white" }}
            >
              Free Express Shipping
            </Typography>
          </Stack>
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
    </>
  );
};

export default Header1;
