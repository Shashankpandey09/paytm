import { BottomWarning } from "./AuthComponents/BottomWarning"
import Button from "./AuthComponents/Button"
import Heading from "./AuthComponents/Heading"
import { InputBox } from "./AuthComponents/InputBox"
import SubHeading from "./AuthComponents/SubHeading"
import { useState } from "react"
const SignIn = () => {
  const[Email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  return (
    <div className="bg-gray-400 h-screen w-screen flex items-center justify-center ">
    <div className=" w-96 h-1/2 bg-white rounded-md">
      <Heading label={"Sign In"}/>
      <SubHeading label={"Enter your credentials to access your account"}/>
      <InputBox label={"Email"} type={"email"} placeholder={"Email"} onChange={(e)=>setEmail(e.target.value)}/>
      <InputBox label={"Password"} type={"password"} placeholder={"Password"} onChange={(e)=>setPassword(e.target.value)}/>
      <Button label={"Sign In"}  />
      <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/"}/>
    </div>
</div>
  )
}
export default SignIn