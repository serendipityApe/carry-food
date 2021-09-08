import { useState, useEffect } from 'react'

import './index.scss'


import Header from '../../components/Header/Header'
import Random from 'containers/Random'

import axios from 'utils/axiosConfig';
interface Props {
    routers: object[],
    history: any
}

function Index(props: Props) {
    let { routers,history } = props;
    
    const randomProps={
        history
    }
    async function uploadToken() {
        let res = await axios.get("http://localhost:8081/uploadToken");
        try {
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        uploadToken()
    }, [])
    return (
        <div>
            {/*   //嵌套路由
            {routers.map((r: any) => {
                                return <Route key={r.path} exact={r.exact} path={r.path} component={r.component} />
                            })} */}
            <Header />
            <Random {...randomProps}/>
        </div>
    )
}
export default Index;