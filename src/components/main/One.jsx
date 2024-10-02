import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Rating } from "@mui/material";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Person, Person3 } from "@mui/icons-material";
// import { Padding } from "@mui/icons-material";

const One = () => {
  return (
    <>
      <Box
       className=""
        sx={{
           position:"relative",
          ".swiper-button-prev": { transition: "0.3s" },
          "&:hover .swiper-button-prev": {
            transform: "translateX(0)",
          },
          ".swiper-button-next": { transition: "0.3s" },
          "&:hover .swiper-button-next": {
            transform: "translateX(0)",
          },
        }}
      >
        <Swiper
          className="Swiper-one"
        
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={4}
          navigation
          loop
 
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <SwiperSlide key={item}  >
              <Card
                sx={{
                  // maxWidth: 300,
                  padding:"4px",
                  position:"relative",
                  border:"1px solid white",
                  
                  "&:hover .MuiCardMedia-root": {
                    scale: "0.7",
                  },
                  "&:hover .icon-person2": {
                  right:"11px"
                  },
                  "&:hover .icon-person1": {
                   right:"11px"
                  },
                  "&:hover ": {
                  border:"1px solid #777",

                    // bgcolor:"red",
                    
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 250,
                    m: "auto",
                    scale: "0.6",
                    transition: "0.3s",
                  }}
                  image="./assets/t-shirts-products/1/images.jpg"
                  title="green iguana"
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    Lizards are a widespread
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    ${item * 100}
                  </Typography>
                  <Rating
                    name="size-small"
                    defaultValue={2}
                    sx={{ fontSize: "15px" }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    sx={{
                      px: "40%",

                      mx: "auto",
                      color: "#222",
                      fontWeight: "bold",
                      transition: "0.5s",
                      border:"1px solid #777",

                      "&:hover": {
                        bgcolor: "#1f2937",
                        color: "white",
                      },
                    }}
                    size="medium"
                  >
                    game
                  </Button>
                  {/* <Button size="small">Learn More</Button> */}
                </CardActions>
                <Person  className="icon-person1" sx={{position:"absolute" , top:"10px", right:"-20px", color:"#777" , transition:"0.2s"}} />
                <Person3 className="icon-person2" sx={{position:"absolute" , top:"40px", right:"-20px", color:"#777" , transition:"0.4s"}} />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default One;
