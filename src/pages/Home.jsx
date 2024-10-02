import Header2 from "../components/header/Header_2";
import Header1 from "../components/header/Header_1";
import Header3 from "../components/header/Header_3";
import Hero from "../components/hero/hero";
import Titile1 from "../components/Titile/Titile_1";
import Main from "../components/main/Main";
import Sign_up from "../components/Public/Signup";
import Signin from "../components/Public/Signin";
import Snackbars from "../components/Public/Snackbar";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";




const Home = () => {
    const theme = useTheme()
    return (
        <>
            
          <Header1 />
          <Box sx={{ height: "calc(100vh - 54px)", overflow: "auto", pt: 2 }}>
            <Header2 />
            <Header3 />
            <Box
              sx={{
                bgcolor:
                  // @ts-ignore
                  theme.palette.body_color.primary,
              }}
            >
              <Hero />
              <Titile1 />
              <Main />
            </Box>
            <Sign_up />
            <Signin />
            <Snackbars />
          </Box>
        </>
    );
}

export default Home;
