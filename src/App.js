import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import FileArea from "./components/fileArea";
import { Provider, useDispatch } from "react-redux";
import RegisterPage from "./COMPONENT/registerPage";
import FileArea from "./COMPONENT/fileArea";
import store from "./reactRedux/store";
// import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<RegisterPage />} />
          <Route path="/filearea/*" element={<FileArea />} />
          {/* <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/filearea/*" element={<FileArea />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
