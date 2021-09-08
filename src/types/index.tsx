import { Store } from 'redux';
export interface StoreState extends Store{
    location:StoreLocation,
    user:StoreUser,
    random: StoreRandom
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

export interface StoreRandom{
    frequency:number,
    target:{
        [key:string]:string | number | object | []
    }
}