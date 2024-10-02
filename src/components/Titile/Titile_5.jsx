import { Box, Stack} from "@mui/material";
import "./titile.css";
const Titel5 = () => {
  return (
    <>
        <Box sx={{ my: 4,}}>
            <h3>Featured Brands</h3>
      <Stack
        direction={"row"}
        className="title_5"
        gap={2}
        justifyContent={"space-between"}
        sx={{
          overflow: "hidden",
          bgcolor:"#fff",
         mt:3,
          py:5,
          px:2,
     
          "img":{ filter: "grayscale(1)"},
        }}
      >
          <Box  sx={{ textAlign: "center" }}>
            <img
              src="./assets/All_img/alibaba.png"
              style={{ width: " 50%" }}
              alt=""
              
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="./assets/All_img/levis.png"
              style={{ width: " 50%" }}
              alt=""
            />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img
              src="./assets/All_img/lotto.png"
              style={{ width: " 50%" }}
              alt=""
            />
          </Box>
          <Box
            sx={{ textAlign: "center", display: { xs: "none", sm: "block" } }}
          >
            <img
              src="./assets/All_img/raymond.png"
              style={{ width: " 50%" }}
              alt=""
            />
          </Box>
          <Box
            sx={{ textAlign: "center", display: { xs: "none", md: "block" } }}
          >
            <img
              src="./assets/All_img/samsung.png"
              style={{ width: " 50%" }}
              alt=""
            />
          </Box>
      </Stack>
        </Box>
    </>
  );
};

export default Titel5;
