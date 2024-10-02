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
} from "../../reduxtoolkit/slice/DialogSign";
import { Data_Person_fun_get } from "../../reduxtoolkit/slice/Data_Person";
import {
  Snackbar_massage_success,
  Snackbar_massage_error,
} from "../../reduxtoolkit/slice/Snackbars";

import {
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Signin() {
  // @ts-ignore
  const open_sign_in = useSelector((dat) => dat.Sign_in);
  const sign_in_Fun = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignup = async (data) => {
    // جلب البيانات باستخدام axios
    axios

      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((response) => {
        // وضع البيانات في الحالة

        sign_in_Fun(
          Snackbar_massage_success(
            response.data.message + " " + response.data.user.name
          )
        );
        sign_in_Fun(Data_Person_fun_get(response.data));
        console.log("response.data.massage", response.data.message);

        setLoading(false);
        sign_in_Fun(handleClose_Signin());
      })
      .catch((error) => {
        // التعامل مع الأخطاء
        console.log("erroreeeeeeee", error);

        sign_in_Fun(Snackbar_massage_error(error.message));
        setLoading(false);
        sign_in_Fun(handleClose_Signin());
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
    sign_in_Fun(handleClose_Signin());
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
          <Typography component="div" sx={{ fontSize: "12px" }}>
            Don&apos;t have account?
            <Button
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              onClick={() => {
                sign_in_Fun(handleClose_Signin());
                sign_in_Fun(handle_Open_Signup());
              }}
            >
              Register
            </Button>{" "}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => sign_in_Fun(handleClose_Signin())}>
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
