import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMassage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMassage();
  const [form, setForm] = useState({ email: " ", password: " " });
  const { loading, req, error, clearError } = useHttp();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const data = await req("api/auth/register", "POST", { ...form });
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await req("api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="s6 offset-s3">
        <h1>Shorten the link</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  className="yellow_input"
                  name="email"
                  placeholder="Enter email"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  id="pass"
                  type="password"
                  className="yellow_input"
                  name="password"
                  placeholder="Enter password"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="pass">Password</label>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn btn_sgnin yellow darken-4"
                disabled={loading}
                onClick={loginHandler}
              >
                Sing in
              </button>
              <button
                className="btn blue darken-4"
                onClick={registerHandler}
                disabled={loading}
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
