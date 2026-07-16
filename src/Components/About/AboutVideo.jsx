import { useState, useEffect } from 'react';
import { Button, Empty, Spin, Popconfirm, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import VideoFormModal from './VideoFormModal';
import './AboutVideo.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const VideoCard = ({ video, isSuperAdmin, onEdit, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="video-card">
      <div className="video-frame">
        {isPlaying ? (
          <video
            src={video.videoUrl}
            controls
            autoPlay
            playsInline
            className="video-el"
          />
        ) : (
          <>
            <img src={video.thumbnail} alt={video.title} className="video-thumb" loading="lazy" />
            <button
              className="video-play-btn"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play ${video.title}`}
            >
              ▶
            </button>
          </>
        )}
      </div>

      <div className="video-title-row">
        <h4 className="video-title">{video.title}</h4>
        {isSuperAdmin && (
          <div className="video-admin-actions">
            <EditOutlined className="admin-icon edit-icon" onClick={() => onEdit(video)} />
            <Popconfirm
              title="Delete this video?"
              okText="Delete"
              okButtonProps={{ danger: true }}
              onConfirm={() => onDelete(video._id)}
            >
              <DeleteOutlined className="admin-icon delete-icon" />
            </Popconfirm>
          </div>
        )}
        {video.description && (
  <p className="video-des">{video.description}</p>
)}
      </div>
    </div>
  );
};

const AboutVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isSuperAdmin = user?.role === 'superAdmin';
  const token = localStorage.getItem('token');

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/videos`);
      const data = await res.json();
      if (data.success) setVideos(data.data);
    } catch (err) {
      message.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddClick = () => {
    setEditingVideo(null);
    setFormOpen(true);
  };

  const handleEditClick = (video) => {
    setEditingVideo(video);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      message.success('Video deleted');
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      message.error(err.message || 'Failed to delete video');
    }
  };

  const handleFormSuccess = (savedVideo, isEdit) => {
    if (isEdit) {
      setVideos((prev) => prev.map((v) => (v._id === savedVideo._id ? savedVideo : v)));
    } else {
      setVideos((prev) => [savedVideo, ...prev]);
    }
    setFormOpen(false);
  };

  return (
    <section className="about-video-sec">
      <div className="wrap">
        <div className="sec-head-center">
          <span className="video-kicker">
            <span className="kicker-line"></span> Our Work In Action <span className="kicker-line"></span>
          </span>
          <h2 className="video-heading">See The Impact We're Creating</h2>
          <p className="video-sub">
            Watch real stories from the ground — the people, the moments, and the change we're building together.
          </p>

          {isSuperAdmin && (
            <Button type="primary" className="video-add-btn" onClick={handleAddClick}>
              <PlusOutlined /> Add Video
            </Button>
          )}
        </div>

        {loading ? (
          <div className="video-status"><Spin size="large" /></div>
        ) : videos.length === 0 ? (
          <Empty description="No videos found" className="video-status" />
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <VideoCard
                video={video}
                key={video._id}
                isSuperAdmin={isSuperAdmin}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <VideoFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
        editingVideo={editingVideo}
        token={token}
        apiBaseUrl={API_BASE_URL}
      />
    </section>
  );
};

export default AboutVideo;