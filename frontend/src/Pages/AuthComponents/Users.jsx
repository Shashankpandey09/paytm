import { useState } from "react";
import Button from "./Button";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Users = () => {
  // Replace with backend call
  const navigate=useNavigate();
  const [users, setUsers] = useState([
    {
      firstName: "Shashank",
      lastName: "Pandey",
      _id: 1,
    },
    {
        firstName: "Shashank",
        lastName: "Pandey",
        _id: 2,
      }
  ]);

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-md">
      <div className="font-bold text-lg mb-4">Users</div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-4">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
      <div className="flex items-center">
        <div className="h-12 w-12 bg-slate-300 flex justify-center items-center rounded-full text-xl font-semibold text-white">
          {user.firstName[0]}
        </div>
        <div className="ml-4 text-lg font-medium uppercase">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <Button label="Send Money" onClick={()=>navigate(`/Send?${userId}&${user.firstName}`)} />
    </div>
  );
}

export default Users;
