import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DeleteRounded } from "@mui/icons-material";
import "../SCSS/replypage.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { funSetContact } from "../reactRedux/action";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { linkNode } from "../nodelink";
import axios from "axios";

export default function ReplyPage() {
  // const [devices, setDevices] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    try {
      handleGetReply();
      setStatus(false);
    } catch (err) {
      console.log(err);
    }
  }, [status]);

  // const handleEditContact = (data) => {
  //   try {
  //     dispatch(funSetContact(data));
  //     navigate("../createcontact");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleGetReply = async () => {
    try {
      await axios.post(`${linkNode}/getreply`).then((res) => {
        console.log(res.data.msg);
        setMessages(res.data?.msg?.reverse());
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteReply = async (data) => {
    try {
      console.log(data);
      await axios.post(`${linkNode}/deletereply`, data).then((res) => {
        setStatus(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const HandleFrom = (data) => {
    try {
      let contacts = data?.from;
      let fromNames = [];

      for (let i = 0; i < contacts.length; i++) {
        fromNames.push(contacts[i].name);
      }
      console.log(fromNames, "fromNames");
      if (fromNames.length) {
        return fromNames.join(", ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleDeleteContacts = async (data) => {
  //   try {
  //     console.log(data);
  //     await axios.post(`${linkNode}/delcontacts`, data).then((res) => {
  //       setStatus(true);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleDeleteDuplicates = async (data) => {
  //   try {
  //     await axios.post(`${linkNode}/deldup`, data).then((res) => {
  //       setStatus(true);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="replyPage">
      <div className="header">
        <div className="headerTitle">AutoReplies</div>
        <div className="addTitle">
          <button
            className="addBtn"
            onClick={() => {
              // dispatch(funSetContact(""));
              navigate(`../createreply`);
            }}
          >
            <span className="plusBold">
              <PersonAddAlt1Icon />
            </span>
            <span className="addbtntitle">Create Reply</span>
          </button>
        </div>
      </div>
      <div className="bodyA">
        <div className="bodyAtitle contact">
          <span className="atcSpan">
            <PeopleAltIcon id="devFold" />
            AutoReplies
          </span>
          <span className="atdSpan"></span>
        </div>

        <div className="tableDiv">
          <table className="tableDevices">
            <thead className="theadDev">
              <tr>
                <td className="thA">Message(Keyword)</td>
                <td className="thC">From(contacts)</td>
                <td className="thD">To(Device)</td>
                <td className="thE">ReplyType</td>
                <td className="thF">Action</td>
              </tr>
            </thead>
            <tbody>
              {messages.length &&
                messages.map((data) => {
                  return (
                    <tr>
                      <td>{data?.message}</td>
                      <td>{HandleFrom(data)}</td>
                      <td>{data.to.label}</td>
                      <td>{data.type}</td>
                      <td className="tdE">
                        <button
                          onClick={() => {
                            // handleEditContact(data);
                            navigate(`../editreply/${data._id}`);
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
                            handleDeleteReply(data);
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
