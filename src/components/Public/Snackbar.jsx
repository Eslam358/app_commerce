import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar_Close } from "../../reduxtoolkit/slice/global/Snackbars";

export default function Snackbars() {
  // @ts-ignore
  const Snackbar_data = useSelector((dat) => dat.Snackbars);
  const Close_fun = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    Close_fun(Snackbar_Close());
  };

  return (
    <div>
      <Snackbar
        open={Snackbar_data.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={Snackbar_data.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {Snackbar_data.massage && Snackbar_data.massage}
        </Alert>
      </Snackbar>
    </div>
  );
}
