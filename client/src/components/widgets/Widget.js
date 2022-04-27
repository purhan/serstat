import React, { useState, useEffect } from "react";

import Cpu from "../Cpu";
import Memory from "../Memory";
import Info from "../Info";

export default function Widget(props) {
  const [serverData, setPerformanceData] = useState({});

  useEffect(() => {
    setPerformanceData(props.data);
  }, [props.data]);

  const {
    freeMem,
    totalMem,
    memUsage,
    osType,
    uptime,
    cpuModel,
    cpuSpeed,
    numCpus,
    cpuLoad,
    usedMem,
    macA,
  } = serverData;

  const mem = { freeMem, totalMem, memUsage, usedMem };
  const info = { osType, uptime, cpuModel, cpuSpeed, numCpus, macA };
  const cpu = { cpuLoad, numCpus, cpuSpeed, cpuModel };

  return (
    <div className="widget_main">
      <div className="widget_wrapper">
        <Memory memData={mem} className="widget" />
        <Info infoData={info} className="widget" />
        <Cpu cpuData={cpu} className="widget" />
      </div>
    </div>
  );
}
