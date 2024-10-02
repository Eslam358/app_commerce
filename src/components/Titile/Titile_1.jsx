import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Titile1 = () => {
  const theme = useTheme();
  return (
    <>
      <Container maxWidth="xl" sx={{ my: 3, py: 3 }}>
        <Stack
          direction={"row-reverse"}
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
              width: "75%",
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
              },
              //   "&::before": {
              //     content: '""',
              //     position: "absolute",
              //     width: "3px",
              //     height: "85px",
              //     backgroundColor: "black",

              //     top: "-3px",
              //     right: "-4px",

              //     zIndex: "2",
              //   },
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
                  px: "20px",

                  mx: "19px",
                  my: "5px",

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
              // bgcolor: "#f7f7f8",
              py: 3,
              width: "25%",
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
