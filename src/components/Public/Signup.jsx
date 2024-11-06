import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  handleClose_Signup,
  handleClickOpen,
} from "../../reduxtoolkit/slice/global/DialogSign";
import { Data_Person_fun_get } from "../../reduxtoolkit/slice/global/Data_Person";
import {
  Snackbar_massage_success,
  Snackbar_massage_error,
} from "../../reduxtoolkit/slice/global/Snackbars";

import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Sign_up() {
  const theme = useTheme();
  // @ts-ignore
  const open_sign_up = useSelector((dat) => dat.Sign_up);
  const sign_in_Fun = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error_pass, seterror_pass] = useState(false);

  const handleSignup = async (data) => {
    if (data.rePassword !== data.rePassword) {
        seterror_pass(true)
        return;
    }else{
        seterror_pass(false)
    }
    // جلب البيانات باستخدام axios

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data
      );
  
      
      sign_in_Fun(
        Snackbar_massage_success(
          response.data.message + " " + response.data.user.name
        )
      );
      sign_in_Fun(Data_Person_fun_get(response.data));
  
      

      setLoading(false);
      sign_in_Fun(handleClose_Signup());

      // استجابة ناجحة
    } catch (error) {
      sign_in_Fun(Snackbar_massage_error(error.message));
      setLoading(false);
      //   sign_in_Fun(handleClose_Signup());

      if (error.response) {
        console.error(error.response)
      
      } else if (error.request) {
        // تم إرسال الطلب ولكن لم يتم الرد من الخادم
       console.error("Request Error:", error.request);
      } else {
        // حدث خطأ في إعداد الطلب
        console.error( "Error Message:", error.message);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseif = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    sign_in_Fun(handleClose_Signup());
  };

  return (
    <>
      <Dialog
        open={open_sign_up}
        onClose={handleCloseif}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            setLoading(true);
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // @ts-ignore
            const formJson = Object.fromEntries(formData.entries());
            await handleSignup(formJson);
          },
        }}
      >
                <Box sx={{width:"100px", p:0,mx:"auto",mt:2}}>
        {theme.palette.mode === "light" ? (
                <img
                  width="100%"
                  src="./assets/logo/logo2.b6e97da2.svg"
                  alt="logo"
                />
              ) : (
                <img
                  width="100%"
                  src="./assets/All_img/logo.svg"
                  alt="logo"
                />
              )}
        </Box>
        <DialogTitle sx={{ pt:0}}>Sign in</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}

          <InputLabel required htmlFor="name">
            fullName
          </InputLabel>
          <TextField
          
            sx={{ mb: 2 }}
            size="small"
            autoFocus
            required
            id="name"
            name="name"
            placeholder="fullName"
            fullWidth
          />

          <InputLabel required htmlFor="email">
            Email
          </InputLabel>
          <TextField
            autoFocus
            required
            sx={{ mb: 2 }}
            size="small"
            id="email"
            name="email"
            type="email"
            placeholder="exmple@mail.com"
            fullWidth
          />

          <InputLabel required htmlFor="password">
            Password
          </InputLabel>
          <OutlinedInput
          error={error_pass}
            required
            sx={{ mb: 2 }}
            placeholder="******"
            size="small"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <InputLabel required htmlFor="rePassword">
            rePassword
          </InputLabel>
          <OutlinedInput
          error={error_pass}
            required
            sx={{ mb: 2 }}
            placeholder="******"
            size="small"
            id="rePassword"
            name="rePassword"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <InputLabel required htmlFor="phone">
            phone
          </InputLabel>
          <TextField
            required
            size="small"
            sx={{ mb: 2 }}
            placeholder="012365456789"
            id="phone"
            name="phone"
            type="number"
            fullWidth
          />
          <Typography component="div" sx={{ fontSize: "12px" }}>
            Do have account? {" "}
            <Button
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "capitalize",
                p: "0px",
                color: `${theme.palette.text.primary}`,
                minWidth: "fit-content",
              }}
              onClick={() => {
                sign_in_Fun(handleClose_Signup());
                sign_in_Fun(handleClickOpen());
              }}
            >
             
              sign in
            </Button>
          </Typography>
          <Typography component="div" sx={{ fontSize: "12px" }}>
            Forgot your password? {" "}
            <Button
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "capitalize",
                p: "0px",
                color: `${theme.palette.text.primary}`,
                minWidth: "fit-content",
          
              }}
              onClick={() => {
                sign_in_Fun(handleClose_Signup());
                sign_in_Fun(handleClickOpen());
              }}
            >
              Reset It
            </Button>{" "}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => sign_in_Fun(handleClose_Signup())}>
            Cancel
          </Button>
          <Button type="submit">
            Sign up
            {loading && (
              <CircularProgress sx={{ position: "absolute" }} size={18} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
