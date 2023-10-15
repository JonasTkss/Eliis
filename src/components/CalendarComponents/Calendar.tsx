import React, { FC } from "react";
import CalendarTypes from "./CalendarTypes";
import CalendarView from "./CalendarView";

const Calendar: FC = (): JSX.Element => {
  return (
    <div className="calendar">
      <div className="row">
        <div className="col-md-2">
          <div className="calendar__title  ">
            <h3>Event calendar</h3>
          </div>
          <div className="calendar__types ">
            <CalendarTypes />
          </div>
        </div>
        <div className="col-md-10">
          <div className="calendar__view">
            <CalendarView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
