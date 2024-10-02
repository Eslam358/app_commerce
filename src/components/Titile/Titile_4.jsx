import { Box, Button, Stack, Typography } from "@mui/material";
import "./titile.css";
const Titel4 = () => {
  return (
    <>
      <Box
        sx={{
          py: 1,
          px:3,
          my:3,

          backgroundImage: `url(./assets/All_img/long-banner.jpg)`,
        }}
      >
        <Stack
          direction={{  xs:"column",md:"row"}}
          gap={3}
          // justifyContent={"space-around"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            overflow: "hidden",
            my: 4,
            // flexWrap: { xs: "wrap", md: "wrap", lg: "nowrap" },
          }}
        >
          <div>
            <Typography
              variant="h4"
              component="p"
              textAlign={"center"}
              fontWeight={"bold"}
              color="#222"
              flexGrow={"1"}
            >
              GIFT{" "}
              <span
                style={{
                  color: "#d23f57",
                }}
              >
                50% OFF{" "}
              </span>{" "}
              PERFECT STYLES
            </Typography>

            <Typography
              textAlign={"center"}
              color={"#222"}
              fontSize={"17px"}
              mt={0}
            >
              Only until the end of this week. Terms and conditions apply
            </Typography>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
              
                px: 5,
                py: "10px",
                mx: "auto",
                color: "#222",
                fontWeight: "bold",
                fontSize:"24",
                transition: "0.5s",
                textTransform:"capitalize",

                bgcolor: "#fff",
                "&:hover": {
                  bgcolor: "#1f2937",
                  color: "white",
                },
              }}
              size="large"
            >
              Discover Now
            </Button>
          </div>
        </Stack>
      </Box>
    </>
  );
};

export default Titel4;
