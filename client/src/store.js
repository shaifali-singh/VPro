import {combineReducers,applyMiddleware, createStore,compose} from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer, } from './reducers/userReducer';   
import { createClassReducer } from './reducers/classReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    newClass : createClassReducer
});


const userInfoFromStorage = localStorage.getItem('userInfo')? 
JSON.parse(
    localStorage.getItem('userInfo'))
    :null

const newClassInfoFromStorage = localStorage.getItem('newClassInfo')?
    JSON.parse(localStorage.getItem('newClassInfo')) : null    

const initialState={
    
    userLogin: {userInfo: userInfoFromStorage},
    newClass : {newClassInfo: newClassInfoFromStorage}
     
};

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState, 
    composeEnhancers(applyMiddleware(thunk))
)

export default store


