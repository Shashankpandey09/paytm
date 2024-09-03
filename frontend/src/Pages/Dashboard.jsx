import Appbar from "./AuthComponents/Appbar";
import Balance from "./AuthComponents/Balance";
import Users from "./AuthComponents/Users";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <div className="w-3/4 mx-auto mt-8">
        <Balance value={1000} />
        <Users />
      </div>
    </div>
  );
}

export default Dashboard;
