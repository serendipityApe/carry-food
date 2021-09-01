import React from 'react'

interface Props{
    __map__?:any,
    ToSelf:()=>void
}
export default function ToSelf(props:Props) {
    console.log(props)
    // const map=props.__map__;
    const style:React.CSSProperties={
        bottom: '150px',
        right: '10px',
        background: '#fff',
        padding: '10px',
        position: "absolute",
    }
    return (
        <div style={style}>
        <button onClick={props.ToSelf}>reset</button>
        </div>
    )
}
