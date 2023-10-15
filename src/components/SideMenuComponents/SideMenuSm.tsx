import React, { FC } from "react";
import { sideMenuOptions, SideMenuItem } from "../../types/SideMenu/sidemenu";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface className {
  className: string;
}

const SideMenuSm: FC<className> = ({ className }): JSX.Element => {
  const location = useLocation();

  return (
    <div className={`side-menu-sm ${className}`}>
      <ul>
        {sideMenuOptions.map((item: SideMenuItem, index: number) => (
          <div>
            <li key={index} className="side-menu__item">
              <div className="side-menu__icon">
                <Icon path={item.icon} size={1.25} color="white" />
              </div>
              {item.isExpandable ? (
                <a
                  href={`#submenu-${index}`}
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls={`submenu-${index}`}
                  className={`side-menu__link ${
                    location.hash === `#submenu-${index}` ? "active" : ""
                  }`}
                >
                  {item.text}
                </a>
              ) : (
                <Link
                  to={item.path || ""}
                  className={
                    location.pathname === item?.path ? "active-link" : ""
                  }
                >
                  {item.text}
                </Link>
              )}
              {item.isExpandable && (
                <div className="side-menu__expand">
                  <Icon path={mdiChevronRight} size={1.25} color="#696969" />
                </div>
              )}
            </li>
            {item.isExpandable && (
              <div id={`submenu-${index}`} className="collapse">
                {item.subcategories && (
                  <ul className="side-menu__sub">
                    {item.subcategories.map((subcategory, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subcategory?.subPath}
                          className={
                            location.pathname === subcategory?.subPath
                              ? "active-link"
                              : "sub-link"
                          }
                        >
                          {subcategory.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideMenuSm;
