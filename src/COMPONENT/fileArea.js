import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import SendIcon from "@mui/icons-material/Send";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DevicesFoldIcon from "@mui/icons-material/DevicesFold";
import "../SCSS/fileArea.scss";
import { Button, Menu, MenuItem } from "@mui/material";
import DevicesPage from "./devicesPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ContactsPage from "./contactsPage";
import CreateContactPage from "./createContactPage";
import SendPage from "./sendPage";
import ReplyIcon from "@mui/icons-material/Reply";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LogPage from "./logPage";
import BulkContactPage from "./bulkContactPage";
import AddDevicesPage from "./addDevicePage";
import ManageDevicesPage from "./manageDevicesPage";
import { DashBoardPage } from "./dashboardPage";
import ReplyPage from "./replyPage";
import CreateReplyPage from "./createReplyPage";

export default function FileArea() {
  const drawerWidth = 250;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["DashBoard", "Devices", "Contacts", "Send", "AutoReply", "Logs"].map(
          (text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => {
                if (text === "DashBoard") {
                  navigate("./dashboard");
                } else if (text === "Devices") {
                  navigate("./devices");
                } else if (text === "Contacts") {
                  navigate("./contacts");
                } else if (text === "Send") {
                  navigate("./send");
                } else if (text === "AutoReply") {
                  navigate("./reply");
                } else if (text === "Logs") {
                  navigate("./log");
                }
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {text === "DashBoard" ? (
                    <DashboardIcon id="dashBoardIcon" />
                  ) : (
                    ""
                  )}
                  {text === "Devices" ? (
                    <DevicesFoldIcon id="devicesIcon" />
                  ) : (
                    ""
                  )}
                  {text === "Contacts" ? <PeopleAltIcon id="peopleIcon" /> : ""}
                  {text === "Send" ? <SendIcon id="sendIcon" /> : ""}
                  {text === "AutoReply" ? <ReplyIcon id="sendIcon" /> : ""}
                  {text === "Logs" ? <ChangeCircleIcon id="sendIcon" /> : ""}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  // Remove this const when copying and pasting into your project.

  return (
    <Box sx={{ display: "flex" }} id="fileAreaPage">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ width: "20%" }}
          >
            {/* <AccountCircleIcon id="logoutIcon" /> */}
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <span className="accountDiv">
                  <AccountCircleIcon
                    id="accountIcon"
                    style={{
                      fontSize: "50px",
                    }}
                  />
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    marginLeft: "2%",
                    fontFamily: "Ubuntu, sans-serif",
                  }}
                >
                  Hari Yadharth
                </span>
                {/* <span
                  style={{
                    fontSize: "13px",
                    marginLeft: "2%",
                    color: "gray",
                  }}
                >
                  &#x25BC;
                </span> */}
              </div>
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu> */}
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          id="leftComponent"
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          id="leftComponent"
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        id="rightComponent"
      >
        <Toolbar />
        <Typography paragraph>
          <Routes>
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/managedevices" element={<ManageDevicesPage />} />
            <Route path="/adddevice" element={<AddDevicesPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/createcontact" element={<CreateContactPage />} />
            <Route path="/bulkcreatecontact" element={<BulkContactPage />} />
            <Route path="/send" element={<SendPage />} />
            <Route path="/log" element={<LogPage />} />
            <Route path="/reply" element={<ReplyPage />} />
            <Route path="/createreply" element={<CreateReplyPage />} />
            <Route path="/editreply/:id" element={<CreateReplyPage />} />
          </Routes>
        </Typography>
      </Box>
    </Box>
  );
}
