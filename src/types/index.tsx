import { Store } from 'redux';
export interface StoreState extends Store{
    location:StoreLocation,
    user:StoreUser
}


export interface StoreLocation{
    ip:string,
    local:string,
    adcode:string
}

export interface StoreUser{
    isLogin:boolean,
    msg:{[key:string]:any}
}