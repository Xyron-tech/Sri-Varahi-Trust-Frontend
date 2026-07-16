import { useState, useEffect } from 'react';
import { Button, Empty, Spin, Popconfirm, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import GalleryFormModal from './GalleryFormModal';
import './Gallery.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const GalleryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeImage, setActiveImage] = useState({});

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isSuperAdmin = user?.role === 'superAdmin';
  const token = localStorage.getItem('token');

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/gallery`);
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      message.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddClick = () => {
    setEditingItem(null);
    setFormOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);

      message.success('Gallery item deleted');
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      message.error(err.message || 'Failed to delete');
    }
  };

  const handleFormSuccess = (savedItem, isEdit) => {
    if (isEdit) {
      setItems((prev) => prev.map((i) => (i._id === savedItem._id ? savedItem : i)));
    } else {
      setItems((prev) => [savedItem, ...prev]);
    }
    setFormOpen(false);
  };

  const getActiveIndex = (itemId) => activeImage[itemId] || 0;
  const setActiveIndex = (itemId, idx) => {
    setActiveImage((prev) => ({ ...prev, [itemId]: idx }));
  };

  return (
    <section className="gallery-sec">
      <div className="wrap">
        <div className="sec-head-center">
          <span className="gallery-kicker">
            <span className="kicker-line"></span> Our Gallery <span className="kicker-line"></span>
          </span>
          <h2 className="gallery-heading">Moments Captured With Love</h2>
          <p className="gallery-sub">
            A glimpse into the moments, people, and stories behind our work.
          </p>

          {isSuperAdmin && (
            <Button type="primary" className="gallery-add-btn" onClick={handleAddClick}>
              <PlusOutlined /> Add Photos
            </Button>
          )}
        </div>

        {loading ? (
          <div className="gallery-status"><Spin size="large" /></div>
        ) : items.length === 0 ? (
          <Empty description="No gallery items found" className="gallery-status" />
        ) : (
          <div className="gallery-grid">
            {items.map((item) => {
              const activeIdx = getActiveIndex(item._id);
              const mainImage = item.images[activeIdx] || item.images[0];

              return (
                <div className="gallery-card" key={item._id}>
                  <div className="gallery-img">
                    <img src={mainImage.url} alt={item.title} />
                  </div>

                  <div className="gallery-body">
                    <div className="gallery-title-row">
                      <h3 className="gallery-title">{item.title}</h3>

                      {isSuperAdmin && (
                        <div className="gallery-admin-actions">
                          <EditOutlined
                            className="admin-icon edit-icon"
                            onClick={() => handleEditClick(item)}
                          />
                          <Popconfirm
                            title="Delete this gallery item?"
                            description="All photos in this set will be removed."
                            okText="Delete"
                            okButtonProps={{ danger: true }}
                            onConfirm={() => handleDelete(item._id)}
                          >
                            <DeleteOutlined className="admin-icon delete-icon" />
                          </Popconfirm>
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <p className="gallery-desc">{item.description}</p>
                    )}

                    {item.images.length > 1 && (
                      <div className="gallery-thumbs">
                        {item.images.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`gallery-thumb ${idx === activeIdx ? 'active' : ''}`}
                            onClick={() => setActiveIndex(item._id, idx)}
                            aria-label={`View photo ${idx + 1}`}
                          >
                            <img src={img.url} alt={`${item.title} ${idx + 1}`} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <GalleryFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={handleFormSuccess}
        editingItem={editingItem}
        token={token}
        apiBaseUrl={API_BASE_URL}
      />
    </section>
  );
};

export default GalleryPage;