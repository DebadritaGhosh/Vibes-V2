import React, { useState } from "react";
import './App.scss';
//Importing Screens
import LoginScreen from "./screens/loginScreen/LoginScreen";
import PlayerScreen from "./screens/PlayerScreen/PlayerScreen";
//Importing Route
import { Route, Switch } from "react-router-dom";

const App = () => {
  const [userDetail, setUserDetail] = useState({
    name: '',
    id: 0,
    email: '',
    pic: ''
  });
  return (
    <div className="app">
      <Switch>
        <Route exact path="/login">
          <LoginScreen
            setUserDetail={setUserDetail}
            userDetail={userDetail}
          />
        </Route>
        <Route exact path="/">
          <PlayerScreen
            setUserDetail={setUserDetail}
            userDetail={userDetail} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
