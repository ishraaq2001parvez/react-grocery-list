
import React,{useState,useEffect} from 'react';

function Alert({type,msg,removeAlert,list}){
	useEffect(()=>{
		let timeout=setTimeout(()=>{removeAlert()},2000);
		return ()=>clearTimeout(timeout);
	},[list])
	return <h6 className={`alert alert-${type}`}>{msg}</h6>
}

export default Alert;