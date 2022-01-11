import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RiLock2Fill } from "react-icons/ri";
import { SiCashapp } from "react-icons/si";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

const LoginPage = () => {
  let navigate = useNavigate();

  // cookie

  let csrf = new Cookies().get("XSRF-TOKEN");
  console.log(csrf);
  // end cookie

  // let dispatch = useDispatch();

  let [position, setPosition] = useState("");

  const [idCheck, SetidCheck] = useState(false);

  const [pwCheck, SetpwCheck] = useState(false);

  const idInput = document.getElementById("ID");
  const pwInput = document.getElementById("PW");
  const form = document.getElementById("form");

  const resetShow = () => {
    SetidCheck(false);

    SetpwCheck(false);
  };

  const checkValue = (input) => {
    console.log(input.value);

    return input.value;
  };

  let currentWidth = document.documentElement.clientWidth;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentWidth > 770) {
      setPosition("absolute");
    }
  }, [currentWidth]);

  window.addEventListener("resize", () => {
    let screenWidth = document.documentElement.clientWidth;

    if (screenWidth <= 770) {
      setPosition("");
    }

    if (screenWidth > 770) {
      setPosition("absolute");
    }
  });

  // resize screen

  let [flexdir, Setflexdir] = useState("row nowrap");

  useEffect(() => {
    if (currentWidth > 1100) {
      Setflexdir("row nowrap");
    }
    if (currentWidth <= 1100) {
      Setflexdir("column nowrap");
    }
  }, [flexdir, currentWidth]);

  window.addEventListener("resize", () => {
    let screenWidth = document.documentElement.clientWidth;

    if (screenWidth <= 1100) {
      Setflexdir("column nowrap");
    }

    if (screenWidth > 1100) {
      Setflexdir("row nowrap");
    }
  });

  ///end resize screen

  let LoginHead = styled("p")`
    font-size: 48px;
    width: 300px;
    border-bottom: 2px solid #2d4059;
  `;

  let Label = styled("span")`
    font-size: 48px;
    text-align: center;
    display: inline-block;
    width: 210px;
  `;

  let Warn = styled("p")`
    color: red;
  `;

  return (
    <div>
      <div className="container" style={{ position: "relative" }}>
        <div
          onClick={() => {
            navigate("/");
          }}
          style={{
            position: position,
            paddingTop: "80px",
            left: "80px",
            cursor: "pointer",
          }}
        >
          <SiCashapp
            style={{ color: "#EA5455", fontSize: "70px", margin: "0 20px" }}
          />
        </div>
        <div className="row">
          <form id="form" method="post" action="http://localhost:8181/login">
            <div
              className="col d-flex flex-column justify-content-center align-items-center"
              style={{ paddingTop: "80px" }}
            >
              <LoginHead>Login</LoginHead>
              <p>
                <RiLock2Fill style={{ fontSize: "48px" }} />
              </p>
              <p
                style={{
                  display: "flex",
                  width: "70%",
                  alignItems: "center",
                  paddingTop: "80px",
                  flexFlow: flexdir,
                }}
              >
                <Label>ID(Email)</Label>
                <input
                  id="ID"
                  name="username"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  style={{
                    width: "400px",
                    height: "50px",
                    fontSize: "20px",
                  }}
                />
              </p>
              {idCheck ? <Warn>이메일을 입력해주세요.</Warn> : null}
              <p
                style={{
                  display: "flex",
                  width: "70%",
                  alignItems: "center",
                  paddingTop: "30px",
                  flexFlow: flexdir,
                }}
              >
                <Label>PW</Label>
                <input
                  id="PW"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  style={{
                    width: "400px",
                    height: "50px",
                    fontSize: "20px",
                  }}
                />
              </p>
              {/* <input type="hidden" name="${_csrf.parameterName }" value="${_csrf.token }"/> */}
              {pwCheck ? <Warn>비밀번호를 입력해주세요.</Warn> : null}
              <p style={{ textAlign: "right", width: "40%", fontSize: "20px" }}>
                자동로그인 <input name="remember-me" type="checkbox" />
              </p>
              <input type="hidden" name="_csrf" value={csrf} />
              <p
                style={{
                  paddingTop: "60px",
                  paddingLeft: "15px",
                  paddingBottom: "30px",
                  display: "flex",
                  width: "450px",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  onClick={() => {
                    resetShow();

                    if (!checkValue(idInput)) {
                      SetidCheck(true);
                      return;
                    }
                    if (!checkValue(pwInput)) {
                      SetpwCheck(true);
                      return;
                    }

                    form.submit();

                    // dispatch({
                    //   type: "login",
                    //   payload: {
                    //     username: idInput.value,
                    //     password: pwInput.value,
                    //   },
                    // });
                  }}
                  style={{
                    backgroundColor: "#2d4059",
                    border: "none",
                    fontSize: "24px",
                  }}
                >
                  로그인
                </Button>
                <Button
                  onClick={() => {
                    navigate("/account");
                  }}
                  style={{
                    backgroundColor: "#2d4059",
                    border: "none",
                    fontSize: "24px",
                  }}
                >
                  회원가입
                </Button>
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
                  취소
                </Button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
