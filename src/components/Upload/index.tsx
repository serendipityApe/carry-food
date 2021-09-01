import React,{useRef} from 'react'
import './index.scss'
import axios from 'axios'
interface MutableObject<T>{
    [key:string]:T
}
interface Props{
    children?: JSX.Element[] | JSX.Element,
    action?: string,
    name?: string,  //默认为文件名
    method?: string,  //默认为post
    data?:MutableObject<string>,  //上传时额外的参数
    hearder?:MutableObject<string>,
    handleSuccess?: Function
}
export default function Upload(props:Props) {
    const input = useRef<HTMLInputElement>(null);
    function trigger(){
        (input.current as HTMLInputElement).click();
    }
    function onChange(){
        let myFile=input.current!.files![0];
        console.log(myFile)
        let formData=new FormData();

        formData.append(props.name ? props.name : myFile.name,myFile);
        if(props.data){
            for(let key in props.data){
                formData.append(key,props.data[key]);
            }
        }
        
        
        let headers:MutableObject<string>={};
        if(props.hearder){
            for(let key in props.hearder){
                headers[key]=props.hearder[key];
            }
        }
        let config={headers};
        if(props.action && props.action!== ''){
            axios.post(props.action,formData,config).then((response)=>{
                if(props.handleSuccess){
                    props.handleSuccess(response,myFile);
                }else{
                    console.log(response);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    return (
        <div className="w-upload" onClick={trigger}>
            <input type="file" onChange={onChange} ref={input} className="w-inner-input" />
            {props.children}
        </div>
    )
}
