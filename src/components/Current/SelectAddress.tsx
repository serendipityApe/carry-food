import React from 'react'
import {Picker} from 'antd-mobile';
// import AntTabBar from 'antd-mobile/lib/tab-bar';


interface State {
    pickerValue?:any[]
    
}
interface ItemLevel{
    value?:string,
    label?:string,
    children?:ItemLevel[]
}
export default class Index extends React.Component <any,State> {
    constructor(props:any){
        super(props);
        this.state={
            pickerValue: [],
        };
    }
 
    render(){
        let antdDistrict:any[] =[];
        let districtData = require('../../assets/location');
        Object.keys(districtData).forEach((index)=>{
            let itemLevel1:ItemLevel ={};
            let itemLevel2:ItemLevel ={};
            itemLevel1.value = districtData[index].code;
            itemLevel1.label = districtData[index].name;
            itemLevel1.children = [];
            let data = districtData[index].cities;
            Object.keys(data).forEach((index)=>{
                itemLevel2.value = data[index].code;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3:ItemLevel ={};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index)=>{
                    itemLevel3.value = index;
                    itemLevel3.label = data2[index];
                    itemLevel2.children!.push(itemLevel3);
                    itemLevel3 ={};
                });
                itemLevel1.children!.push(itemLevel2);
                itemLevel2 ={};
            });
            antdDistrict.push(itemLevel1)
        });
        return (
            <div>
                <Picker
                    title="选择地区"
                    extra="请选择"
                    data={antdDistrict}
                    value={this.state.pickerValue}
                    onChange={v => this.setState({ pickerValue: v })}
                    onOk={v => this.setState({ pickerValue: v })}
                >
                    {this.props.children}
                </Picker>
            </div>
        )
    }
}