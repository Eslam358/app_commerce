import { Box, Divider, Stack, Typography } from "@mui/material";
import "./titile.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Titel3 = () => {
  const theme = useTheme();
  const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Stack
        direction={"row"}
        className="title_2"
        gap={2}
        justifyContent={"space-between"}
        sx={{
          overflow: "hidden",
          my: 4,
          flexWrap: { xs: "wrap", md: "wrap", lg: "nowrap" },
        }}
      >
        <Box sx={{ minWidth: "30px", width: "100%", position: "relative" }}>
          <img
            src="./assets/All_img/banner-21.jpg"
            style={{
              width: " 100%",
              height: `${matches_sm ? " 140px" : " 100%"}  `,
            }}
            alt=""
          />
          <div className=" text_position">
            <Typography
              //   mb={0}
              color={"#555"}
              sx={{ fontWeight: "600" }}
              fontSize={"16px"}
            >
              Final Reduction
            </Typography>
            <Typography
              variant="h5"
              component="p"
              //   fontSize={"24px"}
              fontWeight={"bold"}
              color="#222"
            >
              Sale up to 20% Off
            </Typography>
            <Divider
              sx={{ bgcolor: "black", height: "2px", width: "30%", mt: 1 }}
            />
            <Typography color={"#222"} fontSize={"15px"} mt={2}>
              Only From{" "}
              <span
                style={{
                  color: "#d23f57",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {" "}
                $270.00
              </span>
            </Typography>
          </div>
        </Box>
        <Box sx={{ minWidth: "300px", width: "100%", position: "relative" }}>
          <img
            src="./assets/All_img/banner-22.jpg"
            style={{
              width: " 100%",
              height: `${matches_sm ? " 140px" : " 100%"}  `,
            }}
            alt=""
          />
          <div className=" text_position">
            <Typography
              //   mb={0}
              color={"#fff"}
              sx={{ fontWeight: "600" }}
              fontSize={"16px"}
            >
              Weekend Sale
            </Typography>
            <Typography fontSize={"24px"} fontWeight={"bold"} color="#fff">
              Fine Smart Speaker
            </Typography>
            <Divider
              sx={{ bgcolor: "#fff", height: "2px", width: "30%", mt: 1 }}
            />
            <Typography color={"#fff"} fontSize={"15px"} mt={2}>
              Starting at{" "}
              <span
                style={{
                  color: "#d23f57",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {" "}
                $270.00
              </span>
            </Typography>
          </div>
        </Box>
      </Stack>
    </>
  );
};

export default Titel3;
