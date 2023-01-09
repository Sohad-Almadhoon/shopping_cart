import React from "react";
import {
  Badge,
  Container,
  FormControl,
  Navbar,
  Dropdown,
  Nav,
  Button,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { ACTIONS, FILTER_ACTIONS } from "../context/Reducer";
const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="search a product"
            className="m-auto"
            onChange={(e)=>productDispatch({type:FILTER_ACTIONS.search , payload:e.target.value})}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge bg="">{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {!cart.length ? (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              ) : (
                <div>
                  {cart.map((item) => (
                    <span key={item.id} className="cartitem">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cartItemImg"
                      />
                      <div className="cartItemDetail">
                        <span>{item.name}</span>
                        <span>£ {Math.trunc(item.price)}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: ACTIONS.removeCart,
                            payload: item.id,
                          })
                        }
                      />
                    </span>
                  ))}
                    <Link to="/cart">
                        <Button style={{width:"95%",margin:"0 10px"}}>Go To Cart</Button>
                    </Link>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
