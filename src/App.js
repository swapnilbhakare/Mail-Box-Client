import React from "react";
import { Route, Switch } from "react-router-dom"; // Import BrowserRouter
import { useSelector } from "react-redux";
import "./App.css";
import Inbox from "./Components/Pages/Inbox/Inbox";
import Layout from "./Components/Layout/Layout";
import MessageDetail from "./Components/Pages/Inbox/MessageDetail";
import Authentication from "./Components/Auth/Authentication";
import Sent from "./Components/Pages/sent/sent";
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
            <Route path="/sent">
              <Layout isLoggedIn={isLoggedIn}>
                <Sent />
              </Layout>
            </Route>
            <Route path="/inbox">
              <Layout isLoggedIn={isLoggedIn}>
                <Inbox />
              </Layout>
            </Route>
            <Route path="/email/:id">
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
