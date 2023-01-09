import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Rating from "./Rating";
import { ACTIONS } from "../context/Reducer";
import { AiFillDelete } from "react-icons/ai";

const CartPage = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [showTotal, setShowTotal] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, curr) => acc + Math.trunc(curr.price) * curr.quantity,
        0
      )
    );
  }, [cart]);
  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>{prod.name}</Col>
                <Col md={2}>£ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Select
                    type="input"
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONS.changeQuantity,
                        payload: { id: prod.id, quantity: e.target.value },
                      });
                    }}
                    value={prod.quantity}
                    style={{ cursor: "pointer" }}
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  {" "}
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: ACTIONS.removeCart,
                        payload: prod.id,
                      })
                    }
                  >
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                    />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        {showTotal && (
          <span style={{ fontWeight: 700, fontSize: 20 }}>Total £{total}</span>
        )}
        <Button
          type="button"
          disabled={cart.length === 0}
          onClick={() => setShowTotal(!showTotal)}
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
