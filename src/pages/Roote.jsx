import { useTheme, Box } from "@mui/material";
import Footer from "../components/main/Footer";
import Dialog_test_signIn from "../components/Public/Dialog_test_Signin";
import Sign_up from "../components/Public/Signup";
import SignIn from "../components/Public/Signin";
import SnackBars from "../components/Public/Snackbar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header2 from "../components/header/Header_2";

const Roote = () => {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const [show, setShow] = useState(0);
  const theme = useTheme();
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setShow(scrollPosition - window.scrollY);
     
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return (
    <>
        <Box
          sx={{
            width: "100%",
            position: `${location.pathname === "/" ? "fixed" : "none"}`,

            top: `${show < 0 && scrollPosition > 122 ? 0 : "-100px"}`,
            zIndex: `${theme.zIndex.appBar}`,
            // @ts-ignore
            bgcolor: `${theme.palette.bg_main.main}`,

            transition: `${scrollPosition > 122 ? "0.4s" : "0.2s"}`,
            py: 1,
          }}
        >
 
          <Header2/>
        </Box>
     

        <Outlet />
        <Footer />
        <Dialog_test_signIn />
        <Sign_up />
        <SignIn />
        <SnackBars />
      
    </>
  );
};

export default Roote;
