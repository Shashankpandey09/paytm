import { useNavigate, useSearchParams } from "react-router-dom";
import { Transfer } from "../Slices/Transfer";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "../toastConfig";
import PaymentLoader from "./AuthComponents/PaymentLoader";

const SendMoney = () => {
  const InputRef = useRef(null);
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const id = query.get("id");
  const firstName = query.get("name");
  const { result, loading, error } = useSelector((s) => s.transfer);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer;

    if (loading) {
      setShowLoader(true);
      timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000); // Ensure loader is displayed for at least 1 second
    } else if (result) {
      // If result is available, show success message
      toast.success(result.message);
      timer = setTimeout(() => {
        navigate("/dashboard");
      }, 1000); // Wait to ensure loader displays at least 1 second
    } else if (error) {
      // If there's an error, show error message
      toast.error(error || "Server busy, try again.");
    }

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [loading, result, error, navigate]);

  const handleClick = () => {
    const inputValue = InputRef.current.value;

    // Input validation
    if (!inputValue || inputValue <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    dispatch(Transfer({ to: id, amount: Math.abs(inputValue) }));
  };

  return (
    <>
      {showLoader ? (
        <PaymentLoader />
      ) : (
        <div className="flex justify-center h-screen bg-gray-100">
          <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
              <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">A</span>
                  </div>
                  <h3 className="text-2xl font-semibold">
                    Friend's Name: {firstName}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none"
                      htmlFor="amount"
                    >
                      Amount (in Rs)
                    </label>
                    <input
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      id="amount"
                      placeholder="Enter amount"
                      ref={InputRef}
                    />
                  </div>
                  <button
                    onClick={handleClick}
                    className="justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-green-500 text-white"
                  >
                    Initiate Transfer
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendMoney;
