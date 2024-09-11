
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../Slices/SignUp";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import {toast, ToastContainer} from '../../toastConfig'
const Appbar = () => {
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const{user}=useSelector(s=>s.signup)
    return (
      <div className="pt-4 px-4  mx-auto">
        <ToastContainer/>
        <div className="shadow h-14 flex justify-between items-center mt-9 px-2 bg-white rounded-md">
          <div className="ml-4 text-lg font-semibold">
            PayTM App
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-lg font-medium">
              Hello
            </div>
            <div className="rounded-full uppercase h-12 w-12 bg-slate-200  mr-2 flex items-center justify-center text-xl font-semibold">
              {user &&user[0]}
            </div>
         <div className="mt-3" >
         <Button label={"logout"} onClick={()=>{toast.success("logged Out")
          dispatch(removeToken())
              navigate("/signIn")
            }}/>
         </div>
         
          </div>
        </div>
      </div>
    );
  }
  
  export default Appbar;
