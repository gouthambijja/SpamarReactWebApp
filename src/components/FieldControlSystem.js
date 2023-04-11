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

function Spamars() {
  const SpamarsContainerRef = useRef(null);
  const [checkloading, setcheckLoading] = useState(false);
  const dispatch = useDispatch();
  const Spamars = useSelector((store) => store.Spamar.Spamars);
  const user = useSelector((store) => store.user.userId);

  const [waterLevel, setWaterLevel] = useState(16);
  const [flameStatus, setFlamestatus] = useState(false);
  const [humidityStatus, setHumidityStatus] = useState(0);
  const [waterPumpStatus, setWaterPumpStatus] = useState(false);

  const sendMail = () => {
    window.Email.send({
      SecureToken: "f539452d-6b27-4150-b0e2-44ee5ceb5be9",
      To: "bijjagoutham@gmail.com",
      From: "goutham.1904f3@gmail.com",
      Subject: "EMERGENCY - Fire detected at the field! ",
      Body: `Flame detected at ${new Date()}`,
    }).then((message) => console.log(message));
  };

  const waterLevelStyle = {
    height: `${waterLevel}%`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.4rem",
  };
  const humidityStyle = {
    height: `${humidityStatus}%`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.4rem",
  };
  useEffect(() => {
    if (flameStatus) sendMail();
  }, [flameStatus]);
  useEffect(() => {
    const dbRef = ref(db);
    var x = onValue(dbRef, (snapshot) => {
      setWaterLevel(snapshot.child(`${user.id}SoilMoisture`).val());
      setFlamestatus(snapshot.child(`${user.id}Flame`).val());
      setHumidityStatus(snapshot.child(`${user.id}Humidity`).val());
    });
    if (waterLevel <= 10) setWaterPumpStatus(true);
    else setWaterPumpStatus(false);
  }, [waterLevel]);

  //--------------------------
  return (
    <div className="SpamarsOuterContainer">
      <div className="sideBar"></div>
      <div ref={SpamarsContainerRef} className="SpamarsContainer">
        <Container>
          <>{checkloading ? "loading..." : "Spamar"}</>
          <ul className="SpamarsContainer-ul">
            <li className="SpamarCard">
              {" "}
              <div className="SpamarTitle">{"Soil Moisture"}</div>
              <div className="SpamarContent">
                <div className="SpamarContentSoilMoistureMeasure ">
                  <div className="waterContent" style={waterLevelStyle}>
                    {waterLevel}%
                  </div>
                </div>
                <div className="SpamarContentWaterMotor">
                  <div className="SpamarContentSoilMoistureDescription">
                    {/* moisture &lt;10 - Dry soil <br></br>
                    moisture &gt; 10,moisture &lt;60 - suitable for agriculture{" "}
                    <br></br>
                    moisture &gt; 60 , Over Moistured */}
                    <h2>
                      {waterLevel <= 10
                        ? "Soil is dry"
                        : waterLevel > 10 && waterLevel <= 60
                        ? "Moisture is suitable for agriculture"
                        : "Over Moistured"}
                    </h2>
                  </div>
                  <div className="SpamarContentMotorPump">
                    <h3>Motor Pump</h3>
                    <h1>{waterPumpStatus ? "On" : "off"}</h1>
                  </div>
                </div>
              </div>
            </li>
            <li className="SpamarCard">
              {" "}
              <div className="SpamarTitle">{"Fire Monitor "}</div>
              {!flameStatus ? (
                <div className="SpamarContent fireMonitorLayout">
                  {<h1>{`NO FLAME`}</h1>}
                </div>
              ) : (
                <div className="SpamarContent fireMonitorContent fireMonitorLayout">
                  <h1>{`Fire Sensed Alert!!!!`}</h1>
                </div>
              )}
            </li>
            <li className="SpamarCard">
              {" "}
              <div className="SpamarTitle">{"Humidity Percentage"}</div>
              <div className="SpamarContent">
                <div className="SpamarContentSoilMoistureMeasure humiditybg">
                  <div className="waterContent humidity" style={humidityStyle}>
                    {humidityStatus}%
                  </div>
                </div>
                <div className="SpamarContentWaterMotor">
                  <div className="SpamarContentSoilMoistureDescription">
                    <h2>
                      {humidityStatus < 70
                        ? "Humidity is Suitable for agriculture"
                        : humidityStatus >= 70 && humidityStatus < 100
                        ? "Chances are more to rain"
                        : "It's Raining"}
                    </h2>
                  </div>
                  <div className="SpamarContentMotorPump"></div>
                </div>
              </div>
            </li>
          </ul>
        </Container>
      </div>
    </div>
  );
}

export default Spamars;
