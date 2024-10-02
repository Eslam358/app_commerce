import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Roote = () => {
    return (
        <>
              <Box
          className="ooooooooooooo"
          component="div"
       
        >
          <Outlet />
        </Box>
            
        </>
    );
}

export default Roote;
