import { StoreUser } from "types";
import {All} from '../actions/user'
import { SET_USER } from "redux/constants";


const initState:StoreUser={isLogin:false,msg:{}};
export default function userReducer(preState=initState,action:All):StoreUser{
    const {type,data} =action;
    switch(type){
        case SET_USER:
            return data
        default:
            const exhuastiveCheck:never = type;
            return preState
    }
}