import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../components/Home";
import Client from "../components/Client";
import Server from "../components/Server";
import Dashboard from "../components/Dashboard";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import MessageForm from "../components/MessageForm";
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/client" component={Client} />
        <Route path="/server" component={Server} />

        <Route exact path="/addMessage" component={MessageForm} />
      </div>
    </Router>
  );
}

export default App;
