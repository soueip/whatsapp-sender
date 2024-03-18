import React, { useEffect, useState } from "react";
import "../SCSS/contactsPage.scss";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { countryCode } from "../countryCode";
import axios from "axios";
import { linkNode } from "../nodelink";

export default function BulkContactPage() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
    } catch (err) {
      console.log(err);
    }
  }, []);

  let handleImportNumber = async () => {
    try {
      await axios.post(`${linkNode}/bulknumber`).then((res) => {
        console.log(res.data);
        navigate("../contacts");
      });
      //
    } catch (err) {
      console.log();
    }
  };

  return (
    <div className="bulkContactPage">
      <div className="header">
        <div className="headerTitle">Import Bulk Contact</div>
      </div>
      <div className="bodyA">
        <div className="bodyAhead">Import contacts from Device</div>
        <div className="inputsDivs">
          <div className="conDiv">
            <div className="conInputDiv">
              <span className="conSpan">
                <PersonIcon />
              </span>
              <select id="countrySelect" className="conInput">
                <option value="">from</option>
                {countryCode.map((data) => {
                  return <option value={data.dial_code}>{data.name}</option>;
                })}
              </select>
            </div>
          </div>

          <div
            className="submitInDiv"
            onClick={() => {
              handleImportNumber();
            }}
          >
            Import Contacts
          </div>
        </div>
      </div>
      {/* <div className="bodyB">
        <div className="bodyAhead">Import contacts from File</div>
        <div className="inputsDivs">
          <div className="conDiv">
            <div className="conInputDiv">
              <span className="conSpan">
                <InsertDriveFileIcon />
              </span>
              <input type="file" className="fileInput" />
            </div>
          </div>

          <div
            className="submitInDiv"
            onClick={() => {
              navigate("../contacts");
            }}
          >
            Import Contacts
          </div>
        </div>
      </div> */}
    </div>
  );
}
