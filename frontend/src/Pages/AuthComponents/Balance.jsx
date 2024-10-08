import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Balance = () => {
  const [balance,setBalance]=useState(0);
  const {token}=useSelector(s=>s.signup.data)
  const {result}=useSelector(s=>s.transfer)
  const BASE_URL=import.meta.env.VITE_REACT_APP_BACKEND_URL
  useEffect(()=>{
    const getBal=async()=>{
   try {
    const res=await axios.get(`${BASE_URL}/api/v1/account/`,{
      headers:{
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token} ` 
      }
    });
    setBalance((bal)=>
    bal=res.data.balance);
   } catch (error) {
    console.log(error);
   }
    
  
}
getBal();
  },[result])
    return (
      <div className="flex items-center  pt-4 mt-6">
        <div className="font-bold text-lg">
          Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
          Rs {balance&&balance}
        </div>
      </div>
    );
  }
  
  export default Balance;
  