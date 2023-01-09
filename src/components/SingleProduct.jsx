import React from "react";
import { Button, Card } from "react-bootstrap";
import { CartState } from "../context/Context";
import { ACTIONS } from "../context/Reducer";
import Rating from "./Rating";

const SingleProduct = ({ product }) => {
  const {
    dispatch,
    state: { cart },
  } = CartState();

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>£ {Math.trunc(product.price)}</span>
            {product.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>
          {!cart.some((item) => item.id === product.id) ? (
            <Button
              disabled={!product.inStock}
              onClick={() =>
                dispatch({ type: ACTIONS.addCart, payload: product })
              }
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={()=>dispatch({
                type: ACTIONS.removeCart,
                payload: product.id,
              })}
            >
              Remove from Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
