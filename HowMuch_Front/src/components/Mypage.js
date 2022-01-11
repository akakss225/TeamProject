import React, { useEffect, useState } from "react";
import { SiCashapp } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaRegHandPointRight } from "react-icons/fa";
import { MdNotificationImportant } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { BiCoinStack } from "react-icons/bi";
import axios from "axios";

const Mypage = () => {
  let navigate = useNavigate();

  let API_URL = "http://localhost:3000";

  const getMyInfo = async () => {
    await axios
      .get(API_URL + "/userinfo")
      .then((result) => {
        console.log(result.data);
        SetInfo(result.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
        // navigate("/login");
      });
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  let [userInfo, SetInfo] = useState("");

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

  const pointGap = (point) => {
    if (point < 250) {
      return 250 - point;
    } else if (point < 500) {
      // SetTier("Silver");
      return 500 - point;
    } else if (point < 750) {
      // SetTier("Gold");
      return 750 - point;
    } else if (point < 1000) {
      // SetTier("Platinum");
      return 1000 - point;
    } else {
      // SetTier("Diamond");
      return "super";
    }
  };

  let [boardRank, SetboardRank] = useState([]);

  let [memberRank, SetmemberRank] = useState([]);

  const getBoardRank = async () => {
    await axios
      .get(API_URL + "/BoardRank")
      .then((result) => {
        console.log(result.data);
        SetboardRank(result.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("board rank err");
      });
  };

  const getTierRank = async () => {
    await axios
      .get(API_URL + "/TierRank")
      .then((result) => {
        console.log(result.data);
        SetmemberRank(result.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("tier rank err");
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getBoardRank();
    getTierRank();
  }, []);

  const tierObject = [
    { tier: "Diamond", color: "#548CFF" },
    { tier: "Platinum", color: "#00BDAA" },
    { tier: "Gold", color: "#FFE300" },
    { tier: "Silver", color: "#C8C2BC" },
    { tier: "Bronze", color: "#E26A2C" },
  ];

  const findTier = (userTier) => {
    console.log(userTier);

    let findItem = tierObject.find((item) => {
      return item.tier === userTier;
    });

    console.log(findItem);
    console.log(findItem.color);

    return findItem.color;
  };

  // let sampleData = [
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  //   {
  //     nick: "user01",
  //     score: 0,
  //     posting: 0,
  //   },
  // ];

  // let sampleData2 = [
  //   {
  //     nick: "user01",
  //     tier: "diamond",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "platinum",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "platinum",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "gold",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "gold",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "gold",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "silver",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "silver",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "bronze",
  //     point: 0,
  //   },
  //   {
  //     nick: "user01",
  //     tier: "bronze",
  //     point: 0,
  //   },
  // ];

  // useEffect(() => {
  //   SetboardRank(sampleData);
  //   SetmemberRank(sampleData2);
  // }, []);

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

  let SmallLine = styled("div")`
    width: 70%;
    height: 3px;
    background-color: #2d4059;
    margin: 70px auto;
  `;
  // end styled component

  console.log(boardRank);
  console.log(memberRank);

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
            <TopTitle>Check your point !!</TopTitle>
          </div>
        </div>
      </div>
      <Line></Line>

      {/* start tier */}
      <div className="container-lg " style={{ marginTop: "50px" }}>
        <div
          className="row"
          style={{
            border: "2px solid #EA5455",
            borderRadius: "7px",
            margin: "0 20px",
          }}
        >
          <div
            className="col-lg-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdNotificationImportant style={{ fontSize: "20px" }} />
            <span style={{ margin: "0 10px" }}>회원등급표</span>{" "}
            <FaRegHandPointRight />
          </div>
          <div
            className="col-lg-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiVipCrownFill color="#548CFF" />
            <span style={{ margin: "0 10px" }}>다이아</span>
            <span>1000점</span>
          </div>
          <div
            className="col-lg-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiVipCrownFill color="#00BDAA" />
            <span style={{ margin: "0 10px" }}>플래티넘</span>
            <span>750점</span>
          </div>
          <div
            className="col-lg-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiVipCrownFill color="#FFE300" />
            <span style={{ margin: "0 10px" }}>골드</span>
            <span>500점</span>
          </div>
          <div
            className="col-lg-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiVipCrownFill color="#C8C2BC" />
            <span style={{ margin: "0 10px" }}>실버</span>
            <span>250점</span>
          </div>
          <div
            className="col-lg-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiVipCrownFill color="#E26A2C" />
            <span style={{ margin: "0 10px" }}>브론즈</span>
            <span>0점</span>
          </div>
        </div>
      </div>
      {/* end tier */}

      {/* start value input */}
      <div
        className="container-lg d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div
          style={{
            width: "80%",
            height: "500px",
            border: "3px solid #2D4059",
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: "7px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <IoWallet
              color="#EA5455"
              size={"32px"}
              style={{ marginRight: "1%" }}
            />
            <span>{userInfo.nick} 님의 포인트는 ... ?</span>
          </div>
          <div
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BiCoinStack style={{ fontSize: "32px", color: "#EA5455" }} />
            <div
              style={{
                color: "black",
                width: "50%",
                fontSize: "24px",
                borderBottom: "2px solid #EA5455",
              }}
            >
              {userInfo.point}
            </div>
            <span style={{ fontSize: "32px" }}>point</span>
          </div>
          <div style={{ fontSize: "24px" }}>{userInfo.nick} 님의 등급은</div>
          <RiVipCrownFill
            size="48px"
            color={findTier(tierSelect(userInfo.point))}
          />
          <div style={{ fontSize: "24px" }}>
            {pointGap(userInfo.point) === "super"
              ? "이미 최고 등급입니다! 현재 점수 : " + userInfo.point
              : "다음 등급까지 " +
                pointGap(userInfo.point) +
                " 포인트 남았습니다!"}
          </div>
          <div>
            <p>
              자신만의 아이디어나 일상 등을 공유하여 더 많은 포인트를 얻어보세요
              !!
            </p>
          </div>
        </div>
      </div>
      {/* end value input */}

      <SmallLine></SmallLine>

      {/* start rank */}
      <div className="container-lg" style={{ paddingBottom: "100px" }}>
        <div className="row">
          <div className="col-lg-6" style={{ marginTop: "30px" }}>
            <div
              style={{ textAlign: "left", fontSize: "24px", padding: "10px 0" }}
            >
              게시물 랭킹
            </div>
            <div
              style={{
                border: "3px solid #2D4059",
                borderRadius: "7px",
                backgroundColor: "#2D4059",
                padding: "10px",
                display: "flex",
                flexFlow: "column wrap",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "10px 0",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    backgroundColor: "#FFD460",
                    borderRadius: "5px",
                  }}
                >
                  순위
                </div>
                <div
                  style={{
                    width: "200px",
                    backgroundColor: "#FFD460",
                    borderRadius: "5px",
                  }}
                >
                  닉네임
                </div>
                <div
                  style={{
                    width: "100px",
                    backgroundColor: "#EA5455",
                    borderRadius: "5px",
                  }}
                >
                  인기도
                </div>
              </div>
              {boardRank.map((item, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      margin: "10px 0",
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        width: "40px",
                        backgroundColor: "#FFD460",
                        borderRadius: "5px",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div
                      style={{
                        width: "200px",
                        backgroundColor: "#FFD460",
                        borderRadius: "5px",
                      }}
                    >
                      {item.nick}
                    </div>
                    <div
                      style={{
                        width: "100px",
                        backgroundColor: "#EA5455",
                        borderRadius: "5px",
                      }}
                    >
                      {item.score}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-6" style={{ marginTop: "30px" }}>
            <div
              style={{ textAlign: "left", fontSize: "24px", padding: "10px 0" }}
            >
              포인트 랭킹
            </div>
            <div
              style={{
                border: "3px solid #2D4059",
                borderRadius: "7px",
                backgroundColor: "#2D4059",
                padding: "10px",
                display: "flex",
                flexFlow: "column wrap",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "10px 0",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    backgroundColor: "#FFD460",
                    borderRadius: "5px",
                  }}
                >
                  순위
                </div>
                <div
                  style={{
                    width: "100px",
                    backgroundColor: "#FFD460",
                    borderRadius: "5px",
                  }}
                >
                  닉네임
                </div>
                <div
                  style={{
                    width: "100px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                >
                  등급
                </div>
                <div
                  style={{
                    width: "100px",
                    backgroundColor: "#EA5455",
                    borderRadius: "5px",
                  }}
                >
                  포인트
                </div>
              </div>
              {memberRank.map((item, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      margin: "10px 0",
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        width: "40px",
                        backgroundColor: "#FFD460",
                        borderRadius: "5px",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div
                      style={{
                        width: "100px",
                        backgroundColor: "#FFD460",
                        borderRadius: "5px",
                      }}
                    >
                      {item.nick}
                    </div>
                    <div
                      style={{
                        width: "100px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                      }}
                    >
                      <RiVipCrownFill
                        color={findTier(item.tier)}
                        style={{ marginRight: "10px" }}
                      />
                      {item.tier}
                    </div>
                    <div
                      style={{
                        width: "100px",
                        backgroundColor: "#EA5455",
                        borderRadius: "5px",
                      }}
                    >
                      {item.point}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
