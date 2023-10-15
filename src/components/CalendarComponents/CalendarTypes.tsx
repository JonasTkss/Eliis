import React, { FC } from "react";
import { typesOptions, types } from "../../types/Calendar/calendarTypes";
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";

const CalendarTypes: FC = (): JSX.Element => {
  return (
    <div className="calendar-types">
      <h6>TYPES</h6>
      <div className="calendar-types__list">
        <ul>
          {typesOptions.map((item: types, index: number) => (
            <li key={index}>
              <div className="calendar-types__item">
                <div
                  className="calendar-types__icon"
                  style={{
                    backgroundColor: item.color,
                    border: item.borderColor
                      ? `1px solid ${item.borderColor}`
                      : "none",
                  }}
                >
                  <Icon
                    path={mdiCheck}
                    size={0.75}
                    color={item.checkColor || "#FFFFFF"}
                  />
                </div>
                <p>{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarTypes;
