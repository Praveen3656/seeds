import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removecart, newcart, decrement } from "../Slices/counterSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "./Apis";

const Cart = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.cartnew);

  //console.log(count);
  // const uniquecarts = count.filter(
  //   (obj, index) =>
  //   count.findIndex((item) => item.products === obj.products) === index
  // );

  const [cartitems, setCartitems] = useState(count);
  console.log(cartitems);

  // console.log(unique);

  const [shipadderss, setShipadderss] = useState([]);
  const [selectshipadderss, setSelectshipadderss] = useState([]);
  const [billingadders, setBillingadders] = useState([]);
  const [selectbillingadderss, setSelectbillingadderss] = useState();
  const [ordersuccess, setOrdersuccess] = useState(false);
  const [orderfail, setOrderfail] = useState(false);
  const [biil, setBill] = useState();

  const [clear,setClear] =useState();
  var getuseridsession = sessionStorage.getItem("useridsession");

  console.log(getuseridsession);
  // let pp = cartitems.filter( (ele, ind) => ind === cartitems.findIndex( elem => elem.products === ele.products))
  const setIncrement = (id, index) => {
    const newitems = [...cartitems];
    let count = newitems[index];
    const obj = Object.assign({}, count);
    obj.quantity = obj.quantity + 1;
    newitems[index] = obj;
    //console.log(newitems);
    setCartitems(newitems);
  };

  const setDescriment = (e, index) => {
    const newitems = [...cartitems];
    let count = newitems[index];
    const obj = Object.assign({}, count);
    if (newitems[index].quantity !== 0) obj.quantity = obj.quantity - 1;
    newitems[index] = obj;
    //console.log(newitems);
    setCartitems(newitems);
  };

  const removeitem = (e, pid) => {
    let removeitems = [...cartitems];
    let deleteotemcromcart = [];
    deleteotemcromcart = removeitems.filter(function (item) {
      return item.products !== pid;
    });

    let deleteotemcromcart_two = [];
    deleteotemcromcart_two = removeitems.filter(function (item) {
      return item.products === pid;
    });

    dispatch(removecart(pid));
    dispatch(decrement());
    setCartitems(deleteotemcromcart);
    // console.log(cartitems);
    // console.log(deleteotemcromcart_two);
  };

  const requesrshipadderss = { userId: 8951789539, addressTypeId: 2 };
  console.log(requesrshipadderss);
  useEffect(() => {
    fetch(`${URL}/api/v1/user_address`, {
      method: "POST",
      body: JSON.stringify(requesrshipadderss),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setShipadderss(json));
  }, [0]);

   console.log(shipadderss);
  const requesrbillingadderss = { userId: 8951789539, addressTypeId: 1 };
  useEffect(() => {
    fetch(`${URL}/api/v1/user_address`, {
      method: "POST",
      body: JSON.stringify(requesrbillingadderss),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setBillingadders(json));
  }, [0]);

  const shipping = (e) => {
    setSelectshipadderss(e.target.value);
  };

  const billing = (e) => {
    setSelectbillingadderss(e.target.value);
  };

  const placeorder = async () => {
    let removeitems = [...cartitems];
     
     
    let productOrder = removeitems.map((item) => {
      let obj = {
        productUnitId: item.products,
        noOfUnits: item.quantity,
      };
      return obj;
    });

    const requestplaceorder = {
      userId: getuseridsession,
      billingAddress: selectbillingadderss,
      shippingAddress: selectshipadderss,
      productOrderModel: productOrder,
    };

    console.log(requestplaceorder);

    try {
      const placeOrder_request = await axios.post(
        `${URL}/api/v1/place_order`,
        requestplaceorder,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("place_order_resposne", placeOrder_request.status);
      if (placeOrder_request.status === 200) {
        navigate("/Success");
        dispatch(removecart(removeitems.products));
        dispatch(decrement());
      } else {
        setOrderfail(true);
      }
    } catch (err) {
      console.log(err);
    }
    console.log(requestplaceorder);
  };

  return (
    <>
      <div className="Header">
        <Row className="section-row">
          <Col lg={6}>
          <Link to="/"><span className="logout">Logout</span></Link>
            <div className="logo">
              <img src={logo} alt="logo"></img>
            </div>
            <div></div>
          </Col>
        </Row>
      </div>
         
      <div className="orders">
        <span className="back">
          <p onClick={() => navigate(-1)}>Back</p>
        </span>
      </div>

      <p>
        {cartitems === 0 ? (
          <p className="emptycart">
            <center>
              Your Cart is Empty <br />
              <Link to="/">Home</Link>
            </center>
          </p>
        ) : (
          ""
        )}
      </p>
      <p>
        {cartitems.length === 0 ? (
          <p className="emptycart">
            <center>
              Your Cart is Empty <br />
              <Link to="/Header">Home</Link>
            </center>
          </p>
        ) : (
          ""
        )}
      </p>
      <div className="cart">
        {cartitems.map((item, idx) => (
          <div className="cartdetails">
            <Row>
              <Col lg={3} className="cart-box1">
                <img
                  className="cart-image"
                  src={`https://srikarseeds.s3.ap-south-2.amazonaws.com/images/products/${item.productid}.png`}
                ></img>
              </Col>
              <Col lg={3} className="cart-box2">
                <span>Product Name: {item.productname}</span>
                <br />
                <span>
                  Quantity : <span>{item.quantity}</span>
                  <br />
                  <span>MRP: {item.billingPrice}</span>
                  <br />
                  <span>
                    Weight: {item.packsize} {item.packunit}
                  </span>
                  <br />
                  <span>
                    Billing Price: {item.billingPrice * item.quantity}
                  </span>
                  <br />
                  <div className="add">
                    <button
                      className="units_inc"
                      value={item.quantity}
                      onClick={() => setIncrement(item.products, idx)}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="units_inc"
                      value={item.quantity}
                      onClick={() => setDescriment(item.products, idx)}
                    >
                      -
                    </button>
                  </div>
                </span>

                <button
                  className="remove"
                  value={item.products}
                  onClick={(e) => removeitem(e, item.products)}
                >
                  Remove
                </button>
              </Col>
            </Row>
          </div>
        ))}

        {cartitems.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="placeorder">
              <div className="shipping_adderss">
                <small>Select Shipping Adderss</small>
                 <br />
                 <select className="sadderss" onChange={(e) => shipping(e)}>
                  <option>--select--</option>
                  
                  {shipadderss.map((sitem, id) => {
                    return (
                      <option key={id} value={sitem.addressId}>
                        <small className="add-text">{sitem.addressName}</small>
                      </option>
                    );
                  })}

                </select>
                {shipadderss.map((fitem) =>
                  fitem.addressId == selectshipadderss ? (
                    <>
                      <div className="fulladderss">
                        <small>Full Adders:</small>
                        <br />
                        <span>
                          {fitem.address1} {","} {fitem.address2} {","}{" "}
                          {fitem.city} {""} {fitem.state} {""} {fitem.country}{" "}
                          {""} {fitem.pincode}
                        </span>
                      </div>
                    </>
                  ) : (
                    ""
                  )
                )}
              </div>

              <br />

              <div className="shipping_adderss billing_adderss">
                <small>Select Billing Adderss</small>
                <br />
                <select className="sadderss" onChange={(e) => billing(e)}>
                  <option>--select--</option>
                  {billingadders.map((sitem, id) => {
                    return (
                      <option
                        key={id}
                        value={sitem.addressId}
                        {...sitem.addressTypeId}
                      >
                        <small>{sitem.addressName}</small>
                      </option>
                    );
                  })}
                </select>
                {billingadders.map((fitem) =>
                  fitem.addressId == selectbillingadderss ? (
                    <>
                      <div className="fulladderss">
                        <small>Full Adders:</small>
                        <br />
                        <span>
                          {fitem.address1} {","} {fitem.address2} {","}{" "}
                          {fitem.city} {""} {fitem.state} {""} {fitem.country}{" "}
                          {""} {fitem.pincode}
                        </span>
                      </div>
                    </>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>

            <div className="order_bnt">
              <button className="placeorder_bnt" onClick={placeorder}>
                Place Order
              </button>
            </div>
          </>
        )}

        <p>
          {orderfail ? (
            <p className="emptycart">
              <center>
                Order Failed PLease try Again <br />
                <Link to="/">Home</Link>
              </center>
            </p>
          ) : (
            ""
          )}
        </p>
      </div>
    </>
  );
};
export default Cart;
