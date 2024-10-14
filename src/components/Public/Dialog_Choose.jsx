/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { Box, Button, Stack, Typography } from "@mui/material";

export default function Dialog_Choose({ setOpen, open, data }) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth={"xs"}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Typography p={2} component={"p"} variant="h6">
            {data?.title}
          </Typography>

          <Button onClick={handleClose}>No</Button>
          <Button color="error" onClick={data.fun}>
            yes
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
