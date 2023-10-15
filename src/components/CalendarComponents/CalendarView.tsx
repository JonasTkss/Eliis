import React, { FC, useState, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import localforage from "localforage";
import CalendarEventModal from "./CalendarEventModal";
import EventEditModal from "./EventEditModal";
import { EventData } from "../../types/Calendar/EventData";

const CalendarView: FC = (): JSX.Element => {
  const eventStore = localforage.createInstance({
    name: "myCalendarEvents",
  });
  const [events, setEvents] = useState<EventData[]>([]);
  const [newEvent, setNewEvent] = useState<EventData>({
    id: Date.now().toString(),
    title: "",
    start: new Date(),
    end: new Date(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const updateEvent = (updatedEvent: EventData) => {
    eventStore.setItem(updatedEvent.id, updatedEvent).then(() => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    });
  };
  const deleteEvent = (id: string) => {
    eventStore.removeItem(id).then(() => {
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      setIsEditModalOpen(false);
    });
  };
  const createEvent = (eventData: EventData) => {
    const existingEventsForDateType = events.filter(
      (event) =>
        event.title === eventData.title &&
        event.start.toISOString() === eventData.start.toISOString()
    );

    if (existingEventsForDateType.length > 0) {
      const newId = `${eventData.title}-${
        existingEventsForDateType.length + 1
      }`;
      eventData.id = newId;
    } else {
      eventData.id = eventData.title;
    }

    eventStore.setItem(eventData.id, eventData).then(() => {
      setEvents((prevEvents) => [...prevEvents, eventData]);
      setIsModalOpen(false);
    });
  };

  const readEvents = async () => {
    const keys = await eventStore.keys();
    const eventList = await Promise.all(
      keys.map((key) => eventStore.getItem<EventData | null>(key))
    );

    setEvents(
      eventList.filter(
        (eventData): eventData is EventData => eventData !== null
      )
    );
  };

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    readEvents();
  }, []);

  const handleCreateEvent = () => {
    setIsModalOpen(true);
    const newId = Date.now().toString();
    setNewEvent({
      id: newId,
      title: "",
      start: new Date(),
      end: new Date(),
    });
  };

  return (
    <div className="calendar-view">
      <div className="calendar-view__button">
        <button className="btn-primary" onClick={handleCreateEvent}>
          Create new event
        </button>
      </div>
      <CalendarEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateEvent={createEvent}
      />
      <EventEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onDelete={deleteEvent}
        onUpdate={updateEvent}
      />
      {screenSize < 1024 ? (
        <Fullcalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          firstDay={1}
          headerToolbar={{
            start: "title",
            center: "",
            end: "prev,next",
          }}
          displayEventTime={false}
          events={events}
          eventClick={(info) => {
            const clickedEvent =
              events.find((event) => event.id === info.event.id) || null;
            setSelectedEvent(clickedEvent);
            setIsEditModalOpen(true);
          }}
        />
      ) : (
        <Fullcalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          firstDay={1}
          displayEventTime={false}
          headerToolbar={{
            start: "",
            center: "title",
            end: "prev,next",
          }}
          events={events}
          eventClick={(info) => {
            const clickedEvent =
              events.find((event) => event.id === info.event.id) || null;
            setSelectedEvent(clickedEvent);
            setIsEditModalOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default CalendarView;
