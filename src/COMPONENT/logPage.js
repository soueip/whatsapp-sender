import React, { useEffect, useState } from "react";
import { samCha, samMsgs } from "../sample";
import "../SCSS/logPage.scss";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import Select from "react-select";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import { linkNode } from "../nodelink";
import axios from "axios";

export default function LogPage() {
  const [show, setShow] = useState("Messages");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [fromSelect, setFromSelect] = useState(null);
  const [toSelect, setToSelect] = useState(null);

  useEffect(() => {
    try {
      handleGetDevicesApi();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      console.log(show);
      setFromSelect(null);
      setToSelect(null);
    } catch (err) {
      console.log(err);
    }
  }, [show]);

  const handleGetDevicesApi = async () => {
    try {
      await axios.post(`${linkNode}/getdevice`).then((res) => {
        //fromOptions
        let fromData = res.data.arrData;
        let finalFrom = [];

        for (let i = 0; i < fromData.length; i++) {
          finalFrom.push({
            label: fromData[i].name,
            value: fromData[i].number,
            name: fromData[i].name,
            number: fromData[i].number,
            instanceID: fromData[i].instanceID,
            token: fromData[i].token,
          });
        }
        //
        setFromOptions(finalFrom);
      });

      await axios.post(`${linkNode}/getcontacts`).then((res) => {
        //ToOptions
        let toData = res.data?.msgArr?.reverse();
        let toFrom = [];

        for (let i = 0; i < toData.length; i++) {
          toFrom.push({
            label: toData[i].name,
            value: toData[i].number,
            name: toData[i].name,
            number: toData[i].number,
          });
        }
        //
        setToOptions(toFrom);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogMessages = async (obj) => {
    try {
      await axios.post(`${linkNode}/logmsg`, obj).then((res) => {
        let msgArr = res?.data?.message?.messages;
        setMessages(msgArr);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogChats = async () => {
    try {
      console.log(fromSelect, toSelect);
      await axios
        .post(`${linkNode}/logchat`, { fromSelect, toSelect })
        .then((res) => {
          console.log(res.data.message);
          let msgArr = res?.data?.message;
          setChats(msgArr?.reverse());
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="logPage">
      <div className="header">
        <div className="headerTitle">Message Logs</div>
      </div>
      <div className="bodyA">
        <div className="buttonsDiv">
          <div
            className="chatBtn"
            onClick={() => {
              setShow("Messages");
            }}
          >
            <span className="iconSpan">
              <ChatBubbleOutlineIcon id="chatIcon" />
            </span>
            <span className="textSpan">Messages</span>
          </div>
          <div
            className="chatBtn"
            onClick={() => {
              setShow("Chats");
            }}
          >
            <span className="iconSpan">
              <ChatBubbleOutlineIcon id="chatIcon" />
            </span>
            <span className="textSpan">Chats</span>
          </div>
        </div>

        {show === "Messages" ? (
          <div className="bodyB">
            <div className="headFromTo">
              <div className="bodyAtitle">
                <PeopleAltIcon id="devFold" />
                Messages
              </div>
              <div className="fromParent">
                <div className="fromDiv">
                  <SendIcon id="fromIcon" />
                  <Select
                    placeholder="From"
                    id="selectTag"
                    onChange={(e) => {
                      handleLogMessages(e);
                    }}
                    options={fromOptions}
                  />
                </div>
              </div>
            </div>
            <div className="tableDiv">
              <table className="tableDevices">
                <thead className="theadDev">
                  <tr>
                    <th className="thA">To</th>
                    <th className="thB">Status</th>
                    <th className="thC">CreatedAt</th>
                    <th className="thD">Type</th>
                    <th className="thE">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {messages?.length &&
                    messages.map((data) => {
                      return (
                        <tr>
                          <td>{data.to}</td>
                          <td>{data.status}</td>
                          <td>{data["created_at"]}</td>
                          <td>{data.type}</td>
                          <td>
                            {data.body
                              ? data.body
                              : data.metadata
                              ? JSON.stringify(data.metadata)
                              : ""}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bodyB">
            <div className="headFromTo">
              <div className="bodyAtitle">
                <PeopleAltIcon id="devFold" />
                Chats
              </div>
              <div className="fromParent">
                <div className="fromDiv">
                  <SendIcon id="fromIcon" />
                  <Select
                    placeholder="From"
                    id="selectTag"
                    onChange={setFromSelect}
                    options={fromOptions}
                  />
                </div>
              </div>
              <div className="toParent">
                <div className="fromDiv">
                  <CallReceivedIcon id="fromIcon" />
                  <Select
                    placeholder="To"
                    id="selectTag"
                    onChange={setToSelect}
                    options={toOptions}
                  />
                </div>
              </div>
              <div className="toDiv send">
                <div
                  className="sendDivbtn"
                  onClick={() => {
                    handleLogChats();
                  }}
                >
                  <span className="sendIconSpan">
                    <SendIcon id="sendIcon" />
                  </span>
                  <span className="spanTitle">GET</span>
                </div>
              </div>
            </div>
            <div className="tableDiv">
              <table className="tableDevices">
                <thead className="theadDev">
                  <tr>
                    <th className="thB">Time</th>
                    <th className="thC" style={{ width: "80%" }}>
                      Body
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chats?.length &&
                    chats.map((data) => {
                      return (
                        <tr>
                          <td>{data.timestamp}</td>
                          <td>
                            {data.body ? data.body : data.type ? data.type : ""}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
