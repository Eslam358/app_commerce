import { Box, Stack, Typography } from "@mui/material";
import "./titile.css";
import ButtonShop from "../Public/Button_shop";
const Titel2 = () => {
  return (
    <>
      <Stack
        direction={"row"}
        className="title_2"
        gap={2}
        justifyContent={"space-between"}
        // flexWrap={xs={"wrap"}}
        sx={{
          overflow: "hidden",
          my: 4,
          flexWrap: { xs: "wrap", md: "wrap", lg: "nowrap" },
        }}
      >
        <Box sx={{ minWidth: "300px", width: "100%", position: "relative" }}>
          <img
            src="./assets/All_img/banner-18.jpg"
            style={{ width: " 100%" }}
            alt=""
          />
          <div
            className=" text_position"
         
          >
            <Typography
              mb={2}
              color={"#666"}
              fontSize={"12px"}
            >
             
              NEW ARRIVALS
            </Typography>
            <Typography fontSize={"18px"} color="#222"  >
              SKI CLOTHES SALE{" "}
            </Typography>
            <Typography lineHeight={"6px"} color={"error"}>
              Up to 35% Off{" "}
            </Typography>
<ButtonShop bg_color={"#222"} />
       
          </div>
        </Box>
        <Box sx={{ minWidth: "300px", width: "100%", position: "relative" }}>
          <img
            src="./assets/All_img/banner-19.jpg"
            style={{ width: " 100%" }}
            alt=""
          />
          <Box
            className="title_2_text"
            sx={{
              position: "absolute",
              top: "50%",
              left: "10%",
              transform: "translateY(-50%)",
              color: "#fff",
            }}
          >
            <Typography
              mb={2}
              // color={"#777"}
              fontSize={"12px"}
              className="title_2_text_1"
            >
              {" "}
              NEW ARRIVALS
            </Typography>
            <Typography fontSize={"18px"}  className="title_2_text_2">
              SKI CLOTHES SALE{" "}
            </Typography>
            <Typography lineHeight={"6px"} color={"error"}>
              Up to 35% Off{" "}
            </Typography>

            <ButtonShop bg_color={"#fff"} />
          </Box>
        </Box>
        <Box sx={{ minWidth: "300px", width: "100%", position: "relative" }}>
          <img
            src="./assets/All_img/banner-20.jpg"
            style={{ width: " 100%" }}
            alt=""
          />
          <div
            className="text_position"
        
          >
            <Typography
              mb={2}
              color={"#777"}
              fontSize={"12px"}
              className="title_2_text_1"
            >
              {" "}
              NEW ARRIVALS
            </Typography>
            <Typography fontSize={"18px"} color="#222" className="title_2_text_2">
              SKI CLOTHES SALE{" "}
            </Typography>
            <Typography lineHeight={"6px"} color={"error"}>
              Up to 35% Off{" "}
            </Typography>

            <ButtonShop bg_color={"#222"} />
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default Titel2;
