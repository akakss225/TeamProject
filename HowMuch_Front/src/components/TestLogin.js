import React from "react";

const TestLogin = () => {
  return (
    <div>
      <div>
        <form id="form" method="post" action="http://localhost:8181/login">
          <fieldset>
            <div class="form-group">
              <input
                id="ID"
                class="form-control"
                placeholder="ID"
                name="username"
                type="text"
                autofocus
              />
            </div>
            <div class="form-group">
              <input
                id="PW"
                class="form-control"
                placeholder="PW"
                name="password"
                type="password"
              />
            </div>
            <div class="checkbox">
              <label>
                <input name="remember-me" type="checkbox" />
                Remember Me
              </label>
            </div>
            <button class="btn btn-lg btn-success btn-block">Login</button>
          </fieldset>
          <input
            type="hidden"
            name="${_csrf.parameterName }"
            value="${_csrf.token }"
          />
        </form>
      </div>
    </div>
  );
};

export default TestLogin;
