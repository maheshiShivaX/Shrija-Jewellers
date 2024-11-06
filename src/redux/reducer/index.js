import { ADD_TO_CART, DECREMENT, INCREMENT, REMOVE_ITEM, TOGGLE_CART, GET_ALL_CART_DATA } from "../action/actionTypes";

const initialState = {
    isCartOpen: false,
    cart: []
};

const cartReducer = (state = initialState, action) => {
    const cart = Array.isArray(state.cart) ? state.cart : [];

    switch (action.type) {
        case GET_ALL_CART_DATA:
            return {
                ...state,
                cart: Array.isArray(action.payload) ? action.payload : [] 
            };

        case TOGGLE_CART:
            return {
                ...state,
                isCartOpen: action.payload
            };

            case ADD_TO_CART: {
                const itemExist = cart.find(item => item.productId === action.payload.productId);
            
                if (!itemExist) {
                    return {
                        ...state,
                        cart: [...cart, { ...action.payload, quantity: 1 }]
                    };
                } else {
                    return {
                        ...state,
                        cart: cart.map(item => 
                            item.productId === action.payload.productId
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    };
                }
            }

        case REMOVE_ITEM:
            return {
                ...state,
                cart: cart.filter(item => item.id !== action.payload)
            };

        case INCREMENT:
            return {
                ...state,
                cart: cart.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    } else {
                        return item;
                    }
                })
            };

        case DECREMENT:
            return {
                ...state,
                cart: cart.map(item => {
                    if (item.id === action.payload) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    } else {
                        return item;
                    }
                }).filter(item => item.quantity > 0) // Keep items with quantity > 0
            };

        default:
            return state;
    }
};

export default cartReducer;