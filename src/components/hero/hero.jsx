// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { grey } from "@mui/material/colors";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Container,  } from "@mui/material";
import Catog from "./Catog";
import Typeproudct from "./Typeproudct";

const Hero = () => {
  return (
    <Container maxWidth="xl">
      {/* <Stack justifyContent={"space-between"} direction={"row"}> */}
      <Box sx={{ display: "flex", pt:3 }}>
        <Box
          sx={{
            // float:"left",
            width: "75%",

            ".swiper-pagination": { marginBottom: "5px" },
            ".swiper-pagination-bullet": {
              width: "15px",
              height: "15px",
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
            //   navigation
            pagination={{ clickable: true }}
            //   scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Box
                sx={
                  {
                    // margin: "2px auto -50px",
                    // // width:"100%",
                    // height:"200px",
                    // width:"200px"
                    // height:"60vh",
                  }
                }
              >
                <img
                  src="./assets/imgss/banner-15.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Box
                sx={
                  {
                    // margin: "2px auto -50px",
                    // // width:"100%",
                    // height:"200px",
                    // width:"200px"
                    // height:"60vh",
                  }
                }
              >
                {/* <img src="./assets/imgss/banner-15.jpg" alt="" style={{width:"100%", height:"100%"}} />  */}
                <img
                  src="./assets/imgss/banner-25.jpg"
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
            </SwiperSlide>
          </Swiper>
        </Box>

        <Box
          sx={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignContent: "flex-start",
          }}
        >
          <img
            style={{ width: "100%", margin: "5px 0 0 5px" }}
            src="./assets/imgss/banner-16.jpg"
            alt=""
          />
          <img
            style={{ width: "100%", margin: "5px 0 0 5px" }}
            src="./assets/imgss/banner-17.jpg"
            alt=""
          />
        </Box>
      </Box>
      <Catog/>
      <Typeproudct/>
    </Container>
  );
};

export default Hero;
