import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removePrev } from "../../Slices/Transfer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [debouncedValue, setDebouncedValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const BASE_URL=import.meta.env.VITE_REACT_APP_BACKEND_URL
  const {
    data: { token },
  } = useSelector((state) => state.signup);

  // Debounce effect for search input
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [inputValue]);

  // Fetch users based on search or fetch all users if search is empty
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true); // Set loading true before API call
      try {
        let url = `${BASE_URL}/api/v1/user/users`; // Default URL for all users
        if (debouncedValue) {
          url = `${BASE_URL}/api/v1/user/bulk?filter=${debouncedValue}`; // If searching, use filter
        }

        const resp = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
   
        setUsers(resp.data?.users || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Turn off loading
      }
    };

    getUsers();
  }, [debouncedValue, token]);

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-md max-w-screen mx-auto">
      <div className="font-bold text-lg mb-4">Users</div>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search users..."
          className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {users.length ? (
            users.map((user) => <User key={user._id} user={user} />)
          ) : (
            <div>No users found.</div>
          )}
        </div>
      )}
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
      <div className="flex items-center">
        <div className="h-12 w-12 bg-black flex justify-center capitalize items-center rounded-full text-xl font-semibold text-white">
          {user.firstName[0]}
        </div>
        <div>
        <div className="ml-4 text-lg font-medium uppercase ">
          {user.firstName} {user.lastName}
        </div>
        <span className="pl-2 opacity-40">{user.username}</span>
        </div>
       
       
      </div>
      <Button
        label="Send Money"
        onClick={() => {
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
          dispatch(removePrev());
        }}
        className="mt-4 sm:mt-0 sm:ml-4"
      />
    </div>
  );
}

export default Users;
