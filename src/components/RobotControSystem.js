import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./FirebaseDB";
import {
  getDatabase,
  get,
  ref,
  set,
  child,
  update,
  remove,
  onValue,
} from "firebase/database";
import { async } from "@firebase/util";

function RobotControlSystem() {
  const [ip, setIp] = useState("");
  useEffect(() => {
    setIp(prompt("enterIP"));
  }, []);
  console.log(ip);
  const SpamarsContainerRef = useRef(null);
  const [grassCutterInput, setGrassCutterInput] = useState("off");
  const [plougherInput, setPlougherInput] = useState("off");
  const [seedSowerInput, setSeedSowerInput] = useState("off");
  const [automatedMotionControl, setAutomatedMotionControl] = useState("off");
  useEffect(() => {
    (async () => {
      await fetch(`http://${ip}/?grasscutter=${grassCutterInput}`, {
        mode: "no-cors",
      });
    })();
  }, [grassCutterInput]);
  useEffect(() => {
    (async () => {
      await fetch(`http://${ip}/?plougher=${plougherInput}`, {
        mode: "no-cors",
      });
    })();
  }, [plougherInput]);
  useEffect(() => {
    (async () => {
      await fetch(`http://${ip}/?seedsower=${seedSowerInput}`, {
        mode: "no-cors",
      });
    })();
  }, [seedSowerInput]);
  useEffect(() => {
    (async () => {
      await fetch(`http://${ip}/?motioncontrol=${automatedMotionControl}`, {
        mode: "no-cors",
      });
    })();
  }, [automatedMotionControl]);
  //--------------------------
  return (
    <div className="SpamarsOuterContainer">
      <div className="sideBar"></div>
      <div ref={SpamarsContainerRef} className="SpamarsContainer">
        <div className="RobotControlSystem">
          <div className="OperationControl">
            <div className="automatedFunction grassCutter">
              <div className="automatedFunctionTop">
                <div className="automatedFunctionTopLeft"></div>
                <div className="automatedFunctionTopRight">
                  <input
                    type="checkbox"
                    id="grassCutterInput"
                    name="grasscutter"
                    value={grassCutterInput}
                    onClick={async (e) => {
                      if (grassCutterInput == "on") {
                        setGrassCutterInput("off");
                      } else {
                        setGrassCutterInput("on");
                      }
                    }}
                  />
                </div>
              </div>
              <div className="automatedFunctionBottom">Grass Cutter</div>
            </div>
            <div className="automatedFunction seedSower">
              <div className="automatedFunctionTop">
                <div className="automatedFunctionTopLeft"></div>
                <div className="automatedFunctionTopRight">
                  <input
                    type="checkbox"
                    id="seedSowerInput"
                    onClick={async (e) => {
                      if (seedSowerInput == "on") {
                        setSeedSowerInput("off");
                      } else {
                        setSeedSowerInput("on");
                      }
                    }}
                  />
                </div>
              </div>
              <div className="automatedFunctionBottom">Seed Sower</div>
            </div>
            <div className="automatedFunction plougher">
              <div className="automatedFunctionTop">
                <div className="automatedFunctionTopLeft"></div>
                <div className="automatedFunctionTopRight">
                  {" "}
                  <input
                    type="checkbox"
                    id="plougherInput"
                    onClick={async (e) => {
                      console.log(plougherInput);
                      if (plougherInput == "on") {
                        setPlougherInput("off");
                      } else {
                        setPlougherInput("on");
                      }
                    }}
                  />
                </div>
              </div>
              <div className="automatedFunctionBottom">Plougher</div>
            </div>
          </div>
          <div className="MotionControl">
            <div className="MotionControlManual">
              <div
                className="MotionControlManualSubOne"
                onClick={async () => {
                  console.log("sharingan!");
                  await fetch(`http://${ip}/?direction=forward`, {
                    mode: "no-cors",
                  });
                }}
              ></div>
              <div className="MotionControlManualSubTwo">
                <div
                  className="MotionControlManualSubTwoLeft"
                  onClick={async () => {
                    await fetch(`http://${ip}/?direction=left`, {
                      mode: "no-cors",
                    });
                  }}
                ></div>
                <div
                  className="MotionControlManualSubTwoRight"
                  onClick={async () => {
                    await fetch(`http://${ip}/?direction=right`, {
                      mode: "no-cors",
                    });
                  }}
                ></div>
              </div>
              <div
                className="MotionControlManualSubThree"
                onClick={async () => {
                  await fetch(`http://${ip}/?direction=backward`, {
                    mode: "no-cors",
                  });
                }}
              ></div>
            </div>
            <div
              className="StopControl"
              onClick={async () => {
                await fetch(`http://${ip}/?direction=stop`, {
                  mode: "no-cors",
                });
              }}
            >
              <h1>Stop</h1>
            </div>
            <div
              className="AutomatedMotionControl"
              onClick={async (e) => {
                if (automatedMotionControl == "on") {
                  setAutomatedMotionControl("off");
                } else {
                  setAutomatedMotionControl("on");
                }
              }}
            >
              <h1>Automated {automatedMotionControl}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RobotControlSystem;
