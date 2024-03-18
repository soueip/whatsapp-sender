import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DeleteRounded } from "@mui/icons-material";
import "../SCSS/addDevicePage.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { funSetContact } from "../reactRedux/action";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { linkNode } from "../nodelink";
import axios from "axios";

export default function ContactsPage() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    try {
      handleGetContacts();
      setStatus(false);
    } catch (err) {
      console.log(err);
    }
  }, [status]);

  const handleEditContact = (data) => {
    try {
      dispatch(funSetContact(data));
      navigate("../createcontact");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetContacts = async () => {
    try {
      await axios.post(`${linkNode}/getcontacts`).then((res) => {
        console.log(res.data.msgArr);
        setDevices(res.data?.msgArr?.reverse());
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteContacts = async (data) => {
    try {
      console.log(data);
      await axios.post(`${linkNode}/delcontacts`, data).then((res) => {
        setStatus(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteDuplicates = async (data) => {
    try {
      await axios.post(`${linkNode}/deldup`, data).then((res) => {
        setStatus(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="contactsPage">
      <div className="header">
        <div className="headerTitle">Contacts</div>
        <div className="addTitle">
          <button
            className="addBtn bulk"
            onClick={() => {
              dispatch(funSetContact(""));
              navigate("../bulkcreatecontact");
            }}
          >
            <span className="plusBold bulk">
              <GroupAddIcon />
            </span>
            <span className="addbtntitle">Add Bulk</span>
          </button>
          <button
            className="addBtn"
            onClick={() => {
              dispatch(funSetContact(""));
              navigate("../createcontact");
            }}
          >
            <span className="plusBold">
              <PersonAddAlt1Icon />
            </span>
            <span className="addbtntitle">Add Contact</span>
          </button>
        </div>
      </div>
      <div className="bodyA">
        <div className="bodyAtitle contact">
          <span className="atcSpan">
            <PeopleAltIcon id="devFold" />
            Contacts
          </span>
          <span className="atdSpan">
            <button
              className="rocketBtn"
              style={{ backgroundColor: "#f15438" }}
              onClick={() => {
                handleDeleteDuplicates();
              }}
            >
              <span className="rocketIcon">
                <DeleteRounded id="rocketIcon" />
              </span>
              <span className="rocketTitle">Delete Duplicates</span>
            </button>
          </span>
        </div>

        <div className="tableDiv">
          <table className="tableDevices">
            <thead className="theadDev">
              <tr>
                <td></td>
                <td className="thA">
                  <PeopleAltIcon id="devFold" />
                  Contact
                </td>
                <td className="thB">Name</td>
                <td className="thB">Created</td>
                <td className="thC"></td>
              </tr>
            </thead>
            <tbody>
              {devices.map((data) => {
                return (
                  <tr>
                    <td>
                      <div className="accSpan">
                        <AccountCircleIcon id="accIcon" />
                      </div>
                    </td>
                    <td>{data.number}</td>
                    <td>{data.name}</td>
                    <td>{data.created}</td>
                    <td className="tdE">
                      <button
                        onClick={() => {
                          handleEditContact(data);
                        }}
                        className="rocketBtn"
                        style={{ backgroundColor: "yellow" }}
                      >
                        <span className="rocketIcon">
                          <ModeEditIcon id="rocketIcon" />
                        </span>
                        <span className="rocketTitle">Edit</span>
                      </button>
                      <button
                        className="rocketBtn"
                        style={{ backgroundColor: "#f15438" }}
                        onClick={() => {
                          handleDeleteContacts(data);
                        }}
                      >
                        <span className="rocketIcon">
                          <DeleteRounded id="rocketIcon" />
                        </span>
                        <span className="rocketTitle">Delete</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
