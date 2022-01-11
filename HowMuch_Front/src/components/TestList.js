import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TestList = () => {
  let [list, listChange] = useState([
    { id: 1, name: "A", age: 1 },
    { id: 2, name: "B", age: 2 },
    { id: 3, name: "C", age: 3 },
    { id: 4, name: "D", age: 4 },
    { id: 5, name: "E", age: 5 },
    { id: 6, name: "F", age: 6 },
  ]);

  const serverURL = "http://localhost:8181";

  const getData = async () => {
    let data = await axios.get(serverURL + "/sample/readList");
    console.log(JSON.stringify(data.data));
    listChange(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  let Card = styled("div")`
    padding: 20px 20px;
  `;

  let CardLine = styled("span")`
    border-bottom: 1px solid #333;
  `;

  console.log(list.length);
  console.log(list[list.length - 1].id);

  // console.log(document.getElementById("name").value);

  return (
    <div>
      <div className="container-lg" style={{ marginTop: "100px" }}>
        <div className="row">
          {list.map((item, index) => {
            return (
              <Card className="col-md-4" key={index}>
                <div style={{ border: "3px solid #333" }}>
                  <p>
                    <CardLine>{item.name}</CardLine>
                  </p>
                  <p>
                    <CardLine>{item.age}</CardLine>
                  </p>
                  <button>수정</button>
                  <button
                    onClick={async () => {
                      console.log(item.id);
                      await axios
                        .delete(serverURL + "/sample/delete?id=" + item.id)
                        .then((result) => {
                          listChange(result.data);
                        });
                    }}
                  >
                    삭제
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
        <div>
          <input id="name" type="text" placeholder="이름을 입력해주세요" />
          <br />
          <input id="age" type="text" placeholder="나이를 입력해주세요" />
        </div>
        <button
          onClick={async () => {
            let lastId = list[list.length - 1].id;

            let name = document.getElementById("name").value;

            let age = document.getElementById("age").value;

            console.log(name);
            console.log(age);

            await axios
              .post(serverURL + "/sample/register", {
                id: lastId,
                name: name,
                age: age,
              })
              .then((result) => {
                listChange(result.data);
                console.log("등록성공!");
              });
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default TestList;
