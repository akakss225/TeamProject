import React, { useEffect, useState } from "react";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { SiCashapp } from "react-icons/si";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";

const Account = () => {
  let dispatch = useDispatch();

  let navigate = useNavigate();

  // cookie

  let csrf = new Cookies().get("XSRF-TOKEN");
  console.log(csrf);

  // end cookie

  const signup = async (email, pw, nick) => {
    await axios({
      url: "/signUp",
      method: "post",
      data: {
        email: email,
        pw: pw,
        nick: nick,
      },
      headers: {
        "XSRF-TOKEN": csrf,
      },
    })
      .then((result) => {
        console.log("success signup");
        handleShow();
      })
      .catch((err) => {
        console.log("signup error");
        SetcheckSame(true);
      });
  };

  let [position, setPosition] = useState("");

  let currentWidth = document.documentElement.clientWidth;

  useEffect(() => {
    if (currentWidth > 770) {
      setPosition("absolute");
    }

    if (currentWidth <= 770) {
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [idCheck, SetidCheck] = useState(false);
  const [idWarn, SetidWarn] = useState(false);
  const [idSame, SetidSame] = useState("");

  const [pwCheck, SetpwCheck] = useState(false);
  const [pwWarn, SetpwWarn] = useState(false);

  const [pw2Check, Setpw2Check] = useState(false);
  const [pw2Warn, Setpw2Warn] = useState(false);

  const [nickCheck, SetnickCheck] = useState(false);
  const [nickWarn, SetnickWarn] = useState(false);
  const [nickSame, SetnickSame] = useState("");

  const [checkSame, SetcheckSame] = useState(false);

  const idInput = document.getElementById("ID");
  const pwInput = document.getElementById("PW");
  const pw2Input = document.getElementById("PW2");
  const nickInput = document.getElementById("NICK");

  const checkValue = (input) => {
    console.log(input.value);

    return input.value;
  };

  useEffect(() => {
    resetShow();
  }, []);

  const resetShow = () => {
    SetidCheck(false);
    SetidWarn(false);
    SetidSame(false);
    SetpwCheck(false);
    SetpwWarn(false);
    Setpw2Check(false);
    Setpw2Warn(false);
    SetnickCheck(false);
    SetnickWarn(false);
    SetnickSame("");
    SetidSame("");
    SetcheckSame(false);
  };

  // resize screen

  let [flexdir, Setflexdir] = useState("row nowrap");

  let [margindir1, Setmargindir1] = useState("-70px");
  let [margindir2, Setmargindir2] = useState("-165px");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentWidth > 1200) {
      Setflexdir("row nowrap");
      Setmargindir1("-70px");
      Setmargindir2("-165px");
    }
    if (currentWidth <= 1200) {
      Setflexdir("column nowrap");
      Setmargindir1("0px");
      Setmargindir2("0px");
    }
  }, [flexdir, currentWidth]);

  window.addEventListener("resize", () => {
    let screenWidth = document.documentElement.clientWidth;

    if (screenWidth <= 1200) {
      Setflexdir("column nowrap");
      Setmargindir1("0px");
      Setmargindir2("0px");
    }

    if (screenWidth > 1200) {
      Setflexdir("row nowrap");
      Setmargindir1("-70px");
      Setmargindir2("-165px");
    }
  });

  ///end resize screen

  // axios
  const idSameCheck = async (id) => {
    await axios
      .get("/findEmail?email=" + id)
      .then((result) => {
        // console.log(result.data.nick);
        if (result.data.nick) {
          resetShow();
          SetidSame("yes");
          return true;
        } else {
          resetShow();
          SetidSame("no");
          return false;
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };
  const nickSameCheck = async (nick) => {
    await axios
      .get("/findNick?nick=" + nick)
      .then((result) => {
        console.log(result.data.nick);
        if (result.data.email) {
          SetnickSame("yes");
          return true;
        } else {
          SetnickSame("no");
          return false;
        }
      })
      .catch((error) => {
        console.log("error");
      });
  };
  // end exios

  function enterkey() {
    if (window.event.keyCode === 13) {
      // 엔터키가 눌렸을 때

      console.log("enter!!");

      resetShow();

      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글
      const specialText = /[~!@#$%<>^&*]/; //특수문자

      const idInputArray = idInput.value.split("");
      const nickInputArray = nickInput.value.split("");

      if (!checkValue(idInput)) {
        SetidCheck(true);
        return;
      }

      if (!checkValue(pwInput)) {
        SetpwCheck(true);
        return;
      }
      if (!checkValue(pw2Input)) {
        Setpw2Check(true);
        return;
      }
      if (!checkValue(nickInput)) {
        SetnickCheck(true);
        return;
      }
      if (
        !idInputArray.find((item) => item === "@") ||
        !idInputArray.find((item) => item === ".")
      ) {
        SetidWarn(true);
        idInput.value = "";
        return;
      }

      if (!specialText.test(pwInput.value)) {
        SetpwWarn(true);
        pwInput.value = "";
        return;
      }

      if (!(pwInput.value === pw2Input.value)) {
        Setpw2Warn(true);
        pw2Input.value = "";
        return;
      }
      if (korean.test(nickInput.value)) {
        if (nickInputArray.length > 15) {
          SetnickWarn(true);
          nickInput.value = "";
          return;
        }
      } else {
        if (nickInputArray.length > 30) {
          SetnickWarn(true);
          nickInput.value = "";
          return;
        }
      }

      signup(idInput.value, pw2Input.value, nickInput.value);
    }
  }

  // styled component
  let TopTitle = styled("p")`
    font-size: 48px;
    padding-bottom: 50px;
  `;

  let Head = styled("p")`
    font-size: 32px;
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

  let Success = styled("p")`
    color: blue;
  `;
  // end styled component

  return (
    <div onKeyUp={enterkey}>
      <div className="container" style={{ position: "relative" }}>
        {/* logo */}
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
        {/* end logo */}

        <div className="row">
          <div
            className="col d-flex flex-column justify-content-center align-items-center"
            style={{ paddingTop: "80px" }}
          >
            <TopTitle>
              Join us
              <br />&<br />
              Make your Value !!
            </TopTitle>
            <Head>Create Account</Head>
            <p>
              <RiAccountPinBoxFill style={{ fontSize: "48px" }} />
            </p>
            <p
              style={{
                display: "flex",
                width: "70%",
                alignItems: "center",
                paddingTop: "30px",
                flexFlow: flexdir,
                justifyContent: "center",
                marginLeft: margindir1,
              }}
            >
              <Label>ID(Email)</Label>
              <input
                id="ID"
                type="text"
                placeholder="아이디를 입력하세요"
                style={{
                  width: "400px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
              <Button
                onClick={() => {
                  if (!idInput.value) {
                    resetShow();
                    SetidCheck(true);
                    return;
                  }
                  resetShow();
                  idSameCheck(idInput.value);
                }}
                style={{ margin: "20px 10px" }}
              >
                중복확인
              </Button>
            </p>
            {idCheck ? <Warn>이메일을 입력해주세요.</Warn> : null}
            {idWarn ? (
              <Warn>올바른 형식의 이메일이 아닙니다. 다시 입력해주세요.</Warn>
            ) : null}
            {idSame === "yes" ? (
              <Warn>
                중복되는 아이디가 존재합니다. 다른 이메일을 입력해주세요.
              </Warn>
            ) : null}
            {idSame === "no" ? (
              <Success>사용가능한 아이디입니다.</Success>
            ) : null}
            <p
              style={{
                display: "flex",
                width: "70%",
                alignItems: "center",
                paddingTop: "30px",
                flexFlow: flexdir,
                justifyContent: "center",
                marginLeft: margindir2,
              }}
            >
              <Label>PW</Label>
              <input
                id="PW"
                type="password"
                placeholder="비밀번호를 입력하세요"
                style={{
                  width: "400px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
            </p>
            {pwCheck ? <Warn>비밀번호를 입력해주세요.</Warn> : null}
            {pwWarn ? (
              <Warn>
                올바른 형식의 비밀번호가 아닙니다. 특수문자를 넣어서 다시
                입력해주세요.
              </Warn>
            ) : null}
            <p
              style={{
                display: "flex",
                width: "70%",
                alignItems: "center",
                paddingTop: "30px",
                flexFlow: flexdir,
                justifyContent: "center",
                marginLeft: margindir2,
              }}
            >
              <Label>PW(확인)</Label>
              <input
                id="PW2"
                type="password"
                placeholder="입력했던 비밀번호를 똑같이 입력하세요"
                style={{
                  width: "400px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
            </p>
            {pw2Check ? <Warn>비밀번호를 입력해주세요.</Warn> : null}
            {pw2Warn ? (
              <Warn>
                입력했던 비밀번호와 일치하지 않습니다. 다시 입력해주세요.
              </Warn>
            ) : null}
            <p
              style={{
                display: "flex",
                width: "70%",
                alignItems: "center",
                paddingTop: "30px",
                flexFlow: flexdir,
                justifyContent: "center",
                marginLeft: margindir1,
              }}
            >
              <Label>닉네임</Label>
              <input
                id="NICK"
                type="text"
                placeholder="닉네임을 입력하세요"
                style={{
                  width: "400px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
              <Button
                onClick={() => {
                  if (!nickInput.value) {
                    resetShow();
                    SetnickCheck(true);
                    return;
                  }
                  resetShow();
                  nickSameCheck(nickInput.value);
                }}
                style={{ margin: "20px 10px" }}
              >
                중복확인
              </Button>
            </p>
            {nickCheck ? <Warn>닉네임을 입력해주세요.</Warn> : null}
            {nickWarn ? (
              <Warn>닉네임 제한길이를 초과하였습니다. 다시 입력해주세요.</Warn>
            ) : null}
            {nickSame === "yes" ? (
              <Warn>
                중복되는 닉네임이 존재합니다. 다른 닉네임을 입력해주세요.
              </Warn>
            ) : null}
            {nickSame === "no" ? (
              <Success>사용가능한 닉네임입니다.</Success>
            ) : null}
            {checkSame ? (
              <Warn>
                중복확인 버튼을 눌러 아이디 및 닉네임의 중복 여부를
                확인해주세요!!!
              </Warn>
            ) : null}
            <p
              style={{
                paddingTop: "60px",
                paddingRight: "20px",
                display: "flex",
                width: "300px",
                justifyContent: "space-evenly",
                paddingBottom: "50px",
              }}
            >
              <Button
                onClick={() => {
                  resetShow();

                  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; //한글
                  const specialText = /[~!@#$%<>^&*]/; //특수문자

                  // console.log(korean.test("닉네임"));
                  // console.log(specialText.test("asser@@"));

                  const idInputArray = idInput.value.split("");
                  const nickInputArray = nickInput.value.split("");

                  // console.log(nickInputArray.length);

                  // console.log(idInputArray);
                  // console.log(!idInputArray.find((item) => item == "@"));
                  // console.log(!idInputArray.find((item) => item == "."));

                  if (!checkValue(idInput)) {
                    SetidCheck(true);
                    return;
                  }

                  if (!checkValue(pwInput)) {
                    SetpwCheck(true);
                    return;
                  }
                  if (!checkValue(pw2Input)) {
                    Setpw2Check(true);
                    return;
                  }
                  if (!checkValue(nickInput)) {
                    SetnickCheck(true);
                    return;
                  }
                  if (
                    !idInputArray.find((item) => item === "@") ||
                    !idInputArray.find((item) => item === ".")
                  ) {
                    SetidWarn(true);
                    idInput.value = "";
                    return;
                  }

                  if (!specialText.test(pwInput.value)) {
                    SetpwWarn(true);
                    pwInput.value = "";
                    return;
                  }

                  if (!(pwInput.value === pw2Input.value)) {
                    Setpw2Warn(true);
                    pw2Input.value = "";
                    return;
                  }
                  if (korean.test(nickInput.value)) {
                    if (nickInputArray.length > 15) {
                      SetnickWarn(true);
                      nickInput.value = "";
                      return;
                    }
                  } else {
                    if (nickInputArray.length > 30) {
                      SetnickWarn(true);
                      nickInput.value = "";
                      return;
                    }
                  }

                  signup(idInput.value, pw2Input.value, nickInput.value);
                }}
                style={{
                  backgroundColor: "#2d4059",
                  border: "none",
                  fontSize: "24px",
                }}
              >
                가입하기
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
        </div>
      </div>

      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        style={{ fontFamily: "'Do Hyeon', sans-serif" }}
      >
        <Modal.Header>
          <Modal.Title>환영합니다!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>가입이 정상적으로 완료되었습니다.</p>
          <p>로그인페이지에서 가입한 아이디로 로그인 하세요.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인 페이지로 이동
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/welcome");
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Account;
