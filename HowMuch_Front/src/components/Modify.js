import React, { useEffect, useState } from "react";
import { SiCashapp } from "react-icons/si";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import { RiFileUploadFill } from "react-icons/ri";

const Modify = () => {
  let navigate = useNavigate();

  // cookie

  let csrf = new Cookies().get("XSRF-TOKEN");
  console.log(csrf);

  // end cookie

  let dispatch = useDispatch();

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

  useEffect(() => {
    window.scrollTo(0, 0);
    readList();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [titleCheck, SettitleCheck] = useState(false);

  const [contentCheck, SetcontentCheck] = useState(false);

  const [suggestCheck, SetsuggestCheck] = useState(false);

  const [imageCheck, SetimageCheck] = useState(false);

  const checkValue = (input) => {
    console.log(input.value);

    return input.value;
  };

  const resetShow = () => {
    SettitleCheck(false);
    SetcontentCheck(false);
    SetsuggestCheck(false);
    SetimageCheck(false);
  };

  let { bno } = useParams();
  console.log(bno);

  let state = useSelector((state) => {
    return state;
  });

  let boardState = state.boardReducer;

  let findItemBoard =
    boardState === ""
      ? null
      : boardState.find((item) => {
          return item.bno === parseInt(bno);
        });

  console.log(findItemBoard);

  let item = findItemBoard;

  let currentWidth = document.documentElement.clientWidth;

  // resize screen

  let [flexdir, Setflexdir] = useState("row nowrap");

  useEffect(() => {
    if (currentWidth > 1200) {
      Setflexdir("row nowrap");
    }
    if (currentWidth <= 1200) {
      Setflexdir("column nowrap");
    }
  }, [flexdir, currentWidth]);

  window.addEventListener("resize", () => {
    let screenWidth = document.documentElement.clientWidth;

    if (screenWidth <= 1200) {
      Setflexdir("column nowrap");
    }

    if (screenWidth > 1200) {
      Setflexdir("row nowrap");
    }
  });

  ///end resize screen

  // styled component
  let TopTitle = styled("p")`
    font-size: 48px;
  `;

  let Label = styled("div")`
    font-size: 48px;
    text-align: center;
    display: inline-block;
    width: 300px;
  `;

  let Warn = styled("p")`
    color: red;
  `;

  let Line = styled("div")`
    width: 80%;
    height: 5px;
    background-color: #2d4059;
    margin: 0 auto;
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
            <TopTitle>Check items & Feed back</TopTitle>
          </div>
        </div>
      </div>
      <Line></Line>
      <div className="container">
        <div className="row">
          <div
            className="col d-flex flex-column justify-content-center align-items-center"
            style={{ paddingTop: "80px" }}
          >
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>??????</Label>
              <input
                id="TITLE"
                type="text"
                placeholder="????????? ???????????????"
                defaultValue={item == null ? null : item.title}
                style={{
                  width: "400px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
            </div>
            {titleCheck ? <Warn>????????? ??????????????????.</Warn> : null}
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>
                ?????? ??????
                <br />
                (????????????)
              </Label>
              <div
                style={{
                  width: "450px",
                  height: "400px",
                  fontSize: "20px",
                  border: "1px solid #666",
                  borderRadius: "3px",
                  overflow: "auto",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "20px 0",
                    marginBottom: "30px",
                    borderBottom: "3px solid #EA5455",
                  }}
                >
                  <label for="ATTACH">
                    <RiFileUploadFill
                      color="#EA5455"
                      size="35px"
                      cursor="pointer"
                    />
                  </label>
                  <span> ???? ????????? ????????? ?????? ?????? 4???????????? ???????????????!</span>
                </div>
                {imageCheck ? (
                  <Warn>????????? ??? ?????? ?????? 4???????????? ????????? ???????????????!!</Warn>
                ) : null}
                <input
                  id="ATTACH"
                  type="file"
                  hidden="true"
                  multiple="multiple"
                  accept=".jpg, .jpeg, .png, .svg+xml"
                  onChange={(e) => {
                    console.log("change!");

                    let imgBoxDiv = document.querySelectorAll("#imgBox div");

                    for (let i = 0; i < imgBoxDiv.length; i++) {
                      imgBoxDiv[i].parentNode.removeChild(imgBoxDiv[i]);
                    }

                    let fileArr = [...e.target.files];

                    // fileArr = [file(),file(),file()]

                    console.log(fileArr.length);

                    if (fileArr.length >= 5) {
                      SetimageCheck(true);
                      return;
                    } else {
                      SetimageCheck(false);
                    }

                    let base64Arr = [];

                    let base64Obj = {};

                    fileArr.forEach((item, index) => {
                      let reader = new FileReader();

                      let imgBox = document.getElementById("imgBox");
                      let div = document.createElement("div");
                      let image = document.createElement("img");
                      let del = document.createElement("span");

                      div.style = "display:flex;";

                      del.textContent = "???";
                      del.style =
                        "font-size: 30px; color: #EA5455; margin-left:10px; margin-top:-10px; cursor: pointer";
                      del.addEventListener("click", (e) => {
                        console.log(e.target.parentNode.parentNode);
                        e.target.parentNode.parentNode.removeChild(div);
                      });

                      reader.onload = (e) => {
                        let dataURL = reader.result;
                        // console.log(typeof reader.result);
                        base64Arr.push(dataURL);
                        image.src = dataURL;
                        image.style =
                          "width: 350px; display: block; margin-bottom: 20px";

                        imgBox.appendChild(div);
                        div.appendChild(image);
                        div.append(del);
                      };

                      reader.readAsDataURL(item);

                      // console.log(base64Arr);
                      // console.log(typeof base64Arr);
                      // console.log(base64Arr[0]);
                    });
                  }}
                  style={{ width: "400px", margin: "20px 0" }}
                />
                <div
                  id="imgBox"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexFlow: "column wrap",
                  }}
                >
                  {item === null
                    ? null
                    : item.imageList === null
                    ? null
                    : item.imageList.map((item, index) => {
                        return (
                          <div id={"div" + index} style={{ display: "flex" }}>
                            <img
                              src={item}
                              alt="img"
                              style={{
                                width: "350px",
                                display: "block",
                                marginBottom: "20px",
                              }}
                            />
                            <span
                              onClick={(e) => {
                                let div = document.getElementById(
                                  "div" + index
                                );
                                console.log(
                                  e.currentTarget.parentNode.parentNode
                                );
                                e.currentTarget.parentNode.parentNode.removeChild(
                                  div
                                );
                              }}
                              style={{
                                fontSize: "30px",
                                color: "#EA5455",
                                marginLeft: "10px",
                                marginTop: "-10px",
                                cursor: "pointer",
                              }}
                            >
                              ???
                            </span>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>??????</Label>
              <textarea
                id="CONTENT"
                placeholder="?????? ????????? ???????????????"
                defaultValue={item == null ? null : item.content}
                style={{
                  width: "450px",
                  height: "400px",
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              />
            </div>
            {contentCheck ? <Warn>????????? ??????????????????.</Warn> : null}
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>
                ?????????
                <br />
                (????????????)
              </Label>
              <input
                id="SUGGESTION"
                type="text"
                placeholder="????????? ????????? ??????????????? (????????????)"
                defaultValue={
                  item == null ? null : item.suggestion ? item.suggestion : null
                }
                style={{
                  width: "400px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
            </div>
            {suggestCheck ? (
              <Warn style={{ marginLeft: "-80px" }}>
                ????????? ????????? ???????????????.
              </Warn>
            ) : null}
            <div
              style={{
                display: "flex",
                width: "80%",
                paddingTop: "30px",
                alignItems: "center",
                flexFlow: flexdir,
              }}
            >
              <Label>
                ?????? (??????3???)
                <br />
                (????????????)
              </Label>
              <input
                id="TAG1"
                type="text"
                placeholder="?????? ?????????"
                defaultValue={
                  item == null
                    ? null
                    : item.tagList[0] === "not" || !item.tagList[0]
                    ? null
                    : item.tagList[0]
                }
                style={{
                  width: "150px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
              <input
                id="TAG2"
                type="text"
                placeholder="?????? ?????????"
                defaultValue={
                  item == null ? null : item.tagList[1] ? item.tagList[1] : null
                }
                style={{
                  width: "150px",
                  height: "50px",
                  margin: "20px",
                  fontSize: "20px",
                }}
              />
              <input
                id="TAG3"
                type="text"
                placeholder="?????? ?????????"
                defaultValue={
                  item == null ? null : item.tagList[2] ? item.tagList[2] : null
                }
                style={{
                  width: "150px",
                  height: "50px",
                  fontSize: "20px",
                }}
              />
            </div>
            <div
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
                onClick={async () => {
                  let thumbnailURL = "";
                  let postImgURL = [];

                  let attachImgBox = document.querySelectorAll("#imgBox img");

                  if (attachImgBox.length > 0) {
                    let arrAttachImgBox = [...attachImgBox];

                    let thumbnailImgTag = attachImgBox[0];

                    console.log(attachImgBox);

                    thumbnailURL = thumbnailImgTag.src;

                    console.log(thumbnailURL);

                    postImgURL = arrAttachImgBox.map((item, index) => {
                      return item.src;
                    });

                    console.log(postImgURL);
                  }

                  resetShow();

                  let titleInput = document.getElementById("TITLE");
                  let contentInput = document.getElementById("CONTENT");
                  let suggestInput = document.getElementById("SUGGESTION");
                  let tag1Input = document.getElementById("TAG1");
                  let tag2Input = document.getElementById("TAG2");
                  let tag3Input = document.getElementById("TAG3");

                  let tagArr = [];

                  if (tag1Input.value) {
                    tagArr.push(tag1Input.value);
                  }
                  if (tag2Input.value) {
                    tagArr.push(tag2Input.value);
                  }
                  if (tag3Input.value) {
                    tagArr.push(tag3Input.value);
                  }

                  console.log(tagArr);

                  // console.log(titleInput);

                  let number = /[0-9]/; // ?????? ??????

                  if (!checkValue(titleInput)) {
                    SettitleCheck(true);
                    return;
                  }
                  if (!checkValue(contentInput)) {
                    SetcontentCheck(true);
                    return;
                  }

                  if (checkValue(suggestInput)) {
                    if (!number.test(suggestInput.value)) {
                      SetsuggestCheck(true);
                      suggestInput.value = "";
                      return;
                    }
                  }

                  console.log(
                    typeof contentInput.value.replace(
                      /(?:\r\n|\r|\n)/g,
                      "<br/>"
                    )
                  );

                  await axios({
                    url: "/update",
                    method: "post",
                    data: {
                      bno: bno,
                      title: titleInput.value,
                      content: contentInput.value,
                      imageList: postImgURL.length > 0 ? postImgURL : null,
                      tagList: tagArr.length > 0 ? tagArr : ["not"],
                      suggestion: suggestInput.value
                        ? suggestInput.value
                        : null,
                    },
                    headers: {
                      "XSRF-TOKEN": csrf,
                    },
                  }).then((res) => {
                    console.log(res.data);
                  });

                  handleShow();
                }}
                style={{
                  backgroundColor: "#2d4059",
                  border: "none",
                  fontSize: "24px",
                }}
              >
                ????????????
              </Button>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                style={{
                  backgroundColor: "#2d4059",
                  border: "none",
                  fontSize: "24px",
                }}
              >
                ??????
              </Button>
            </div>
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
          <Modal.Title>?????? ?????? ?????????????????????.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>???????????????????????? ????????? ???????????? ??????????????????.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/boardmain");
            }}
          >
            ??????
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modify;
