import React from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import { FILTER_ACTIONS } from "../context/Reducer";
import Rating from "./Rating";

const Filter = () => {
  const {
    productDispatch,
    productState: { byStock, byFastDelivery, byRating, sort},
  } = CartState();
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({ type: FILTER_ACTIONS.sort, payload: "lowToHigh" })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({ type: FILTER_ACTIONS.sort, payload: "highToLow" })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() => productDispatch({ type: FILTER_ACTIONS.stock })}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast DeliveryOnly"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() => productDispatch({ type: FILTER_ACTIONS.delivery })}
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating:</label>
        <Rating
          rating={byRating}
          style={{ cursor: "pointer" }}
          onClick={(i) => {
            productDispatch({ type: FILTER_ACTIONS.rate, payload: i + 1 });
          }}
        />
      </span>
      <Button
        variant="light"
        onClick={() => productDispatch({ type: FILTER_ACTIONS.clear })}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filter;
