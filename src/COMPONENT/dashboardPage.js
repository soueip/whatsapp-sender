import React from "react";
import "../SCSS/dashboardPage.scss";
import LayersIcon from "@mui/icons-material/Layers";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { useNavigate } from "react-router-dom";

export function DashBoardPage() {
  const navigate = useNavigate();
  return (
    <div className="dashBoardPage">
      <div className="header">
        <div className="headerTitle">DashBoard</div>
      </div>
      <div className="bodyA">
        <div className="bodyDash">
          <div className="activeDiv">
            <div className="activeTop">
              <div className="activeLeft">
                <div className="activeNumber">1</div>
                <div className="activeText">ACTIVE</div>
              </div>
              <div className="activeRight">
                <div className="activeIcon">
                  <LayersIcon id="actIcon" />
                </div>
              </div>
            </div>
            <div className="activeBottom">
              <div className="botText">view Details</div>
              <div className="botIcon">
                <KeyboardTabIcon
                  id="deIcon"
                  onClick={() => {
                    navigate("../devices");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="activeDiv inactive">
            <div className="activeTop inactive">
              <div className="activeLeft">
                <div className="activeNumber">1</div>
                <div className="activeText">INACTIVE</div>
              </div>
              <div className="activeRight">
                <div className="activeIcon">
                  <LayersIcon id="actIcon" />
                </div>
              </div>
            </div>
            <div className="activeBottom">
              <div className="botText">view Details</div>
              <div className="botIcon">
                <KeyboardTabIcon
                  id="deIcon"
                  onClick={() => {
                    navigate("../devices");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="activeDiv expiry">
            <div className="activeTop expiry">
              <div className="activeLeft">
                <div className="activeNumber">1</div>
                <div className="activeText">EXPIRED</div>
              </div>
              <div className="activeRight">
                <div className="activeIcon">
                  <LayersIcon id="actIcon" />
                </div>
              </div>
            </div>
            <div className="activeBottom">
              <div className="botText">view Details</div>
              <div className="botIcon">
                <KeyboardTabIcon
                  id="deIcon"
                  onClick={() => {
                    navigate("../devices");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
