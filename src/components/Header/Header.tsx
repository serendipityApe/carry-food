import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';

import Location from '../../containers/Location'
import SelectAddress from '../Current/SelectAddress'
import Avatar from 'components/Avatar/Avatar'
// import { MyIcon } from '../Current/MyIcon';
import Loca from '../../assets/imgs/location.svg'

export default class Header extends Component {
    render() {
        return (
            <div>
                <NavBar
                mode="light"
                icon={<img src={Loca} style={{width: '1.5rem'}} alt="logo"></img>}
                leftContent={<SelectAddress><Location/></SelectAddress>}
                rightContent={<Avatar></Avatar>}
                ></NavBar>
            </div>
        )
    }
}
