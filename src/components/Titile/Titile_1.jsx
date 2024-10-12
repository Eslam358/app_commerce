import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const Titile1 = () => {
  const theme = useTheme();
  const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Container maxWidth="xl" sx={{ my: 3, py: 3 }}>
        <Stack
          direction={`${matches_sm?"column-reverse":"row-reverse"}`}
          // direction={"column-reverse"}
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
              width:`${matches_sm?"100%":"75%"} `,
              borderRight: "20px",
              borderRadius: "55px 0px 0px 5px",
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
                  px: `${matches_sm?"0":"20px"} `,

                  mx:`${matches_sm?"5px":"20px"} `,
                  my: `${matches_sm?"0":"5px"} `,

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
              width: `${matches_sm?"90%":"25%"} `,
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
