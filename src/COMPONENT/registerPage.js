import React from "react";
import SpaIcon from "@mui/icons-material/Spa";
import MailIcon from "@mui/icons-material/Mail";
import KeyIcon from "@mui/icons-material/Key";
import LoginIcon from "@mui/icons-material/Login";
import "../SCSS/registerPage.scss";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="registerPage">
        <div className="regisPage">
          <div className="title">
            <span className="titleSpanA">
              <SpaIcon id="spaIcon" />
            </span>
            <span className="titleSpanA">
              WA<span className="senderSpan">sender</span>
            </span>
          </div>
          <div className="welcome">Welcome</div>
          <div className="signInTitle">Sign into your account</div>
          <div className="mailDiv">
            <div className="mailInputDiv">
              <span className="mailSpan">
                <MailIcon id="mailIcon" />
              </span>
              <input type="text" className="mailInput" />
            </div>
          </div>
          <div className="passwordDiv">
            <div className="passwordInputDiv">
              <span className="passwordSpan">
                <KeyIcon />
              </span>
              <input type="text" className="passwordInput" />
            </div>
          </div>
          <div className="forgot">Forgot Password ?</div>
          <div
            className="signInDiv"
            onClick={() => {
              navigate("/filearea/dashboard");
            }}
          >
            Sign In
          </div>
          <div className="noDiv">
            <hr></hr>
            <span className="noDivTitle">Don't have an Account?</span>
          </div>
          <div className="signUpDiv">Sign Up</div>
        </div>
      </div>
    </>
  );
}
