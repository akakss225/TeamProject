import React, { useEffect, useState } from "react";
import { SiCashapp } from "react-icons/si";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ItemCard from "./ItemCard";
import { FaSearch } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let TopTitle = styled("p")`
  font-size: 48px;
`;

let Line = styled("div")`
  width: 80%;
  height: 5px;
  background-color: #2d4059;
  margin: 0 auto;
`;

const BoardMain = () => {
  let dispatch = useDispatch();

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

  let [checkUser, SetCheckUser] = useState("");

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

  // const readHotList = async () =>{
  //   await axios.get("http://localhost:8181/readList")
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    checkLogin();
    readList();
  }, []);

  let state = useSelector((state) => {
    return state;
  });

  let boardState = state.boardReducer;

  // pagination data
  const items = boardState;

  let [select, SetSelect] = useState("");
  let [search, SetSearch] = useState("");

  const typeChanger = (select) => {
    if (select === "제목") {
      return "title";
    } else if (select === "내용") {
      return "content";
    } else if (select === "작성자") {
      return "writer";
    } else if (select === "태그") {
      return "tag";
    }
  };

  let navigate = useNavigate();

  // pagination
  function Items({ currentItems }) {
    return (
      <>
        <div className="container-lg" style={{ margin: "50px auto" }}>
          <div className="row">
            {currentItems === "" ? (
              <p style={{ fontSize: "32px" }}>아직 등록된 게시물이 없습니다.</p>
            ) : (
              currentItems &&
              currentItems.map((item, index) => (
                <div
                  className="col-lg-4 d-flex justify-content-center"
                  key={index}
                  onClick={() => {
                    navigate("/detail/" + item.bno);
                    console.log(item);
                  }}
                >
                  <ItemCard item={item} />
                </div>
              ))
            )}
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
        <div style={{ display: "flex", justifyContent: "center" }}>
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
            <TopTitle>Check items & Feed back</TopTitle>
          </div>
        </div>
      </div>
      <Line></Line>
      <div
        className="container-lg"
        style={{
          padding: "30px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "20px" }}>
            <select
              id="tagSelect"
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                SetSelect(
                  typeChanger(e.target.options[e.target.selectedIndex].text)
                );
              }}
            >
              <option defaultValue>검색항목</option>
              <option value="1">제목</option>
              <option value="2">내용</option>
              <option value="3">작성자</option>
              <option value="4">태그</option>
            </select>
          </div>
          <input id="search" type="text" placeholder="검색어를 입력해주세요" />
          <FaSearch
            onClick={async () => {
              let search = document.getElementById("search").value;
              SetSearch(search);

              console.log(search, select);

              if (search === "" && select === "") {
                console.log("검색항목을 선택하고 검색어를 입력해주세요");
                return;
              }

              await axios({
                url: "/getSearchList",
                method: "get",
                params: {
                  type: select,
                  keyword: search,
                },
              }).then((res) => {
                console.log(res.data);
                dispatch({
                  type: "searchList",
                  payload: res.data,
                });
              });
            }}
            style={{ fontSize: "24px", marginLeft: "10px", cursor: "pointer" }}
          />
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <Button
            onClick={() => {
              if (checkUser) {
                navigate("/register");
              } else {
                navigate("/login");
              }
            }}
          >
            글등록
          </Button>
        </div>
      </div>
      <PaginatedItems itemsPerPage={6} />
    </div>
  );
};

export default BoardMain;
