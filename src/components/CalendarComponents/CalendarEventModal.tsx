import React, { FC, useState } from "react";
import { typesOptions } from "../../types/Calendar/calendarTypes";

interface CalendarEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: any) => void;
}

const CalendarEventModal: FC<CalendarEventModalProps> = ({
  isOpen,
  onClose,
  onCreateEvent,
}) => {
  const [eventData, setEventData] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });
  const [selectedEventType, setSelectedEventType] = useState("");

  const handleCreateEvent = () => {
    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate);

    const selectedType = typesOptions.find(
      (type: any) => type.title === selectedEventType
    );
    const eventDataWithColor = {
      title: eventData.title,
      start: startDate,
      end: endDate,
      color: selectedType?.color || "",
    };

    onCreateEvent(eventDataWithColor);
    setEventData({
      title: "",
      startDate: "",
      endDate: "",
    });
    setSelectedEventType("");
    onClose();
  };

  return (
    <div className="create-event">
      <div
        className="modal"
        tabIndex={-1}
        role="dialog"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Event</h5>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Event title"
                value={eventData.title}
                onChange={(e) =>
                  setEventData({ ...eventData, title: e.target.value })
                }
              />
              <label htmlFor="eventType">Start date:</label>
              <input
                type="date"
                value={eventData.startDate}
                onChange={(e) =>
                  setEventData({ ...eventData, startDate: e.target.value })
                }
              />
              <label htmlFor="eventType">End date:</label>
              <input
                type="date"
                value={eventData.endDate}
                onChange={(e) =>
                  setEventData({ ...eventData, endDate: e.target.value })
                }
              />
              <label htmlFor="eventType">Event Type:</label>
              <select
                id="eventType"
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
              >
                <option value="">Select an event type</option>
                {typesOptions.map((type: any) => (
                  <option key={type.title} value={type.title}>
                    {type.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-primary"
                onClick={handleCreateEvent}
              >
                Create
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarEventModal;
