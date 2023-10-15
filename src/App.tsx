import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideMenu from "./components/SideMenuComponents/SideMenu";
import Header from "./components/HeaderComponents/Header";
import Landing from "./pages/Landing";
import Calendar from "./components/CalendarComponents/Calendar";
import ErrorPage from "./components/404/404";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="row">
          <div className="col-md-2 sidemenu-grid">
            <SideMenu />
          </div>
          <div className="col-md-10 calendar-bg">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
