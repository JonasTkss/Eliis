import React, { FC, useState, useEffect } from "react";

interface EventData {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

interface EventEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData | null;
  onDelete: (id: string) => void;
  onUpdate: (updatedEvent: EventData) => void;
}

const EventEditModal: FC<EventEditModalProps> = ({
  isOpen,
  onClose,
  event,
  onDelete,
  onUpdate,
}) => {
  const [editedEvent, setEditedEvent] = useState<EventData | null>();

  useEffect(() => {
    setEditedEvent(event);
  }, [event]);

  const handleUpdate = () => {
    if (editedEvent) {
      onUpdate(editedEvent);
      onClose();
    }
  };

  const handleDelete = () => {
    if (editedEvent) {
      onDelete(editedEvent.id);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Event</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="eventTitle">Event Title</label>
              <input
                type="text"
                className="form-control"
                id="eventTitle"
                value={editedEvent ? editedEvent.title : ""}
                onChange={(e) =>
                  setEditedEvent({
                    ...(editedEvent as any),
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventStart">Start Date & Time</label>
              <input
                type="date"
                className="form-control"
                id="eventStart"
                value={
                  editedEvent && editedEvent.start instanceof Date
                    ? editedEvent.start.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditedEvent({
                    ...(editedEvent as any),
                    start: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventEnd">End Date & Time</label>
              <input
                type="date"
                className="form-control"
                id="eventEnd"
                value={
                  editedEvent && editedEvent.end instanceof Date
                    ? editedEvent.end.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditedEvent({
                    ...(editedEvent as any),
                    end: new Date(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
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
  );
};

export default EventEditModal;
