import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import img from "../images/img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
  newcart,
} from "../Slices/counterSlice";

import { useParams } from "react-router-dom";
import Header_two from "./Header_two";
import { URL } from "./Apis";
import Pagination from "./Pagination";
const Home = (props) => {
  let navigate = useNavigate();
  const count_new = useSelector((state) => state.counter.cartnew);
 // console.log(count_new);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
  const { uid } = useParams();
  const { cat_name, company } = useParams();
  const companyname = company.split("company=");
  const company_name = companyname[1];
  const cat_id = uid.split("cat_id=");
  console.log(cat_id[1]);
  const catname = cat_name.split("cat_name=");

  const category_name = catname[1];

  const [products, setProducts] = useState([]);
  const [productsunits, setProductsunits] = useState([]);

  const [finalamount, setFinalamount] = useState();
  const [cart, setCart] = useState([]);
  const [unitname, setUnitname] = useState("");
  const [unitid, setUnitid] = useState();
  const [unitidtwo, setUnitidtwo] = useState();
  const [money, setMoney] = useState(0);
  const [selected, setSelected] = useState();
  const [packSizeUnits, setPackSizeUnits] = useState();
  const [packSize, setPackSize] = useState();
  const [quntity, setQuntity] = useState();
  const [billingPrice, setbillingPrice] = useState();
  const [mrp, setMrp] = useState();
  const [newprod, setNewprod] = useState([]);
  const [units, setUnits] = useState(1);
  const [quantityerror, setQuantityerror] = useState(false);
  const [productuniterror, setProductuniterror] = useState(false);
  const [productcheck, setProductcheck] = useState(false);
  const [perpage, setPerpage] = useState([]);
  const [selPageNum, setSelPageNum] = useState(1);
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    fetch(`${URL}/api/v1/products/${cat_id[1]}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        const res = json.map((item) => {
          return {
            ...item,
            quantity: 0,
            product_image:
              "https://srikarseeds.s3.ap-south-2.amazonaws.com/images/srikargold.png",
          };
        });
        setProducts(res);
        setPerpage(res.slice(0, 20));
      });
  }, [0]);

  useEffect(() => {
    fetch(`${URL}/api/v1/productunits/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => setProductsunits(json));
  }, [0]);

  //console.log(productsunits);

  const selectmrp = (id, e) => {
    var uname = e.target.value;
    setSelected(id);
    getmoney(uname);
  };

  function getmoney(uname) {
    productsunits
      .filter((item) => item.productUnitId == uname)
      .map((fname) => {
        setMoney(fname.mrp);
        setUnitid(fname.productUnitId);
        setUnitidtwo(fname.productUnitId);
        setPackSizeUnits(fname.packSizeUnits);
        setPackSize(fname.packSize);
        setQuntity(fname.noOfPiecesPerCase);
        setbillingPrice(fname.billingPrice);
        setMrp(fname.mrp);

        if (selected === fname.productId) {
          setUnitid(fname.productUnitId);
          setbillingPrice(fname.billingPrice);
        }
      });
  }




  const setIncrement = (index) => {
    const newitems = [...perpage];
    newitems[index].quantity += 1;
    setPerpage(newitems);
  };

  const setDescriment = (index) => {
    const newitems = [...perpage];
    if (newitems[index].quantity !== 0) newitems[index].quantity -= 1;
    setPerpage(newitems);
  };

  const pageHandler = (pageNumbers) => {
    setSelPageNum(pageNumbers);
    setPerpage(products.slice(pageNumbers * 20 - 20, pageNumbers * 20));
  };

  const additem = (
    e,
    units,
    pname,
    billingPrice,
    packSizeUnits,
    packSize,
    qunty,
    p_image,
    productid
  ) => {
    const ProductID = e.target.value;

    setProductuniterror(false);
    setProductcheck(false);
    setQuantityerror(false);
    if (ProductID === "" || ProductID === undefined) {
      setProductuniterror(true);
      return;
    }

    setQuantityerror(false);
    if (qunty === 0) {
      setQuantityerror(true);
      return;
    }
    if (count_new.find((check) => check.products === ProductID)) {
      setProductcheck(true);
      return;
    }

    const cart_list = {
      products: ProductID,
      quantity: qunty,
      productname: pname,
      billingPrice: billingPrice,
      packunit: packSizeUnits,
      packsize: packSize,
      product_img: p_image,
      productid: productid,
    };

    //console.log(cart_list);
    // setCart([...cart, cart_list]);
    dispatch(newcart(cart_list));
    dispatch(increment());
  };

  return (
    <>
      <div className="Header">
        <Row className="section-row">
          <Col lg={6}>
            <Link to="/">
              <span className="logout">Logout</span>
            </Link>
            <div className="logo">
              <img src={logo} alt="logo"></img>
            </div>
            <div>
              <div className="carticon">
                <NavLink to="/Cart" className="cartlink">
                  Cart
                </NavLink>
                <span className="countvalue"> {count} </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="section">
        <div className="navheader">
          <ul>
            <li>
              <p onClick={() => navigate(-1)}>Home</p>
            </li>
          </ul>
        </div>

        <div className="producttitle">
          {companyname} <i class="fas fa-greater-than"></i> {category_name}
        </div>
        <Row>
          <Col lg={12}>
            <div className="search">
             
              {/* <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
                placeholder="Search"
              ></input> */}

            </div>
            <div className="productDetails">
              <div className="product_images">
                <Row>
                  {quantityerror ? (
                    <p className="quntityerror">Please Select Quantity</p>
                  ) : (
                    ""
                  )}
                  {productuniterror ? (
                    <p className="quntityerror">Please Select Product</p>
                  ) : (
                    ""
                  )}

                  {productcheck ? (
                    <p className="quntityerror">Product already Added</p>
                  ) : (
                    ""
                  )}
                  <Col lg={6}>
                    {perpage
                      .filter((item ) =>
                        item.productName.toLowerCase().includes(search)
                      )
                      .map((item,idx) => (
                        <>
                          <div className="product-box">
                            <div className="product-img">
                              <img
                                className="p-img"
                                src={`https://srikarseeds.s3.ap-south-2.amazonaws.com/images/products/${item.productId}.png`}
                                //src={item.product_image}
                              ></img>
                            </div>
                            <div className="product-details">
                              <p className="p-title">{item.productName}</p>

                              <select
                                className="product-select"
                                onChange={(e) => selectmrp(item.productId, e)}
                              >
                                <option>--Select--</option>
                                {productsunits.map((item2) =>
                                  item2.productId === item.productId ? (
                                    <option value={item2.productUnitId}>
                                      {item2.packSize} {item2.packSizeUnits}
                                      &#x20B9;{item2.mrp}
                                    </option>
                                  ) : (
                                    ""
                                  )
                                )}
                              </select>

                              <div className="p-details">
                                <span>{finalamount}</span>
                                <div className="add">
                                  <button
                                    className="units_inc"
                                    value={item.quantity}
                                    onClick={() => setIncrement(idx)}
                                  >
                                    +
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button
                                    className="units_inc"
                                    value={item.quantity}
                                    onClick={() => setDescriment(idx)}
                                  >
                                    -
                                  </button>
                                </div>
                                <div className="addtocart">
                                  <button
                                    value={unitid}
                                    onClick={(e) =>
                                      additem(
                                        e,
                                        units,
                                        item.productName,
                                        mrp,
                                        packSizeUnits,
                                        packSize,
                                        item.quantity,
                                        item.product_image,
                                        item.productId
                                      )
                                    }
                                  >
                                    Add Cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    <div className="p-details">
                      <p className="product_title"></p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <center>
          <Pagination
            data={products}
            pageHandler={pageHandler}
            selPageNum={selPageNum}
          />
        </center>
      </div>
    </>
  );
};
export default Home;
