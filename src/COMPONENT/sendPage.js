import React, { useEffect, useState } from "react";
import "../SCSS/sendPage.scss";
import { Grid } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MultiSelect } from "react-multi-select-component";
import SendIcon from "@mui/icons-material/Send";
import Select from "react-select";
import { linkNode } from "../nodelink";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { data } from "@tensorflow/tfjs";
import { useParams } from "react-router-dom";

export default function SendPage() {
  const [show, setShow] = useState("chat");
  const [selected, setSelected] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { label: "Grapes", value: "grapes" },
    { label: "Mango", value: "mango" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Grapes1", value: "grapes1" },
    { label: "Mango1", value: "mango1" },
    { label: "Strawberry1", value: "strawberry1" },
    { label: "Grapes2", value: "grapes2" },
    { label: "Mango2", value: "mango2" },
    { label: "Strawberry2", value: "strawberry2" },
    { label: "Grapes3", value: "grapes3" },
    { label: "Mango3", value: "mango3" },
    { label: "Grapes31", value: "grapes4" },
    { label: "Mango4", value: "mango4" },
    { label: "Grapes4", value: "grapes5" },
    { label: "Mango5", value: "mango5" },
    { label: "Grapes5", value: "grapes7" },
    { label: "Mango6", value: "mango7" },
  ];
  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [devices, setDevices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [base, setBase] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [latText, setLatText] = useState("");
  const [lgnText, setLgnText] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const params = useParams();
  const [siteID, setSiteID] = useState(false);

  useEffect(() => {
    try {
      console.log(params);
      if (params?.id) {
        setSiteID(true);
      }
      handleGetDevicesApi();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const handleGetDevicesApi = async () => {
    try {
      await axios.post(`${linkNode}/getdevice`).then((res) => {
        setDevices(res.data.arrData);
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
        setContacts(res.data?.msgArr?.reverse());
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

  const handleSend = async () => {
    try {
      console.log(
        // selected,
        // selectedOption,
        // show,
        // bodyText,
        // latText,
        // lgnText,
        // base,
        docTitle
      );
      let dataObj = {
        from: selectedOption,
        to: selected,
        file: base.toString(),
        fileName: docTitle,
        body: bodyText,
        lat: latText,
        lng: lgnText,
        type: show,
      };
      await axios.post(`${linkNode}/sendmsg`, dataObj).then((res) => {
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sendPage">
      <div className="header">
        <div className="headerTitle">Send Message</div>
      </div>
      <div className="bodyA">
        <div className="gridA">
          <Grid container>
            <Grid item xs={2}>
              <div className="buttonsDiv">
                <div
                  className="chatBtn"
                  onClick={() => {
                    setShow("chat");
                  }}
                >
                  <span className="iconSpan">
                    <ChatBubbleOutlineIcon id="chatIcon" />
                  </span>
                  <span className="textSpan">Chat</span>
                </div>
                <div
                  className="chatBtn"
                  onClick={() => {
                    setShow("document");
                  }}
                >
                  <span className="iconSpan">
                    <ArticleIcon id="chatIcon" />
                  </span>
                  <span className="textSpan">Document</span>
                </div>
                <div
                  className="chatBtn"
                  onClick={() => {
                    setShow("image");
                  }}
                >
                  <span className="iconSpan">
                    <ImageIcon id="chatIcon" />
                  </span>
                  <span className="textSpan">Image</span>
                </div>
                <div
                  className="chatBtn"
                  onClick={() => {
                    setShow("video");
                  }}
                >
                  <span className="iconSpan">
                    <VideoFileIcon id="chatIcon" />
                  </span>
                  <span className="textSpan">Video</span>
                </div>
                <div
                  className="chatBtn"
                  onClick={() => {
                    setShow("audio");
                  }}
                >
                  <span className="iconSpan">
                    <AudioFileIcon id="chatIcon" />
                  </span>
                  <span className="textSpan">Audio</span>
                </div>
                <div
                  className="chatBtn"
                  onClick={() => {
                    setShow("contact");
                  }}
                >
                  <span className="iconSpan">
                    <ContactPageIcon id="chatIcon" />
                  </span>
                  <span className="textSpan">Contact</span>
                </div>
                <div
                  className="chatBtn"
                  onClick={() => {
                    setShow("location");
                  }}
                >
                  <span className="iconSpan">
                    <LocationOnIcon id="chatIcon" />
                  </span>
                  <span className="textSpan">Location</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={10}>
              <div className="contentDiv">
                <div className="head">
                  {show.charAt(0).toUpperCase() + show.slice(1)}
                </div>
                <div className="headContent">
                  <div className="toDiv">
                    <div className="spanA">To:</div>
                    <div className="spanB">
                      <MultiSelect
                        id="multiSelect"
                        options={toOptions}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                      />
                    </div>
                  </div>

                  <div className="toDiv">
                    <div className="spanA">From:</div>
                    <div className="spanB">
                      <Select
                        placeholder="From"
                        id="selectTag"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={fromOptions}
                      />
                    </div>
                  </div>

                  {show === "chat" ? (
                    <>
                      <div className="toDiv">
                        <div className="spanA">Body:</div>
                        <div className="spanB">
                          <textarea
                            className="textArea"
                            value={bodyText}
                            onChange={(e) => {
                              setBodyText(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {show === "document" ||
                  show === "video" ||
                  show === "image" ? (
                    <>
                      <div className="toDiv">
                        <div className="spanA">
                          {show.charAt(0).toUpperCase() + show.slice(1)}:
                        </div>
                        <div className="spanB">
                          <FileBase64
                            onDone={(e) => {
                              console.log(e);
                              console.log(e.name);
                              setDocTitle(e.name);
                              console.log(e.base64);
                              setBase(e.base64);
                            }}
                          />
                          {/* <input type="file" className="fileInput" /> */}
                        </div>
                      </div>

                      <div className="toDiv">
                        <div className="spanA">Body:</div>
                        <div className="spanB">
                          <textarea
                            className="textArea"
                            value={bodyText}
                            onChange={(e) => {
                              setBodyText(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {show === "audio" ? (
                    <>
                      <div className="toDiv">
                        <div className="spanA">
                          {show.charAt(0).toUpperCase() + show.slice(1)}:
                        </div>
                        <div className="spanB">
                          <FileBase64
                            onDone={(e) => {
                              setBase(e.base64);
                            }}
                          />
                          {/* <input type="file" className="fileInput" /> */}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {show === "contact" ? (
                    <>
                      <div className="toDiv">
                        <div className="spanA">Contact:</div>
                        <div className="spanB">
                          <input
                            type="text"
                            className="contactText"
                            value={bodyText}
                            onChange={(e) => {
                              setBodyText(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {show === "location" ? (
                    <>
                      <div className="toDiv">
                        <div className="spanA">Lat:</div>
                        <div className="spanB">
                          <input
                            type="text"
                            className="contactText"
                            value={latText}
                            onChange={(e) => {
                              setLatText(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="toDiv">
                        <div className="spanA">Lng:</div>
                        <div className="spanB">
                          <input
                            type="text"
                            className="contactText"
                            value={lgnText}
                            onChange={(e) => {
                              setLgnText(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="toDiv">
                        <div className="spanA">Body:</div>
                        <div className="spanB">
                          <textarea
                            className="textArea"
                            value={bodyText}
                            onChange={(e) => {
                              setBodyText(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="toDiv send">
                    <div
                      className="sendDivbtn"
                      onClick={() => {
                        handleSend();
                      }}
                    >
                      <span className="sendIconSpan">
                        <SendIcon id="sendIcon" />
                      </span>
                      <span className="spanTitle">send</span>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
