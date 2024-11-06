import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { Add, CloseOutlined, HorizontalRule } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,

  Container,

  IconButton,
  TableFooter,
  Typography,

} from "@mui/material";
import { Remove_cart_item } from "../reduxtoolkit/slice/Cart/Remove_Item";
import { Clear_cart_ } from "../reduxtoolkit/slice/Cart/Clear_Cart";
import { cart_Update_quantity } from "../reduxtoolkit/slice/Cart/Update_quantity";
import { useEffect, useState } from "react";
import { cart_items} from "../reduxtoolkit/slice/Cart/Items_Cart";
import Dialog_Choose from "../components/Public/Dialog_Choose";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.footer}`]: {
    fontSize: 14,
      // @ts-ignore
    color: theme.palette.red_main.main,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ViewCart() {
  const Navigate = useNavigate();
  // const theme = useTheme();
  // const Data_Cart = useSelector((dat) => dat.Remove_cart_item);
    // @ts-ignore
  const Clear_Cart = useSelector((dat) => dat.Clear_cart);
    // @ts-ignore
  const cart_list = useSelector((dat) => dat.cart_items || []);
  


  const [total_count, setTotal_count] = useState(0);
  const [open, setOpen] = useState(false);


  const fun_redux = useDispatch();

  const Remove_item = async(product_id) => {
      // @ts-ignore
    await fun_redux(Remove_cart_item(product_id));
    await fun_redux(cart_items());
  };
  // @ts-ignore
  const Clear_cart =  () => {
  fun_redux(Clear_cart_());
  setOpen(false)

    if (Clear_Cart.data.message === "success") {
     
      fun_redux(cart_items());
    }
  };

  const Update_quantity = (id, count) => {
    fun_redux(cart_Update_quantity({ id, count }));
  };

  useEffect(() => {
     if (Clear_Cart.data.message === "success") {

     
     fun_redux(cart_items());
   }
    
  }, [Clear_Cart.data.message]);

 

  useEffect(() => {
    const total = cart_list.data?.products?.reduce((A, B) => A + B.count, 0);
    setTotal_count(total);
  }, [cart_list.data.products]);

  return (
    <>
     <Container maxWidth="xl" sx={{my:3}}  >
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 800 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>name</StyledTableCell>
              <StyledTableCell align="center">imageCover</StyledTableCell>
              <StyledTableCell align="center">price</StyledTableCell>
              <StyledTableCell align="center">count</StyledTableCell>
              <StyledTableCell align="center">total</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody  >
            {cart_list.data?.products?.length > 0 ? (
              cart_list.data.products?.map((product) => (
                <StyledTableRow key={product.product.id}>
                  <StyledTableCell component="th" scope="row">
                    {product.product.title?.slice(0, 50)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img src={product.product.imageCover} width="25px" alt="" />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <Box
                      sx={{
                        fontSize: "14px",
                        display: "flex",
                        gap: "10px",
                        width: "fit-content",
                        alignItems: "center",
                        mx: "auto",
                      }}
                    >
                      <IconButton
                        sx={{
                          fontSize: "12px",
                        }}
                        onClick={() => {
                          let count = product.count + 1;
                          Update_quantity(product.product.id, count);
                        }}
                        size="small"
                        aria-label="close"
                      >
                        <Add fontSize="inherit" />
                      </IconButton>
                      <p>{product.count}</p>
                      <IconButton
                        disabled={product.count === 1}
                        onClick={() => {
                          let count = product.count - 1;
                          Update_quantity(product.product.id, count);
                        }}
                        size="small"
                        aria-label="close"
                        sx={{
                          fontSize: "12px",
                        }}
                      >
                        <HorizontalRule fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.price * product.count}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => {
                        Remove_item(product.product.id);
                      }}
                      size="small"
                      sx={{
                        transition: "0.3s",
                        minWidth: "25px",
                        minHeight: "25px",

                        p: 0,

                        "&:hover ": {
                          transform: " rotate(180deg)",
                          color: "red",
                        },
                      }}
                      className="icon close"
                      aria-label="close"
                    >
                      <CloseOutlined fontSize="inherit" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
             <>
               <StyledTableRow>
                 <StyledTableCell align="center" colSpan={6}>
                  <Typography component={"h5"} variant="h4">no data</Typography>
                   
                 </StyledTableCell>
                 
               </StyledTableRow>
               <StyledTableRow>
                 <StyledTableCell align="center" colSpan={6}>
                  
                   <Button onClick={() => Navigate("/")}> Go to Home</Button>
                 </StyledTableCell>
                 
               </StyledTableRow>
             </>
            )}
          </TableBody>
          {cart_list.data?.products?.length > 0 && (
            <TableFooter>
              <TableRow>
                <StyledTableCell colSpan={3}>
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      px: "15%",
                      py: "7px",
                      mr: "10%",
                      my: "5px",
                      // bgcolor: theme.palette.red_main.main,
                    }}
                    color="error"
                    size="small"
                    variant="contained"
                    // onClick={()=>   navigate(`/ViewCart`)}
                  >
                    pay Items
                  </Button>
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      px: "15%",
                      py: "7px",
                      // bgcolor: theme.palette.red_main.main,
                    }}
                    color="error"
                    size="small"
                    variant="outlined"
                    onClick={() => setOpen(true)}
                  >
                    Clear cart
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">{total_count}</StyledTableCell>
                <StyledTableCell align="center">
                  {" "}
                  {cart_list.data.totalCartPrice}
                </StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
      </Container>
      <Dialog_Choose
        setOpen={setOpen}
        open={open}
        data={{
          title: "do you shore clear the All items Cart ?",
          fun: Clear_cart,
        }}
      />
    </>
  );
}
