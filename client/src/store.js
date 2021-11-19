import {combineReducers,applyMiddleware, createStore,compose} from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer, } from './reducers/userReducer';   

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer
});


const userInfoFromStorage = localStorage.getItem('userInfo')? 
JSON.parse(
    localStorage.getItem('userInfo'))
    :null


const initialState={
    
    userLogin: {userInfo: userInfoFromStorage}
    
};

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState, 
    composeEnhancers(applyMiddleware(thunk))
)

export default store


