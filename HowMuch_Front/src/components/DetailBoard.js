import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SiCashapp } from "react-icons/si";
import styled from "styled-components";
import { Button, Card, Modal } from "react-bootstrap";
import noImage from "../img/noImage.svg";
import { BsFillCaretRightFill, BsPinFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FaDollarSign } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import ReplyPagination from "./ReplyPagination";
import BoardListPagination from "./BoardListPagination";
import axios from "axios";
import Cookies from "universal-cookie";
import { RiVipCrownFill } from "react-icons/ri";

const DetailBoard = (props) => {
  let navigate = useNavigate();

  let dispatch = useDispatch();

  let { bno } = useParams();

  console.log(bno);

  // cookie

  let csrf = new Cookies().get("XSRF-TOKEN");
  console.log(csrf);

  // end cookie

  const readList = async () => {
    await axios.get("/readList").then((res) => {
      console.log("success");
      console.log(res.data);
      dispatch({
        type: "readList",
        payload: res.data,
      });
    });
  };

  const getMyInfo = async () => {
    await axios
      .get("/userinfo")
      .then((result) => {
        console.log(result.data);
        SetInfo(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let [userInfo, SetInfo] = useState("");

  const readReplyList = async () => {
    await axios({
      url: "/ReadReplyList",
      params: {
        bno: bno,
      },
    }).then((res) => {
      console.log(res.data);
      dispatch({
        type: "readReply",
        payload: res.data,
      });
    });
  };

  const readValueList = async () => {
    await axios({
      url: "/log",
      params: {
        bno: bno,
      },
    }).then((res) => {
      console.log("success valuelog");
      console.log(res.data);
      dispatch({
        type: "valuelog",
        payload: res.data,
      });
    });
  };

  const readCalculateValue = async () => {
    await axios({
      url: "/cal",
      params: {
        bno: bno,
      },
    }).then((res) => {
      console.log("success cal");
      console.log(res.data);
      SetcalculateValue(res.data);
    });
  };

  const upreadCount = async () => {
    await axios({
      url: "/rcount",
      params: {
        bno: bno,
      },
    }).then(async (res) => {
      console.log("success rcount");

      await readList();
    });
  };

  const read = async (bno) => {
    await axios({
      url: "/read",
      method: "get",
      params: {
        bno: bno,
      },
    }).then((res) => {
      console.log(res.data);

      dispatch({
        type: "oneboard",
        payload: res.data,
      });
    });
  };

  // like, dislike color start
  let [likecolor, Setlikecolor] = useState("");

  let [dislikecolor, Setdislikecolor] = useState("");

  // like, dislike color end

  const readedBoard = async () => {
    await axios({
      url: "/readed",
      method: "get",
      params: {
        bno: bno,
      },
    }).then(async (res) => {
      console.log("좋아요 표시기");
      console.log(res.data);

      if (res.data.checklike === 1) {
        console.log("추천 이력 있음");
        Setlikecolor("#EA5455");
      } else if (res.data.checklike === 0) {
        console.log("추천 이력 없음");
        Setlikecolor("");
      }

      if (res.data.checkdislike === 1) {
        console.log("비추천 이력 없음");
        Setdislikecolor("#F07B3F");
      } else if (res.data.checkdislike === 0) {
        console.log("비추천 이력 없음");
        Setdislikecolor("");
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    resetBoolean();
    getMyInfo();
    read(bno);
    readValueList();
    readList();
    readCalculateValue();
    upreadCount();
    readedBoard();
    readReplyList();
  }, []);

  let state = useSelector((state) => {
    return state;
  });

  let oneBoard = state.oneBoardReducer;

  let valueState = state.valueReducer;

  let [calculateValue, SetcalculateValue] = useState("");

  // tier reader
  const tierSelect = (point) => {
    if (point < 250) {
      // SetTier("Bronze");
      return "Bronze";
    } else if (point < 500) {
      // SetTier("Silver");
      return "Silver";
    } else if (point < 750) {
      // SetTier("Gold");
      return "Gold";
    } else if (point < 1000) {
      // SetTier("Platinum");
      return "Platinum";
    } else {
      // SetTier("Diamond");
      return "Diamond";
    }
  };

  const tierObject = [
    { tier: "Diamond", color: "#548CFF" },
    { tier: "Platinum", color: "#00BDAA" },
    { tier: "Gold", color: "#FFE300" },
    { tier: "Silver", color: "#C8C2BC" },
    { tier: "Bronze", color: "#E26A2C" },
  ];

  const findTier = (userTier) => {
    let findItem = tierObject.find((item) => {
      return item.tier === userTier;
    });
    return findItem.color;
  };

  // findTier(tierSelect(포인트 데이터))

  // tier reader end

  // modal control

  const resetBoolean = () => {};

  const [warnvalueshow, setwarnvalueShow] = useState(false);

  const handleWarnClose = () => setwarnvalueShow(false);
  const handleWarnShow = () => setwarnvalueShow(true);

  const [loginShow, setloginShow] = useState(false);

  const handleLoginClose = () => setloginShow(false);
  const handleLoginShow = () => setloginShow(true);

  const [loginLikeShow, setloginLikeShow] = useState(false);

  const handleLoginLikeClose = () => setloginLikeShow(false);
  const handleLoginLikeShow = () => setloginLikeShow(true);

  const [warn, Setwarn] = useState(false);
  const [warnDuplication, SetwarnDuplication] = useState(false);
  const [warnSelfValue, SetwarnSelfValue] = useState(false);
  const [warnMinus, SetwarnMinus] = useState(false);
  // modal control end

  // resize screen

  let currentWidth = document.documentElement.clientWidth;

  let [flexdir, Setflexdir] = useState("row wrap");

  useEffect(() => {
    if (currentWidth > 990) {
      Setflexdir("row wrap");
    }
    if (currentWidth <= 990) {
      Setflexdir("column wrap");
    }
  }, [flexdir, currentWidth]);

  window.addEventListener("resize", () => {
    let screenWidth = document.documentElement.clientWidth;

    if (screenWidth <= 990) {
      Setflexdir("column wrap");
    }

    if (screenWidth > 990) {
      Setflexdir("row wrap");
    }
  });

  ///end resize screen

  // styled component
  let TopTitle = styled("p")`
    font-size: 48px;
  `;

  let Line = styled("div")`
    width: 80%;
    height: 5px;
    background-color: #2d4059;
    margin: 0 auto;
  `;

  let Warn = styled("p")`
    color: red;
  `;
  // end styled component
  return (
    <div>
      <div className="cotainer-lg">
        <div
          className="row d-flex justify-content-center"
          style={{ width: "100%", paddingTop: "50px" }}
        >
          <div
            className="col-lg-1"
            onClick={() => {
              navigate("/");
            }}
            style={{ marginBottom: "20px", cursor: "pointer" }}
          >
            <SiCashapp
              style={{ color: "#EA5455", fontSize: "70px", margin: "0 20px" }}
            />
          </div>
          <div className="col-lg-9">
            <TopTitle>Wait you feed back !!</TopTitle>
          </div>
        </div>
      </div>
      <Line></Line>
      <div className="container-lg" style={{ marginTop: "30px" }}>
        <div className="row d-flex justify-content-end">
          <div
            className="col-4 d-flex justify-content-evenly"
            style={{ flexFlow: flexdir }}
          >
            <Button
              style={{
                marginBottom: "10px",
                backgroundColor: "#2D4059",
                borderStyle: "none",
              }}
              onClick={() => {
                navigate("/boardmain/");
              }}
            >
              글목록
            </Button>
            {valueState === "" ? null : valueState.length > 0 ? null : !(
                userInfo && oneBoard !== ""
              ) ? null : !(userInfo.nick === oneBoard.writer) ? null : (
              <Button
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#2D4059",
                  borderStyle: "none",
                }}
                onClick={() => {
                  navigate("/modify/" + oneBoard.bno);
                  console.log(oneBoard);
                }}
              >
                글수정
              </Button>
            )}
            {!(userInfo && oneBoard !== "") ? null : !(
                userInfo.nick === oneBoard.writer
              ) ? null : (
              <Button
                onClick={async () => {
                  await axios({
                    url: "/delete",
                    method: "delete",
                    params: {
                      bno: oneBoard.bno,
                      writer: oneBoard.writer,
                    },
                  })
                    .then((res) => {
                      navigate("/boardmain");
                      console.log(res.data);
                      dispatch({
                        type: "deleteBoard",
                        payload: res.data,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      navigate("/login");
                    });
                }}
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#F07B3F",
                  borderStyle: "none",
                }}
              >
                글삭제
              </Button>
            )}
            {oneBoard === "" ? null : oneBoard.end === 1 ? null : !(
                userInfo && oneBoard
              ) ? null : !(userInfo.nick === oneBoard.writer) ? null : (
              <Button
                style={{
                  marginBottom: "10px",
                  backgroundColor: "#EA5455",
                  borderStyle: "none",
                }}
                onClick={async () => {
                  await axios({
                    url: "/setPoint",
                    method: "get",
                    params: {
                      bno: oneBoard.bno,
                      mno: userInfo.mno,
                    },
                  }).then((res) => {
                    console.log(res.data);
                    console.log("value end!!!");
                    readList();
                    SetcalculateValue(res.data);
                  });

                  navigate("/detail/" + oneBoard.bno);
                  read(oneBoard.bno);
                }}
              >
                평가종료
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* detail card */}
      <div
        className="container-lg d-flex justify-content-center"
        style={{ marginTop: "50px", height: "auto" }}
      >
        <Card
          style={{
            width: "800px",
            height: "auto",
            color: "white",
            padding: "10px",
          }}
        >
          {oneBoard === "" ? null : oneBoard.imageList === null ? (
            <Card.Img
              variant="top"
              src={noImage}
              style={{ border: "2px solid #2D4059" }}
            />
          ) : (
            oneBoard.imageList.map((item, index) => {
              return (
                <Card.Img
                  variant="top"
                  src={item}
                  key={index}
                  style={{ border: "2px solid #2D4059", marginBottom: "10px" }}
                />
              );
            })
          )}
          <Card.Body style={{ padding: "1rem 0" }}>
            <div style={{ display: "flex" }}>
              <Card.Title
                style={{
                  MaxWidth: "700px",
                  height: "40px",
                  textAlign: "left",
                  backgroundColor: "#2D4059",
                  borderRadius: "5px",
                  padding: "10px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {oneBoard === "" ? null : oneBoard.title}
              </Card.Title>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  maxWidth: "700px",
                  height: "40px",
                  backgroundColor: "#2D4059",
                  borderRadius: "5px",
                  padding: "10px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {oneBoard === "" ? null : (
                  <span>
                    <RiVipCrownFill
                      color={findTier(tierSelect(oneBoard.point))}
                    />{" "}
                    {oneBoard.writer}
                  </span>
                )}
              </p>
            </div>

            <Card.Text
              style={{
                border: "2px solid #2D4059",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <pre
                style={{
                  color: "black",
                  fontSize: "20px",
                  fontFamily: "'Do Hyeon', sans-serif",
                  textAlign: "left",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {oneBoard === "" ? null : oneBoard.content}
              </pre>
            </Card.Text>
            <div style={{ marginTop: "30px", textAlign: "left" }}>
              {oneBoard === ""
                ? null
                : oneBoard.tag === "not"
                ? null
                : oneBoard.tagList.map((item, index) => {
                    return (
                      <span
                        style={{
                          display: "inline-block",
                          maxWidth: "700px",
                          height: "40px",
                          backgroundColor: "#2D4059",
                          borderRadius: "5px",
                          padding: "10px",
                          marginBottom: "0",
                          marginRight: "10px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                        key={index}
                      >
                        #{item}
                      </span>
                    );
                  })}
            </div>
          </Card.Body>
        </Card>
      </div>
      {/* end detail card */}

      {/* start price */}
      <div className="container-lg">
        <div className="row">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "150px",
            }}
          >
            <p
              style={{
                width: "100px",
                height: "50px",
                backgroundColor: "#F07B3F",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "17px",
                fontSize: "24px",
              }}
            >
              제시가
            </p>
            <BsFillCaretRightFill
              style={{ color: "#2D4059", fontSize: "32px" }}
            />
            <div
              style={{
                color: "black",
                width: "400px",
                fontSize: "24px",
                borderBottom: "2px solid #2D4059",
              }}
            >
              {oneBoard === ""
                ? null
                : oneBoard.suggestion
                ? oneBoard.suggestion + " 원"
                : "없음"}
            </div>
          </div>
        </div>
        <div className="row">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <p
              style={{
                width: "100px",
                height: "50px",
                backgroundColor: "#FFD460",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "17px",
                fontSize: "24px",
              }}
            >
              최저가
            </p>
            <BsFillCaretRightFill
              style={{ color: "#2D4059", fontSize: "32px" }}
            />
            <div
              style={{
                color: "black",
                width: "400px",
                fontSize: "24px",
                borderBottom: "2px solid #2D4059",
              }}
            >
              {!calculateValue.min ? "없음" : calculateValue.min + " 원"}
            </div>
          </div>
        </div>
        <div className="row">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <p
              style={{
                width: "100px",
                height: "50px",
                backgroundColor: "#EA5455",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "17px",
                fontSize: "24px",
              }}
            >
              최고가
            </p>
            <BsFillCaretRightFill
              style={{ color: "#2D4059", fontSize: "32px" }}
            />
            <div
              style={{
                color: "black",
                width: "400px",
                fontSize: "24px",
                borderBottom: "2px solid #2D4059",
              }}
            >
              {!calculateValue.max ? "없음" : calculateValue.max + " 원"}
            </div>
          </div>
        </div>
      </div>
      {/* end price */}

      {/* start value log */}
      <div
        className="container-lg d-flex justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <div style={{ width: "800px", marginTop: "30px", textAlign: "left" }}>
          <p style={{ fontSize: "24px", borderBottom: "2px solid #2D4059" }}>
            <span>평가로그</span>
          </p>
          {valueState === "" ? (
            <span>아직 평가가 이루어 지지 않았습니다.</span>
          ) : valueState.length <= 0 ? (
            <span>아직 평가가 이루어 지지 않았습니다.</span>
          ) : (
            valueState.map((item, index) => {
              return (
                <span
                  style={{
                    display: "inline-block",
                    maxWidth: "700px",
                    height: "40px",
                    backgroundColor: "#EA5455",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "0",
                    marginRight: "10px",
                    overflow: "hidden",
                  }}
                  key={index}
                >
                  {
                    <span>
                      <RiVipCrownFill
                        color={findTier(tierSelect(item.point))}
                      />{" "}
                      {item.rater}
                    </span>
                  }{" "}
                  님 {item.price} 원{" "}
                  {String(
                    new Date(+new Date(item.vdate) + 3240 * 10000)
                      .toISOString()
                      .replace("T", " ")
                      .replace(/\..*/, "")
                  )}
                </span>
              );
            })
          )}
        </div>
      </div>
      {/* end value log */}

      {/* start value input */}
      <div
        className="container-lg d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div
          style={{
            width: "75%",
            height: "500px",
            backgroundColor: "#FFD460",
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: "7px",
          }}
        >
          {oneBoard === "" ? null : oneBoard.end === 0 ? (
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FaDollarSign style={{ fontSize: "32px", color: "#EA5455" }} />
              <div
                style={{
                  color: "black",
                  width: "400px",
                  fontSize: "24px",
                  borderBottom: "2px solid #EA5455",
                }}
              >
                {!calculateValue.avg ? "없음" : "평균가: " + calculateValue.avg}
              </div>
              <span style={{ fontSize: "32px" }}>원</span>
            </div>
          ) : null}
          {oneBoard === "" ? null : oneBoard.end === 0 ? (
            <div style={{ fontSize: "24px" }}>
              {!userInfo.nick ? "익명" : userInfo.nick} 님의 <br />
              평가금액은 ... ?
            </div>
          ) : (
            <div style={{ fontSize: "24px" }}>
              평가가 완료된 게시물입니다.
              <br />
              <span style={{ color: "#EA5455" }}>최종평가금액은 .. ?</span>
            </div>
          )}
          {oneBoard === "" ? null : oneBoard.end === 0 ? (
            <div style={{ width: "80%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <BsPinFill style={{ fontSize: "32px", color: "#EA5455" }} />
                <div
                  style={{ borderBottom: "2px solid #EA5455", width: "60%" }}
                >
                  <input
                    id="price"
                    style={{
                      color: "black",
                      width: "70%",
                      fontSize: "24px",
                      borderStyle: "none",
                      backgroundColor: "transparent",
                      textAlign: "center",
                    }}
                  />
                </div>
                <span style={{ fontSize: "32px" }}>원</span>
              </div>
              {warn ? (
                <Warn>
                  값을 입력하지 않았거나 입력한 값이 숫자가 아닙니다. 다시
                  입력해주세요.
                </Warn>
              ) : null}
              {warnMinus ? (
                <Warn>음수의 값은 입력하실 수 없습니다!</Warn>
              ) : null}
              {warnDuplication ? (
                <Warn>
                  이미 평가한 게시물입니다. 다른 게시물을 평가해보세요!
                </Warn>
              ) : null}
              {warnSelfValue ? (
                <Warn>자신의 게시물에는 평가할 수 없습니다!</Warn>
              ) : null}
              <Button
                onClick={async () => {
                  let number = /[0-9]/; // 숫자 체크
                  let price = document.getElementById("price");

                  Setwarn(false);
                  SetwarnMinus(false);

                  if (!price.value || !number.test(price.value)) {
                    console.log("no value");
                    Setwarn(true);
                    return;
                  } else {
                    Setwarn(false);
                  }

                  if (parseInt(price.value) < 0) {
                    SetwarnMinus(true);
                    return;
                  } else {
                    SetwarnMinus(false);
                  }

                  if (!userInfo) {
                    handleLoginShow();
                    return;
                  }

                  handleWarnShow();
                }}
                style={{
                  marginTop: "30px",
                  backgroundColor: "#EA5455",
                  borderStyle: "none",
                }}
              >
                평가입력
              </Button>
            </div>
          ) : (
            <div style={{ width: "80%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <BsPinFill style={{ fontSize: "32px", color: "#EA5455" }} />
                <div
                  style={{ borderBottom: "2px solid #EA5455", width: "60%" }}
                >
                  <input
                    id="price"
                    style={{
                      color: "black",
                      width: "70%",
                      fontSize: "24px",
                      borderStyle: "none",
                      backgroundColor: "transparent",
                      textAlign: "center",
                    }}
                    defaultValue={calculateValue.avg}
                    disabled
                  />
                </div>
                <span style={{ fontSize: "32px" }}>원</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container-lg d-flex justify-content-center">
        <div style={{ display: "flex", width: "800px", justifyContent: "end" }}>
          <div style={{ fontSize: "24px" }}>
            <GrView />
            <span style={{ padding: "0 10px" }}>
              {oneBoard === "" ? null : oneBoard.rcount}
            </span>
            <AiFillLike
              color={likecolor}
              onClick={async (e) => {
                if (!userInfo) {
                  handleLoginLikeShow();
                  return;
                }
                await axios({
                  url: "/like",
                  method: "get",
                  params: {
                    mno: userInfo.mno,
                    bno: oneBoard.bno,
                  },
                }).then((res) => {
                  if (res.data.checklike === 0 && res.data.checkdislike === 0) {
                    Setlikecolor("");
                    Setdislikecolor("");
                  } else if (
                    res.data.checklike === 1 &&
                    res.data.checkdislike === 0
                  ) {
                    Setlikecolor("#EA5455");
                    Setdislikecolor("");
                  } else if (
                    res.data.checklike === 0 &&
                    res.data.checkdislike === 1
                  ) {
                    Setlikecolor("");
                    Setdislikecolor("#F07B3F");
                  }

                  read(bno);
                });
              }}
              style={{ cursor: "pointer" }}
            />
            <span style={{ padding: "0 10px" }}>
              {oneBoard === "" ? null : oneBoard.blike}
            </span>
            <AiFillDislike
              color={dislikecolor}
              onClick={async (e) => {
                if (!userInfo) {
                  handleLoginLikeShow();
                  return;
                }
                await axios({
                  url: "/dislike",
                  method: "get",
                  params: {
                    mno: userInfo.mno,
                    bno: oneBoard.bno,
                  },
                }).then((res) => {
                  if (res.data.checklike === 0 && res.data.checkdislike === 0) {
                    Setlikecolor("");
                    Setdislikecolor("");
                  } else if (
                    res.data.checklike === 1 &&
                    res.data.checkdislike === 0
                  ) {
                    Setlikecolor("#EA5455");
                    Setdislikecolor("");
                  } else if (
                    res.data.checklike === 0 &&
                    res.data.checkdislike === 1
                  ) {
                    Setlikecolor("");
                    Setdislikecolor("#F07B3F");
                  }

                  read(bno);
                });
              }}
              style={{ cursor: "pointer" }}
            />
            <span style={{ padding: "0 10px" }}>
              {oneBoard === "" ? null : oneBoard.bdislike}
            </span>
          </div>
        </div>
      </div>
      {/* end value input */}

      {/* start reply box */}
      <ReplyPagination bno={bno} />
      <div className="container-lg d-flex justify-content-center">
        <div style={{ width: "100%" }}>
          <textarea
            id="rcontent"
            placeholder="댓글을 입력하세요"
            style={{ width: "70%", height: "100px", resize: "none" }}
          />
          <div style={{ display: "flex", justifyContent: "end", width: "85%" }}>
            <Button
              onClick={async () => {
                let rcontent = document.getElementById("rcontent");

                await axios({
                  url: "http://localhost:3000/InsertReply",
                  method: "post",
                  data: {
                    mno: userInfo ? userInfo.mno : null,
                    bno: oneBoard.bno,
                    replyer: userInfo.nick ? userInfo.nick : "anonymous",
                    rcontent: rcontent.value,
                  },
                  headers: {
                    "XSRF-TOKEN": csrf,
                  },
                }).then((res) => {
                  console.log(res);
                  dispatch({
                    type: "insertReply",
                    payload: res.data,
                  });
                  rcontent.value = "";
                });
              }}
              style={{ backgroundColor: "#EA5455", borderStyle: "none" }}
            >
              댓글등록
            </Button>
          </div>
        </div>
      </div>
      {/* end reply box */}

      {/* start board list box */}
      <BoardListPagination />
      {/* end reply box */}

      {/* warn value modal start */}
      <Modal
        show={warnvalueshow}
        onHide={handleWarnClose}
        style={{ fontFamily: "'Do Hyeon', sans-serif" }}
      >
        <Modal.Header>
          <Modal.Title>⚠️ 주의 ⚠️</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          정말로 이 가격으로 평가하시겠습니까?
          <br />
          평가하신 금액은 추후 변경할 수 없습니다.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleWarnClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              let price = document.getElementById("price");

              await axios({
                url: "/RegisterValue",
                method: "POST",
                data: {
                  bno: oneBoard.bno,
                  price: price.value,
                },
              }).then((res) => {
                console.log(res.data[0].price === -1);
                if (res.data === "") {
                  console.log("same user");
                  SetwarnDuplication(true);
                  readValueList();
                  handleWarnClose();
                } else if (res.data[0].price === -1) {
                  console.log("자신의 게시물임");
                  SetwarnSelfValue(true);
                  readValueList();
                  handleWarnClose();
                } else {
                  console.log(res.data);
                  dispatch({
                    type: "valuelog",
                    payload: res.data,
                  });
                }
              });

              await readCalculateValue();

              price.value = "";

              handleWarnClose();
            }}
          >
            평가확정
          </Button>
        </Modal.Footer>
      </Modal>
      {/* warn value modal end */}

      {/* login modal start */}
      <Modal
        show={loginShow}
        onHide={handleLoginShow}
        style={{ fontFamily: "'Do Hyeon', sans-serif" }}
      >
        <Modal.Header>
          <Modal.Title>⚠️ 로그인이 필요한 서비스입니다! ⚠️</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          평가를 하시려면 로그인이 필요합니다.
          <br />
          로그인을 하시거나 회원이 아니시라면 회원가입 후 이용 부탁드립니다.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleLoginClose();
              navigate("/login");
            }}
          >
            로그인하러 가기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* login modal end */}

      {/* likelogin modal start */}
      <Modal
        show={loginLikeShow}
        onHide={handleLoginLikeShow}
        style={{ fontFamily: "'Do Hyeon', sans-serif" }}
      >
        <Modal.Header>
          <Modal.Title>⚠️ 로그인이 필요한 서비스입니다! ⚠️</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          좋아요 및 싫어요를 하시려면 로그인이 필요합니다.
          <br />
          로그인을 하시거나 회원이 아니시라면 회원가입 후 이용 부탁드립니다.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginLikeClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleLoginLikeClose();
              navigate("/login");
            }}
          >
            로그인하러 가기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* likelogin modal end */}
    </div>
  );
};

export default DetailBoard;
