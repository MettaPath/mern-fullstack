import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const CreatePage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { req } = useHttp();
  const [link, setLink] = useState("");

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await req(
          "/api/link/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
        navigate(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2 col_create"></div>
      <div className="input-field">
        <input
          id="link"
          type="text"
          placeholder="Add link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyDown={pressHandler}
        />
        <label htmlFor="link">Enter link</label>
      </div>
    </div>
  );
};
