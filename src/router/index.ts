
import Login from '../pages/Login';
import Login_ps from '../pages/Login/ps'
import PageNotFound from '../pages/pageNotFound'
import Index from '../pages/Index'
import Map from '../pages/Map'
import ShareMap from '../pages/ShareMap'
type Router ={
    path:string,
    component:any,
    exact?:boolean,
    routers?:object[]
}[]
export const mainRouter:Router = [
    {
        path:'/login',
        component: Login
    },
    {
        path:'/404',
        component: PageNotFound
    },
    {
        path:'/map',
        component: Map
    },
    {
        path: '/sharemap',
        component: ShareMap
    }
    
]
export const appRouter:Router =[
    {
        path: '/index',
        component: Index,
        routers:[
            
        ]
    },
    
]