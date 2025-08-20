import React from 'react';
import './AlertCard.css';
import { FaTrashAlt } from 'react-icons/fa';

function AlertCard({ type, timestamp, audioUrl, onDelete }) {
  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this alert?");
    if (confirm) {
      onDelete();
    }
  };

  // ✅ FIX: Safe check for null + base64 detection
  const getAudioMimeType = (url) => {
    if (!url) return 'audio/*';

    if (url.startsWith('data:audio/wav')) return 'audio/wav';
    if (url.startsWith('data:audio/ogg')) return 'audio/ogg';
    if (url.startsWith('data:audio/mp3') || url.startsWith('data:audio/mpeg')) return 'audio/mpeg';

    if (url.endsWith('.wav')) return 'audio/wav';
    if (url.endsWith('.ogg')) return 'audio/ogg';
    if (url.endsWith('.mp3')) return 'audio/mpeg';

    return 'audio/*'; // fallback
  };

  return (
    <div className="alert-card">
      <div className="alert-header">
        <div className="alert-info">
          <h3>{type}</h3>
          <p>{timestamp}</p>
        </div>
        {onDelete && (
          <FaTrashAlt
            className="delete-icon"
            onClick={handleDelete}
            title="Delete"
          />
        )}
      </div>

      {/* ✅ Only render audio if valid URL exists */}
      {audioUrl ? (
        <audio controls>
          <source src={audioUrl} type={getAudioMimeType(audioUrl)} />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p style={{ fontStyle: 'italic' }}>No audio available for this alert.</p>
      )}
    </div>
  );
}

export default AlertCard;
