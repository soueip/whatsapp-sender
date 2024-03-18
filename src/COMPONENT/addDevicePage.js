import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { useNavigate } from "react-router-dom";
import { linkNode } from "../nodelink";
import axios from "axios";
import "../SCSS/contactsPage.scss";

export default function AddDevicesPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    try {
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await axios
        .post(`${linkNode}/setdevice`, { name, number })
        .then((res) => {
          console.log(res.data.message);
          navigate("../devices");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addDevicesPage">
      <div className="header">
        <div className="headerTitle">Add Device</div>
      </div>
      <div className="bodyA">
        <div className="inputsDivs">
          <div className="conDiv">
            <div className="conInputDiv">
              <span className="conSpan">
                <PersonIcon />
              </span>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="conInput"
                placeholder="name"
              />
            </div>
          </div>

          <div className="conDiv">
            <div className="conInputDiv">
              <span className="conSpan">
                <DialpadIcon />
              </span>
              <input
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                type="text"
                className="conInput"
                placeholder="mobile"
              />
            </div>
          </div>
          <div
            className="submitInDiv"
            onClick={() => {
              handleSubmit();
              // navigate("../devices");
            }}
          >
            submit
          </div>
        </div>
      </div>
    </div>
  );
}
