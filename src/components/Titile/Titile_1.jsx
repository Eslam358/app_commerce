import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const Titile1 = () => {
  const theme = useTheme();
  // const matches_md = useMediaQuery(theme.breakpoints.down("sm"));
  const matches_md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 3, py: 3 }}>
        <Stack
          direction={`${matches_md?"column-reverse":"row-reverse"}`}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ my: 3, py: 3 }}
        >
          <Typography
            sx={{
              display: "flex",
              bgcolor: "#1f2937",
              justifyContent: "flex-end",
              alignItems: "center",
              py: 2,
              // width:`${matches_md?"100%":"75%"} `,
              width:{md:"75%", xs:"100%"},
              borderRight: "20px",
              // borderRadius: "55px 0px 0px 5px",
              borderRadius: {md:"55px 0px 0px 5px", xs:"0px 0px 0px 5px"},
              position: "relative",
              border: "1px dashed white",
              outline: "3px solid #1f2937",
              zIndex: "0",
              "&::after": {
                content: '""',
                position: "absolute",
                width: "40px",
                height: "120px",
                // @ts-ignore
                display:{md:"block", xs:"none"},
                // @ts-ignore
                backgroundColor: theme.palette.body_color.primary,

                top: "-25px",
                left: "-7px",
                transform: "rotateZ(31deg)",
              }
         
            }}
            component="div"
          >
            <Box sx={{ overflow: "hidden", flexGrow: "1" }}>
              <Typography variant="h4" component={"div"} className="word">
                Pay only for your loving electronics
              </Typography>
            </Box>
            <Typography
              sx={{ bgcolor: "#1f2937", position: "relative", zIndex: "1" }}
            >
              <Button
                sx={{
                  px: `${matches_md?"0":"20px"} `,

                  mx:`${matches_md?"5px":"20px"} `,
                  my: `${matches_md?"0":"5px"} `,

                  fontWeight: "bold",
                  transition: "0.5s",
                  bgcolor: "white",
                  color: "#1f2937",
                  "&:hover": { bgcolor: "#1f2937", color: "white" },
                }}
                size="medium"
              >
                shope
              </Button>
            </Typography>
          </Typography>
          <Typography
            variant="h4"
            sx={{
           
              py: 3,
              // width: `${matches_md?"90%":"25%"} `,
              width:{md:"25%", xs:"100%"},
              position: "relative",
              fontWeight: "bold",
              zIndex: "1",
            }}
            component="div"
          >
            Black friday sale!
          </Typography>{" "}
        </Stack>
      </Container>
    </>
  );
};

export default Titile1;
