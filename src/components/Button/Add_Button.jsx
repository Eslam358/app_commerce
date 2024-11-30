/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Add_cart } from "../../reduxtoolkit/slice/Cart/Items_Cart";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Open_Dialog_test } from "../../reduxtoolkit/slice/global/Dialog_test_sigin";
import { cart_add_item } from "../../reduxtoolkit/slice/Cart/Add_Item";
import  { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";



// eslint-disable-next-line react/prop-types
const AddButton = ({ item }) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  // @ts-ignore
  const Data_Person = useSelector((dat) => dat.Data_Person);

  // @ts-ignore
  const cart_add_item_data = useSelector((dat) => dat.cart_add_item);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      cart_add_item_data.data.status === "success" &&
      loading
    ) {
      dispatch(
        Add_cart({ item: item, cartAdd: cart_add_item_data.data.data })
      );
      setLoading(false);
    }else if( cart_add_item_data.data.status !== "success"){
      setLoading(false);

    }

  }, [cart_add_item_data.data]);

  const add_item =  () => {
 
    setLoading(true);
   
    // @ts-ignore
   dispatch(cart_add_item(item.id));

  };

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();

          if (Data_Person.message !== "success") {
            dispatch(Open_Dialog_test());

            return;
          }
          add_item();
    
        }}
        sx={{
          width: "90%",

          mx: "auto",
          // @ts-ignore
          color: theme.palette.text.button,
          fontWeight: "bold",
          transition: "0.5s",
          border: "1px solid #777",
          textTransform: "capitalize",

          "&:hover": {
            bgcolor: "#1f2937",
            color: "white",
          },
        }}
        size="medium"
      >
        {loading  ? "loading..." : " Add to Car"}
        {loading  && (
          <CircularProgress sx={{ position: "absolute" }} size={25} />
        )}
      </Button>
    </>
  );
};

export default AddButton;
