export const ACTIONS = {
  addCart: "ADD_TO_CART",
  removeCart: "REMOVE_FROM_CART",
  changeQuantity: "CHANGE_QUANTITY",
};
export const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.addCart:
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case ACTIONS.removeCart:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case ACTIONS.changeQuantity:
      return {
        ...state,
        cart: state.cart.filter((item) => {
          state.cart.length += item.quantity;
          return item.id === action.payload.id
            ? (item.quantity = action.payload.quantity)
            : item.quantity;
        }),
      };

    default:
      return state;
  }
};
export const FILTER_ACTIONS = {
  stock: "OUT_OF_STOCK",
  delivery: "FAST_DELIVERY",
  rate: "RATINGS",
  sort: "SORT_PRICES",
  search: "SEARCH",
  clear: "CLEAR_FILTERS",
};
export const filterReducer = (state, action) => {
  switch (action.type) {
    case FILTER_ACTIONS.sort:
      return {
        ...state,
        sort: action.payload,
      };
    case FILTER_ACTIONS.stock:
      return {
        ...state,
        byStock: !state.byStock,
      };
    case FILTER_ACTIONS.delivery:
      return {
        ...state,
        byFastDelivery: !state.byFastDelivery,
      };
    case FILTER_ACTIONS.rate:
      return {
        ...state,
        byRating: action.payload,
      };
    case FILTER_ACTIONS.search:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case FILTER_ACTIONS.clear:
      return {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
      };
    default:
      return state;
  }
};
