// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { grey } from "@mui/material/colors";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Container, Typography } from "@mui/material";
import Catog from "./Catog";
import Typeproudct from "./Typeproudct";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ButtonShop from "../Public/Button_shop";

const Hero = () => {
  const theme = useTheme();
  const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));
  const matches_lg = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Container maxWidth="xl">
      {/* <Stack justifyContent={"space-between"} direction={"row"}> */}
      <Box sx={{ display: `${matches_lg ? "block" : "flex"}`, pt: 3 }}>
        <Box
          sx={{
            // float:"left",
            width: `${matches_lg ? "100%" : "75%"}`,

            ".swiper-pagination": { marginBottom: "5px" },
            ".swiper-pagination-bullet": {
              width: {sm:"15px",xs:"10px"},
              height: {sm:"15px",xs:"10px"},
              border: "2px solid #FFF",
              outline: `2px solid ${grey[600]}`,
              bgcolor: "#FFF",
              opacity: 1,
              transition: "0.8s",
            },
            ".swiper-pagination-bullet.swiper-pagination-bullet-active": {
              bgcolor: "#444",
            },
          }}
        >
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={5}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <Box sx={{ position: "relative" }}>
                <img
                  src="./assets/imgss/banner-15.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
                  <Box className=" text_position">
              <Typography mb={1} color={"#666"} fontSize={"16px"}>
                NEW ARRIVALS
              </Typography>
              <Typography fontSize={"24px"} color="#222">
                SKI CLOTHES SALE{" "}
              </Typography>
              <Typography lineHeight={"11px"} color={"error"}>
                Up to 35% Off{" "}
              </Typography>
              <ButtonShop bg_color={"#222"} />
            </Box>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
           sx={{ position: "relative" }}
              >
                <img
                  src="./assets/imgss/banner-25.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
  <Box className=" text_position">
              <Typography mb={2} color={"#666"} fontSize={"16px"}>
                NEW ARRIVALS
              </Typography>
              <Typography fontSize={"25px"} color="#222">
                SKI CLOTHES SALE{" "}
              </Typography>
              <Typography lineHeight={"6px"} color={"error"}>
                Up to 35% Off{" "}
              </Typography>
              <ButtonShop bg_color={"#222"} />
            </Box>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>

        <Box
          sx={{
            width: { lg:"25%",md:"100%"},
            display: "flex",
            gap:1,
            flexDirection: { lg:"column",md:"row",sm:"row", xs:"column"},
            justifyContent: "space-around",
            alignContent: "flex-start",
          }}
        >
          <Box flexGrow={1} sx={{ position: "relative" }}>
            <img
              style={{ width: "100%", margin: "5px 0 0 5px" }}
              src="./assets/imgss/banner-16.jpg"
              alt=""
            />
            <Box  className=" text_position">
              <Typography mb={2} color={"#666"} fontSize={"12px"}>
                NEW ARRIVALS
              </Typography>
              <Typography fontSize={"18px"} color="#222">
                SKI CLOTHES SALE{" "}
              </Typography>
              <Typography lineHeight={"6px"} color={"error"}>
                Up to 35% Off{" "}
              </Typography>
              <ButtonShop bg_color={"#222"} />
            </Box>
          </Box>
          <Box flexGrow={1} sx={{ position: "relative" }}>
            <img
              style={{ width: "100%", margin: "5px 0 0 5px" }}
              src="./assets/imgss/banner-17.jpg"
              alt=""
            />
            <Box className=" text_position">
              <Typography mb={2} color={"#666"} fontSize={"12px"}>
                NEW ARRIVALS
              </Typography>
              <Typography fontSize={"18px"} color="#222">
                SKI CLOTHES SALE{" "}
              </Typography>
              <Typography lineHeight={"6px"} color={"error"}>
                Up to 35% Off{" "}
              </Typography>
              <ButtonShop bg_color={"#222"} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Catog />
      <Typeproudct />
    </Container>
  );
};

export default Hero;
