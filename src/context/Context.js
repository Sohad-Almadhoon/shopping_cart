import React, { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { cartReducer, filterReducer } from "./Reducer";
faker.seed(99);
const products = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
}));
export const CartContext = createContext();
const initialState = {
  products,
  cart: [],
};
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [productState, productDispatch] = useReducer(filterReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });
  return (
    <CartContext.Provider
      value={{ state, dispatch, productState, productDispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default Context;
export const CartState = () => {
  return useContext(CartContext);
};

