import React, { useEffect, useState } from "react";
import "../SCSS/contactsPage.scss";
import PersonIcon from "@mui/icons-material/Person";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { linkNode } from "../nodelink";

export default function CreateContactPage() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.contactReducer);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { contact } = selector;

  useEffect(() => {
    try {
      console.log(contact);
      if (contact) {
        setName(contact.name);
        setNumber(contact.number);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  let handleSubmit = async () => {
    try {
      if (!contact) {
        console.log(name, number);

        let dataObj = {
          name: name,
          number: number,
        };
        await axios.post(`${linkNode}/setcontacts`, dataObj).then((res) => {
          console.log(res.data.message);
          navigate("../contacts");
        });
      } else {
        console.log(name, number);

        let dataObj = {
          name: name,
          number: number,
        };
        await axios
          .post(`${linkNode}/editcontacts`, { dataObj, contact })
          .then((res) => {
            console.log(res.data.message);
            navigate("../contacts");
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="createContactPage">
      <div className="header">
        <div className="headerTitle">
          {contact ? "Edit Contact" : "Add new Contact"}
        </div>
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
            }}
          >
            submit
          </div>
        </div>
      </div>
    </div>
  );
}
