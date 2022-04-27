import React, { useEffect, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Memory(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [props.memData.totalMem]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="memory_main">
      <div className="mem_wrapper">
        <div className="mem_wrapper_main">
          <div className="mem_circle">
            <CircularProgressbarWithChildren
              value={props.memData.memUsage * 100}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#ffffffba",
                textColor: "#fff",
                pathColor: "#3f5896",
                trailColor: "#61616133",
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                style={{ width: 70, marginTop: -5 }}
                alt="ram"
                fill="currentColor"
                className="mem_icon"
              >
                <path d="M0 448h80v-32c0-8.838 7.164-16 16-16c8.838 0 16 7.162 16 16v32h96v-32c0-8.838 7.164-16 16-16c8.838 0 16 7.162 16 16v32h96v-32c0-8.838 7.164-16 16-16c8.838 0 16 7.162 16 16v32h96v-32c0-8.838 7.164-16 16-16c8.838 0 16 7.162 16 16v32H576v-96H0V448zM576 146.9V112C576 85.49 554.5 64 528 64h-480C21.49 64 0 85.49 0 112v34.94C18.6 153.5 32 171.1 32 192S18.6 230.5 0 237.1V320h576V237.1C557.4 230.5 544 212.9 544 192S557.4 153.5 576 146.9zM192 240C192 248.8 184.8 256 176 256h-32C135.2 256 128 248.8 128 240v-96C128 135.2 135.2 128 144 128h32C184.8 128 192 135.2 192 144V240zM320 240C320 248.8 312.8 256 304 256h-32C263.2 256 256 248.8 256 240v-96C256 135.2 263.2 128 272 128h32C312.8 128 320 135.2 320 144V240zM448 240C448 248.8 440.8 256 432 256h-32C391.2 256 384 248.8 384 240v-96C384 135.2 391.2 128 400 128h32C440.8 128 448 135.2 448 144V240z" />
              </svg>
            </CircularProgressbarWithChildren>
          </div>
          <div className="mem_data">
            <div className="cpu_data_perc">
              <span className="cpu_data_num">
                {props.memData.memUsage * 100}
              </span>
              <span className="cpu_data_num_per">%</span>
            </div>
            <div className="cpu_data_info">
              <div className="cpu_data_cpus">
                <span className="cpu_data_label">Total</span>
                <span className="cpu_data_data">
                  {((props.memData.totalMem / 1073741824) * 100) / 100} GB
                </span>
              </div>
              <div className="cpu_data_cpus">
                <span className="cpu_data_label">Used</span>
                <span className="cpu_data_data">
                  {Math.floor((props.memData.usedMem / 1073741824) * 100) / 100}{" "}
                  GB
                </span>
              </div>
              <div className="cpu_data_cpus">
                <span className="cpu_data_label">Free</span>
                <span className="cpu_data_data">
                  {Math.floor((props.memData.freeMem / 1073741824) * 100) / 100}{" "}
                  GB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
