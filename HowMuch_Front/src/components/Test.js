import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Test = () => {
  let [test, testChange] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await axios.get("http://localhost:8181/sample/read");
    console.log(JSON.stringify(data.data));
    testChange(data.data);
  };

  console.log(test);

  let one = document.getElementById("one");
  let two = document.getElementById("two");

  let navigate = useNavigate();

  return (
    <div>
      <p id="one">이름</p>
      <p id="two">나이</p>
      <button
        onClick={() => {
          console.log(test);

          one.innerHTML = test.name;
          two.innerHTML = test.age;
        }}
      >
        ajaxRead
      </button>
      <button
        onClick={async () => {
          await axios
            .post("http://localhost:8181/sample/update", {
              name: test.name,
              age: test.age < 30 ? test.age + 1 : 20,
            })
            .then((result) => {
              console.log("update!");
              console.log(result.data);
              testChange(result.data);
              console.log(test);

              one.innerHTML = test.name;
              two.innerHTML = test.age;
            });
        }}
      >
        ajaxUpdate
      </button>
      <div>
        <button
          onClick={() => {
            navigate("/testlist");
          }}
        >
          깃허브 원격 가자
        </button>
      </div>
    </div>
  );
};

export default Test;
