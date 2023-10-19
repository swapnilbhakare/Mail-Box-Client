import React from "react";
import { Route, Switch } from "react-router-dom"; // Import BrowserRouter
import { useSelector } from "react-redux";
import "./App.css";
import Inbox from "./Components/Pages/Inbox/Inbox";
import Layout from "./Components/Layout/Layout";
import MessageDetail from "./Components/Email/MessageDetails/MessageDetail";
import Authentication from "./Components/Auth/Authentication";
import Sent from "./Components/Pages/Sent/Sent";
import Trash from "./Components/Pages/Trash/Trash";
function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Authentication />
        </Route>
        {isLoggedIn && (
          <>
            <Route path="/Sent">
              <Layout isLoggedIn={isLoggedIn}>
                <Sent />
              </Layout>
            </Route>
            <Route path="/inbox">
              <Layout isLoggedIn={isLoggedIn}>
                <Inbox />
              </Layout>
            </Route>
            <Route path="/trash">
              <Layout isLoggedIn={isLoggedIn}>
                <Trash />
              </Layout>
            </Route>
            <Route path="/message/:source/:id">
              <Layout isLoggedIn={isLoggedIn}>
                <MessageDetail />
              </Layout>
            </Route>
          </>
        )}
      </Switch>
    </div>
  );
}

export default App;
