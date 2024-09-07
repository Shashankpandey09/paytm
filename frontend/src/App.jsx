import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Send from "./Pages/Send";
import ProtectedRoutes from "./Pages/AuthComponents/ProtectedRoutes";

const protectedRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/send', element: <Send /> }];
function App() {
  return <div>
    <Router>
      <Routes>
      <Route exact path="/" element={<SignUp/>}/>
      <Route  path="/signIn" element={<SignIn/>}/>
      {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoutes element={route.element} />}
            />
          ))}
      </Routes>
    </Router>
  </div>
}

export default App
