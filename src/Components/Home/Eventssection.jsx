import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './Eventssection.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const LIMIT = 2; 

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/api/events/latest?limit=${LIMIT}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch events (${res.status})`);
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || 'Failed to load events');
        }

        // Backend already filters dateLabel = "Active", sorts by latest updated, and limits results
        if (isMounted) setEvents(data.data);
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching events:', err);
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: LIMIT }).map((_, i) => (
        <div className="event-card skeleton" key={`skeleton-${i}`}>
          <div className="event-img" />
          <div className="event-body">
            <h3 className="event-title">Loading title placeholder</h3>
            <div className="event-meta">
              <span className="event-meta-item">Loading date</span>
              <span className="event-meta-item">Loading time</span>
            </div>
            <p className="event-desc">Loading description placeholder text goes here</p>
          </div>
        </div>
      ));
    }

    if (error && !events.length) {
      return (
        <div className="events-status">
          Couldn't load events right now. Please try again later.
        </div>
      );
    }

    if (!events.length) {
      return <div className="events-status">No active events available right now.</div>;
    }

    return events.map((event) => (
      <div className="event-card" key={event._id}>
        <div className="event-img">
          {event.imageSrc ? <img src={event.imageSrc} alt={event.title} /> : null}
        </div>

        <div className="event-body">
          <h3 className="event-title">{event.title}</h3>

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
            {/* <Link to={`/events/${event._id}`} className="event-join">
              Join Event <ArrowRightOutlined />
            </Link> */}
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
    ));
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

          <Button type="primary" className="events-view-all">
            <Link to="/events" style={{ color: 'inherit' }}>
              View All Event
            </Link>
            <ArrowRightOutlined />
          </Button>
        </div>

        <div className="events-grid">{renderContent()}</div>
      </div>
    </section>
  );
};

export default EventsSection;