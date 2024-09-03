import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import Send from "./Pages/Send";

function App() {
  return <div>
    <Router>
      <Routes>
      <Route exact path="/" element={<SignUp/>}/>
      <Route  path="/signIn" element={<SignIn/>}/>
      <Route  path="/Dashboard" element={<Dashboard/>}/>
      <Route  path="/Send" element={<Send/>}/>
      </Routes>
    </Router>
  </div>
}

export default App
