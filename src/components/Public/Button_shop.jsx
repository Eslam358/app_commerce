import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


// eslint-disable-next-line react/prop-types
const ButtonShop = ({bg_color}) => {
  return (
    <>
      <Button
        className="title_2_Button"
        sx={{
          color: bg_color,
          textTransform: "none",
          pl: "0",
          mt: 2,
          fontWeight:"700",
          "&::after": {
            content: "''",
            backgroundColor: bg_color,
            width: "0",
            height: "1px",
            position: "absolute",
            bottom: "6px",
            left: "0",
            transition: "0.3s",
          },

          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0)",
             "&:after":{width: "100%",},
          },
         
        }}
        variant="text"
        disableRipple
        size="small"
      >
        shopping now <ArrowForwardIcon sx={{ ml: "3px" }} fontSize="inherit" />
      </Button>
    </>
  );
};

export default ButtonShop;
