import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WelcomeImg from "../img/welcome.svg";

const Welcome = () => {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="container" style={{ position: "relative" }}>
        <div className="row">
          <div
            className="col d-flex flex-column justify-content-center align-items-center"
            style={{ paddingTop: "50px" }}
          >
            <div>
              <img
                src={WelcomeImg}
                alt="welcome"
                style={{ width: "100%" }}
              ></img>
            </div>
            <p style={{ padding: "50px 0", fontSize: "32px" }}>
              이제 당신의 가치를 알아보세요!
            </p>
            <Button
              onClick={() => {
                navigate("/");
              }}
              style={{
                backgroundColor: "#2d4059",
                border: "none",
                fontSize: "24px",
              }}
            >
              메인페이지로 가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
