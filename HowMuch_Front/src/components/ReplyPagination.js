import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiVipCrownFill } from "react-icons/ri";
import "../css/DetailBoard.css";

const ReplyPagination = (props) => {
  const checkLogin = async () => {
    await axios
      .get("/checklogin")
      .then((result) => {
        SetCheckUser(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("please login");
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
      url: "http://localhost:8181/ReadReplyList",
      params: {
        bno: props.bno,
      },
    }).then((res) => {
      console.log(res.data);
      dispatch({
        type: "readReply",
        payload: res.data,
      });
    });
  };

  useEffect(() => {
    getMyInfo();
    checkLogin();
    readReplyList();
  }, []);

  let [checkUser, SetCheckUser] = useState("");

  let state = useSelector((state) => {
    return state;
  });

  let navigate = useNavigate();

  let dispatch = useDispatch();

  let replyState = state.replyReducer;

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
    console.log(userTier);

    let findItem = tierObject.find((item) => {
      return item.tier === userTier;
    });

    console.log(findItem);
    console.log(findItem.color);

    return findItem.color;
  };

  // findTier(tierSelect(포인트 데이터))
  // tier reader end

  // pagination data
  const items = replyState;

  // styled component
  let Reply = styled("div")`
    background-color: #2d4059;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: 20px;
    border-radius: 12px;
  `;

  // pagination
  function Items({ currentItems }) {
    return (
      <>
        <div className="container-lg d-flex justify-content-center">
          <div style={{ width: "800px", marginTop: "100px" }}>
            <div
              style={{
                fontSize: "24px",
                borderBottom: "2px solid #2D4059",
                textAlign: "left",
              }}
            >
              <span>댓글</span>
            </div>
            {currentItems &&
              currentItems.map((item, index) => (
                <Reply className="row" key={index}>
                  <div className="col-lg-7" style={{ textAlign: "left" }}>
                    {item == null ? null : item.rcontent}
                  </div>
                  <div
                    className="col-lg-5"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "90px",
                        paddingRight: "10px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item == null ? null : item.replyer === "anonymous" ? (
                        "익명"
                      ) : (
                        <span>
                          <RiVipCrownFill
                            color={findTier(tierSelect(item.point))}
                          />{" "}
                          {item.replyer}
                        </span>
                      )}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        paddingRight: "10px",
                        width: "180px",
                      }}
                    >
                      {item == null
                        ? null
                        : item.rdate === "2021/00/00"
                        ? null
                        : String(
                            new Date(+new Date(item.rdate) + 3240 * 10000)
                              .toISOString()
                              .replace("T", " ")
                              .replace(/\..*/, "")
                          )}
                    </span>
                    <AiFillLike
                      onClick={async (e) => {
                        let like = document.getElementById("like");
                        let dislike = document.getElementById("dislike");
                        console.log(like);
                        await axios({
                          url: "/Rlike",
                          method: "get",
                          params: {
                            mno: userInfo.mno,
                            bno: item.bno,
                            rno: item.rno,
                          },
                        }).then((res) => {
                          readReplyList();
                        });

                        if (like.getAttribute("class") === "") {
                          dislike.setAttribute("class", "");
                          like.setAttribute("class", "active");
                        } else if (like.getAttribute("class") === "active") {
                          like.setAttribute("class", "");
                        }
                      }}
                      style={{ color: "#EA5455", cursor: "pointer" }}
                    />
                    <span
                      style={{
                        display: "inline-block",
                        paddingRight: "10px",
                      }}
                    >
                      {item == null ? null : item.rlike}
                    </span>
                    <AiFillDislike
                      onClick={async (e) => {
                        let like = document.getElementById("like");
                        let dislike = document.getElementById("dislike");
                        console.log(dislike);
                        await axios({
                          url: "/Rdislike",
                          method: "get",
                          params: {
                            mno: userInfo.mno,
                            bno: item.bno,
                            rno: item.rno,
                          },
                        }).then((res) => {
                          readReplyList();
                        });

                        if (dislike.getAttribute("class") === "") {
                          like.setAttribute("class", "");
                          dislike.setAttribute("class", "active");
                        } else if (dislike.getAttribute("class") === "active") {
                          dislike.setAttribute("class", "");
                        }
                      }}
                      style={{ color: "#F07B3F", cursor: "pointer" }}
                    />
                    <span
                      style={{
                        display: "inline-block",
                        paddingRight: "10px",
                      }}
                    >
                      {item == null ? null : item.rdislike}
                    </span>
                    {!checkUser ? null : (
                      <span
                        id={item == null ? "" : item.rno}
                        onClick={async (e) => {
                          let target = e.currentTarget;
                          console.log(parseInt(target.id));
                          console.log(item.bno);

                          await axios({
                            url: "/DeleteReply",
                            method: "delete",
                            params: {
                              rno: parseInt(target.id),
                              bno: item.bno,
                              replyer: item.replyer,
                            },
                          })
                            .then((res) => {
                              console.log(res.data);
                              dispatch({
                                type: "deleteReply",
                                payload: res.data,
                              });
                            })
                            .catch((err) => {
                              console.log(err);
                              navigate("/login");
                            });
                        }}
                        style={{
                          display: "inline-block",
                          marginTop: "-5px",
                          cursor: "pointer",
                        }}
                      >
                        <MdDeleteForever />
                      </span>
                    )}
                  </div>
                </Reply>
              ))}
          </div>
        </div>
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            pageCount={pageCount}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel=""
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  }
  // end pagination
  return (
    <div>
      <PaginatedItems itemsPerPage={6} />
    </div>
  );
};

export default ReplyPagination;
