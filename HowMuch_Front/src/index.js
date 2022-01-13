import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";

// cookie

let csrf = new Cookies().get("XSRF-TOKEN");
console.log(csrf);

// end cookie

// axios.defaults.xsrfCookieName = "XSRF-TOKEN";
// axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";
// axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

let board = "";

let oneBoard = "";

let reply = "";

let hotBoard = "";

let value = "";

let calculate = "";

let likecolor = "";

// const login = async (username, password) => {
//   await axios
//     .post(API_URL + "/login", {
//       username: username,
//       password: password,
//     })
//     .then((result) => {
//       console.log("success login");
//       console.log(result.data);
//     })
//     .catch((error) => {
//       console.log("login error");
//       console.log(error);
//     });
// };

function boardReducer(state = board, actions) {
  if (actions.type === "readList") {
    console.log("readList");

    let copy = [...state];

    copy = actions.payload;

    return copy;
  }
  if (actions.type === "deleteBoard") {
    console.log("deleteBoard");

    let copy = [...state];

    copy = actions.payload;

    return copy;
  }

  if (actions.type === "searchList") {
    console.log("searchList");

    let copy = [...state];

    copy = actions.payload;

    return copy;
  }

  return state;
}

function oneBoardReducer(state = oneBoard, actions) {
  if (actions.type === "oneboard") {
    let copy = { ...state };

    copy = actions.payload;

    return copy;
  }
  return state;
}

function hotBoardReducer(state = hotBoard, actions) {
  if (actions.type === "readHotList") {
    let copy = [...state];

    copy = actions.payload;

    return copy;
  }

  if (actions.type === "searchHotList") {
    console.log("searchList");

    let copy = [...state];

    copy = actions.payload;

    return copy;
  }
  return state;
}

function replyReducer(state = reply, actions) {
  if (actions.type === "readReply") {
    let copy = [...state];

    copy = actions.payload;

    return copy;
  }
  if (actions.type === "insertReply") {
    let copy = [...state];

    copy = actions.payload;

    return copy;
  }
  if (actions.type === "deleteReply") {
    let copy = [...state];

    copy = actions.payload;

    return copy;
  }
  return state;
}

function valueReducer(state = value, actions) {
  if (actions.type === "valuelog") {
    let copy = [...state];

    copy = actions.payload;

    return copy;
  }
  return state;
}

function caculateReducer(state = calculate, actions) {
  if (actions.type === "calculate") {
    let copy = { ...state };

    copy = actions.payload;

    return copy;
  }
  if (actions.type === "resetcal") {
    let copy = { ...state };

    copy = "";

    return copy;
  }
  return state;
}

function likecolorReducer(state = likecolor, actions) {
  if (actions.type === "userlikecolor") {
    let copy = "";

    copy = { ...actions.payload };

    return copy;
  }
  return state;
}

let store = createStore(
  combineReducers({
    boardReducer,
    oneBoardReducer,
    hotBoardReducer,
    replyReducer,
    valueReducer,
    caculateReducer,
    likecolorReducer,
  })
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
