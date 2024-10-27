import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  handleClose_Signin,
  handle_Open_Signup,
} from "../../reduxtoolkit/slice/global/DialogSign";
import { Data_Person_fun_get } from "../../reduxtoolkit/slice/global/Data_Person";
import {
  Snackbar_massage_success,
  Snackbar_massage_error,
} from "../../reduxtoolkit/slice/global/Snackbars";
import { wishlist_list } from "../../reduxtoolkit/slice/Wishlist/Wishlist_list";
import { cart_items } from "../../reduxtoolkit/slice/Cart/Items_Cart";

import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

export default function Signin() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // @ts-ignore
  const open_sign_in = useSelector((dat) => dat.Sign_in);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignup = async (data) => {
    // جلب البيانات باستخدام axios

    data = checked
      ? { email: "eslam900aa@gmail.com", password: "eslam@123" }
      : data;


    axios

      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((response) => {
        // وضع البيانات في الحالة

        dispatch(
          Snackbar_massage_success(
            response.data.message + " " + response.data.user.name
          )
        );
        dispatch(Data_Person_fun_get(response.data));
   
        dispatch(wishlist_list());
        // @ts-ignore
        dispatch(cart_items());
        setLoading(false);
        dispatch(handleClose_Signin());
      })
      .catch((error) => {
        console.error(error)
        // التعامل مع الأخطاء
     

        dispatch(Snackbar_massage_error(error.message));
        setLoading(false);
        dispatch(handleClose_Signin());
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // @ts-ignore
  const handleCloseif = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    dispatch(handleClose_Signin());
  };

  return (
    <React.Fragment>
      <Dialog
        open={open_sign_in}
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
        <DialogTitle>Sign in</DialogTitle>

        <DialogContent>
          <InputLabel required htmlFor="email">
            Email
          </InputLabel>
          <TextField
            autoFocus
            required={checked?false: true}
            sx={{ mb: 2 }}
            size="small"
            id="email"
            name="email"
            type="email"
            placeholder="exmple@mail.com"
            fullWidth
          />

          <InputLabel required={checked?false: true} htmlFor="password">
            Password
          </InputLabel>
          <OutlinedInput
           required={checked?false: true}
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
          <Typography component="div" sx={{ fontSize: "12px" }}>
            Don&apos;t have account?
            <Button
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              onClick={() => {
                dispatch(handleClose_Signin());
                dispatch(handle_Open_Signup());
              }}
            >
              Register
            </Button>{" "}
          </Typography>
          <Box sx={{ ".MuiTypography-root": { fontSize: "12px" } }}>
            {" "}
            <FormControlLabel
              control={
                <PinkSwitch
                  size="small"
                  onChange={handleChange}
                  checked={checked}
                  inputProps={{ "aria-label": "controlled" }}
                  defaultChecked
                />
              }
              label="Use Default Account"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ pt: "0" }}>
          <Button onClick={() => dispatch(handleClose_Signin())}>
            Cancel
          </Button>
          <Button type="submit">
            Sign in
            {loading && (
              <CircularProgress sx={{ position: "absolute" }} size={18} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
