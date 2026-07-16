import { useState, useEffect } from 'react';
import { Button, Modal, message, Popconfirm, Empty, Spin } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import EventFormModal from './EventFormModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // current logged in user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isSuperAdmin = user?.role === 'superAdmin';
  const token = localStorage.getItem('token');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/events`);
      const data = await res.json();
      if (data.success) setEvents(data.data);
    } catch (err) {
      message.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddClick = () => {
    setEditingEvent(null);
    setFormOpen(true);
  };

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      message.success('Event deleted');
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      message.error(err.message || 'Failed to delete event');
    }
  };

  const handleFormSuccess = (savedEvent, isEdit) => {
    if (isEdit) {
      setEvents((prev) => prev.map((e) => (e._id === savedEvent._id ? savedEvent : e)));
    } else {
      setEvents((prev) => [savedEvent, ...prev]);
    }
    setFormOpen(false);
  };

  return (
    <section className="events-sec">
      <div className="wrap">
        <div className="events-head">
          <div>
            <span className="events-kicker">
              <span className="kicker-line"></span> Event & Program
            </span>
            <h2 className="events-heading">
              Take Part In Our Most
              <br />
              Recent Events.
            </h2>
          </div>

          {isSuperAdmin && (
            <Button type="primary" className="events-view-all" onClick={handleAddClick}>
              <PlusOutlined /> Add Event
            </Button>
          )}
        </div>

        {loading ? (
          <div className="events-status">
            <Spin size="large" />
          </div>
        ) : events?.length === 0 ? (
          <Empty description="No events found" className="events-status" />
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div className="event-card" key={event._id}>
                <div className="event-img">
                  {event.imageSrc ? <img src={event.imageSrc} alt={event.title} /> : null}
                </div>

                <div className="event-body">
                  <div className="event-title-row">
                    <h3 className="event-title">{event.title}</h3>

                    {isSuperAdmin && (
                      <div className="event-admin-actions">
                        <EditOutlined
                          className="admin-icon edit-icon"
                          onClick={() => handleEditClick(event)}
                        />
                        <Popconfirm
                          title="Delete this event?"
                          description="This action cannot be undone."
                          okText="Delete"
                          okButtonProps={{ danger: true }}
                          onConfirm={() => handleDelete(event._id)}
                        >
                          <DeleteOutlined className="admin-icon delete-icon" />
                        </Popconfirm>
                      </div>
                    )}
                  </div>

                  <div className="event-meta">
                    <span className="event-meta-item">
                      <CalendarOutlined /> {event.dateLabel}
                    </span>
                    <span className="event-meta-item">
                      <ClockCircleOutlined /> {event.timeLabel}
                    </span>
                  </div>

                  <p className="event-desc">{event.desc}</p>

                  <div className="event-footer">
                    {/* <a href="#" className="event-join">
                      Join Event <ArrowRightOutlined />
                    </a> */}
                    <div className="event-author">
                      <span className="event-author-icon">
                        <UserOutlined />
                      </span>
                      <div>
                        <span className="event-author-name">{event.author}</span>
                        <span className="event-author-role">Author</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EventFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
        editingEvent={editingEvent}
        token={token}
        apiBaseUrl={API_BASE_URL}
      />
    </section>
  );
};

export default EventsPage;