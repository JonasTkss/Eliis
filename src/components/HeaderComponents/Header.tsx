import React, { FC, useEffect, useState } from "react";
import logo from "../../assets/eliis.png";
import Icon from "@mdi/react";
import {
  mdiBullhorn,
  mdiCloud,
  mdiBell,
  mdiMessageText,
  mdiCalendarBlank,
  mdiMenu,
  mdiClose,
  mdiChevronDown,
} from "@mdi/js";
import { Link, useLocation } from "react-router-dom";
import SideMenuSm from "../SideMenuComponents/SideMenuSm";

const Header: FC = (): JSX.Element => {
  const icons = [
    mdiBell,
    mdiBullhorn,
    mdiMessageText,
    mdiCalendarBlank,
    mdiCloud,
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const history = useLocation();

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 350);
    } else {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [history.pathname]);

  return (
    <div className="header">
      <div className="header__logo">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="header__section">
        <div className="header__navigation">
          <ul>
            {icons.map((icon, index) => (
              <li key={index}>
                <Icon path={icon} size={1} color="white" />
              </li>
            ))}
          </ul>
        </div>
        <div className="header__user">
          <div className="header__user--info">
            <h6>Eliis Õpetaja</h6>
            <span>Lasteaed ELIIS</span>
          </div>
          <div className="header__user--avatar">
            <h3>EÕ</h3>
            <div className="header__user--avatar-arrow">
              <Icon
                path={mdiChevronDown}
                size={1}
                color={"var(--clr-primary)"}
              />
            </div>
          </div>
          <div className="header__burger">
            <button
              onClick={() => {
                toggleMenu();

                const buttonElement = document.querySelector(
                  ".header__burger button"
                );
                if (buttonElement) {
                  buttonElement.classList.toggle("rotate");
                }
              }}
              className={
                isMenuOpen ? "btn-transition rotate" : "btn-transition"
              }
            >
              <Icon
                path={isMenuOpen ? mdiClose : mdiMenu}
                size={2}
                color="var(--clr-primary)"
              />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && <SideMenuSm className={isClosing ? "hidden" : ""} />}
    </div>
  );
};

export default Header;
