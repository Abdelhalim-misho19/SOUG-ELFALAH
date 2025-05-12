import authReducer from "./reducers/authReducer";
import cardReducer from "./reducers/cardReducer";
import chatReducer from "./reducers/chatReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import homeReducer from "./reducers/homeReducer";
import orderReducer from "./reducers/orderReducer";
import bookingReducer from "./reducers/bookingReducer";
import notificationReducer from './reducers/notificationReducer';




const rootReducer = {
    home: homeReducer,
    auth: authReducer,

    card: cardReducer,
    order: orderReducer,
    booking: bookingReducer,
    dashboard: dashboardReducer,
    chat: chatReducer,
    notification: notificationReducer

}
export default rootReducer;