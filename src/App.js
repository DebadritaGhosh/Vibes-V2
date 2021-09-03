import React from "react";
import './App.scss';
import LoginScreen from "./screens/loginScreen/LoginScreen";
import PlayerScreen from "./screens/PlayerScreen/PlayerScreen";

const App = () => {
  return (
    <div className="app">
      {/* <LoginScreen /> */}
      <PlayerScreen />
    </div>
  );
}

export default App;
