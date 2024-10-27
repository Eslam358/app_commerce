/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

import { Button, Typography } from "@mui/material";
import { handleClickOpen } from "../../reduxtoolkit/slice/global/DialogSign";
import { Close_Dialog_test } from "../../reduxtoolkit/slice/global/Dialog_test_sigin";
import { useEffect, useState } from "react";

export default function Dialog_test_signIn() {
  const theme = useTheme();

  // @ts-ignore
  const open = useSelector((dat) => dat.test_singIn);
  const [open_test, setOpen_test] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const fun_redux = useDispatch();

  const handleClose = () => {
    fun_redux(Close_Dialog_test());
    setOpen_test(false);
  };

  useEffect(() => {
    setOpen_test(open);
  }, [open]);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"xs"}
        fullWidth={true}
        open={open_test}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Typography p={2} component={"p"} variant="h6">
            Access restricted. Please log in first.
          </Typography>

          <Button   color="error" onClick={handleClose}>cancel</Button>
          <Button
            color="success"
            onClick={() => {
              fun_redux(handleClickOpen());
              handleClose();
            }}
          >
            sign in
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
