import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderActions";


export default function UserOrders() {
  const { userOrders } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction);
  }, [dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "ONumber of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        
      ],
      rows: [],
    };

    userOrders.forEach((userOrder) => {
      data.rows.push({
        id: userOrder._id,
        numOfItems: userOrder.orderItems.length,
        amount: `$${userOrder.totalPrice}`,
        status:
          userOrder.orderStatus &&
          userOrder.orderStatus.includes("Delivered") ? (
            <p style={{ color: "green" }}>{userOrder.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{userOrder.orderStatus}</p>
          ),
        
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title="my Orders" />
      <h1 className="mt-5">My Orders</h1>
      <MDBDataTable
        className="px-3"
        bordered
        striped
        hover
        data={setOrders()}
      />
    </Fragment>
  );
}
