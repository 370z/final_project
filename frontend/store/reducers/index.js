import {
    combineReducers
} from "redux";
// import {
//     fetchProductsReducer
// } from "./fetchProducts/fetchProductsReducer";
// import {
//     CartReducer
// } from "./cartReducer/CartReducer";
// import {
//     FilterProducts
// } from "./filterProducts/filterProducts";
import {
    LoginReducer,
    authReducer,
} from "./login/login";
export const rootReducer = combineReducers({
    // fetchProductsReducer,
    // CartReducer,
    // FilterProducts,
    LoginReducer,
    authReducer,
});