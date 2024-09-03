import { BottomWarning } from "./AuthComponents/BottomWarning"
import Button from "./AuthComponents/Button"
import Heading from "./AuthComponents/Heading"
import { InputBox } from "./AuthComponents/InputBox"
import SubHeading from "./AuthComponents/SubHeading"
import { useState } from "react"

const SignUp = () => {
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[Email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  return (
    <div className="bg-gray-400 h-screen w-screen flex items-center justify-center ">
        <div className=" w-96 h-3/4 bg-white rounded-md">
          <Heading label={"Sign Up"}/>
          {firstName}
          <SubHeading label={"Enter your information to create an account"}/>
          <InputBox label={"firstName"} type={"text"} placeholder={"firstName"} onChange={(e)=>setFirstName(e.target.value)}/>
          <InputBox label={"LastName"} type={"text"} placeholder={"lastName"} onChange={(e)=>setLastName(e.target.value)}/>
          <InputBox label={"Email"} type={"email"} placeholder={"Email"} onChange={(e)=>setEmail(e.target.value)}/>
          <InputBox label={"Password"} type={"password"} placeholder={"Password"} onChange={(e)=>setPassword(e.target.value)}/>
          <Button label={"Sign Up"}  />
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signIn"}/>
        </div>
    </div>
  )
}
export default SignUp