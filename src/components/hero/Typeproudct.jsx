import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

const Typeproudct = () => {
  const theme = useTheme()
  const matches_xs400 =  useMediaQuery('(max-width:400px)');

  // @ts-ignore
  const Categories = useSelector((dat) => dat.Categories);

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap="wrap"
        gap={2}
      >
        {Categories.data.slice(0,5).map((item) => (
          <Card
            key={item._id}
            // className="fex"
            color="#fff"
            sx={{
              width: `${!matches_xs400? "200px": "100%"}`,

              // height:`${!matches_sm? "200px": "400px"}`,
              py: "2px",
              "&:hover .MuiCardMedia-img": { scale: "1.01" },

              "&:hover .MuiButtonBase-root.MuiButton-root": {
                bgcolor: "#1f2937",
                color: "white",
              },
            }}
          >
            <CardActionArea
              sx={{
                  color:"#fff",
                width: "95%",
                m: "auto",
                mt: "2px",

                pointerEvents: "none",
              }}
            >
              <CardMedia
        
                className="img_Typeproudct"
                component="img"
                image={item.image}
                alt="green iguana"
                sx={{
                  width: "150px",
                  height: "150px",
                  m: "auto",
                  transition: "0.5s",
                  scale: "0.9",
                }}
              />
        
            </CardActionArea>
            <CardActions>
              <Button
                sx={{
                  px: "40%",
                  mt: "1px",

                  mx: "auto",
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  transition: "0.5s",
                  fontSize:"12px",

                  "&:hover": {},
                }}
                size="medium"
              >
             {item.name.split(" ")[0]}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Typeproudct;

