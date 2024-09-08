import { BottomWarning } from "./AuthComponents/BottomWarning";
import Button from "./AuthComponents/Button";
import Heading from "./AuthComponents/Heading";
import { InputBox } from "./AuthComponents/InputBox";
import SubHeading from "./AuthComponents/SubHeading";
import { useEffect, useState } from "react";
import { SIGNUP } from "../Slices/SignUp";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "../toastConfig";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data:{token}, status, error } = useSelector((store) => store.signup);

  useEffect(() => {
  
    if (status === "succeeded" && token) {
      toast.success("Signed up successfully!");
      const id = setTimeout(() => navigate('/dashboard'), 1000);
      return () => clearTimeout(id);
    }

    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, token, error]);

  const handleSignUp = () => {
    if (!firstName || !lastName || !Email || !password) {
      toast.error("All fields are required!");
      return;
    }
    const data={ firstName, lastName, username: Email, password }
    dispatch(SIGNUP([data,{type:"signup"}]));
  };

  return (
    <div className="bg-gray-400 h-screen w-screen flex items-center justify-center">
      <div className="w-96 h-3/4 bg-white rounded-md">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox label={"First Name"} type={"text"} placeholder={"First Name"} onChange={(e) => setFirstName(e.target.value)} />
        <InputBox label={"Last Name"} type={"text"} placeholder={"Last Name"} onChange={(e) => setLastName(e.target.value)} />
        <InputBox label={"Email"} type={"email"} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} />
        <InputBox label={"Password"} type={"password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} />
        <Button label={"Sign Up"} onClick={handleSignUp} />
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signIn"} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
