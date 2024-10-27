import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function DialogSignup() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSignup = async (data) => {
    // جلب البيانات باستخدام axios
    axios
      // .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        name: data.name,
        email: data.email,
        password:  data.password,
        rePassword: data.repassword,
        phone: data.phone,
      })
      .then((response) => {
  

        setLoading(false);
      })
      .catch((error) => {
      console.error(error)
    
        
        setError(error);
        setLoading(false);
      });
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit:async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            // @ts-ignore
            const formJson = Object.fromEntries(formData.entries());
    
           await handleSignup(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>

          <InputLabel required htmlFor="fullName">
            fullName
          </InputLabel>
          <TextField
            sx={{ mb: 2 }}
            size="small"
            autoFocus
            required
            id="fullName"
            name="fullName"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
