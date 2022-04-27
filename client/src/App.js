import React, { useState, useEffect } from "react";
import "./App.css";
import socket from "./utilities/socketConnection";

import Widget from "./components/widgets/Widget";

function App() {
  const [serverData, setPerformanceData] = useState({});
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    socket.on("data", (data) => {
      serverData[data.macA] = data;
      setPerformanceData(serverData);

      let widgets_ = [];

      Object.entries(serverData).forEach(([key, value]) => {
        widgets_.push(<Widget key={key} data={value} />);
      });

      setWidgets(widgets_);
    });
  }, [serverData]);

  return (
    <div className="head_gradient">
      <div className="App">
        <div class="ribbon">
          <a href="https://github.com/purhan/serstat/">Fork me on GitHub</a>
        </div>
        <img
          style={{ width: 200, marginTop: -5 }}
          src="./logo.png"
          alt="logo"
        />
        {widgets}
      </div>
    </div>
  );
}

export default App;
