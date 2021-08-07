
import Login from '../pages/Login';
import PageNotFound from '../pages/pageNotFound'
import Index from '../pages/Index'

type Router ={
    path:string,
    component:any,
    exact?:boolean}[]
export const mainRouter:Router = [
    {
        path:'/login',
        component: Login
    },
    {
        path:'/404',
        component: PageNotFound
    }
]
export const appRouter:Router =[
    {
        path: '/index',
        component: Index
    }
]