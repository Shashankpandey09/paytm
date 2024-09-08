import { useDispatch, useSelector } from "react-redux";
import { BottomWarning } from "./AuthComponents/BottomWarning";
import Button from "./AuthComponents/Button";
import Heading from "./AuthComponents/Heading";
import { InputBox } from "./AuthComponents/InputBox";
import SubHeading from "./AuthComponents/SubHeading";
import { useEffect, useState } from "react";
import { SIGNUP } from "../Slices/SignUp";
import { ToastContainer, toast } from "../toastConfig";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: { token },
    status,
  } = useSelector((s) => s.signup);

  useEffect(() => {
    if (token && status === "succeeded") {
      toast.success("Signed in successfully!");
      const id = setTimeout(() => navigate("/dashboard"), 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [token,status]);

  const handleSignIn = () => {
    const data = { username: Email, password };
    dispatch(SIGNUP([data, { type: "signIn" }]));
  };

  return (
    <div className="bg-gray-400 h-screen w-screen flex items-center justify-center ">
      <div className=" w-96 h-1/2 bg-white rounded-md">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox
          label={"Email"}
          type={"email"}
          placeholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label={"Sign In"} onClick={handleSignIn} />
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign Up"}
          to={"/"}
        />
        <ToastContainer />
      </div>
    </div>
  );
};
export default SignIn;
