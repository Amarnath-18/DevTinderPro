import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import EditProfile from "./components/EditProfile";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import ViewUserProfile from "./components/ViewUserProfile";
import ChangePassword from "./components/ChangePassword";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ViewReqProfile from "./components/ViewReqProfile";
import ViewConnectionProfile from "./components/ViewConnectionProfile";

function App() {
  return (
    <>
      <Provider store={appStore} >
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/changePassword"  element={<ChangePassword/>}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/connections" element={<Connections/>} />
              <Route path="/requests" element={<Requests/>} />
              <Route path="/viewprofile/:id" element={<ViewUserProfile/>}/>
              <Route path="/viewConnectionprofile/:id" element={<ViewConnectionProfile/>}/>
              <Route path="/viewReqProfile/:id" element={<ViewReqProfile/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
