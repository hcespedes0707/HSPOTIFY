import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, ProgressBar } from 'react-bootstrap';

const Player = ({ trackUrl, trackTitle }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Actualiza el progreso mientras la canción se reproduce
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    const setAudioData = () => {
      setDuration(audioRef.current.duration);
    };

    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioData);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioData);
    };
  }, []);

  // Reproduce o pausa el audio
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Detiene el audio y reinicia el progreso
  const stopPlayback = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
    setIsPlaying(false);
  };

  // Maneja el cambio en la barra de progreso
  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);
    audioRef.current.currentTime = (newProgress / 100) * duration;
  };

  // Muestra el tiempo en formato mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="player d-flex flex-column align-items-center bg-dark p-3 text-white rounded">
      <audio ref={audioRef} src={trackUrl} />
      <h5>{trackTitle}</h5>

      <div className="controls d-flex align-items-center my-3">
        <Button variant="outline-light" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button variant="outline-light" onClick={stopPlayback} className="ms-3">
          Stop
        </Button>
      </div>

      <div className="progress-container w-100">
        <ProgressBar
          now={progress}
          onClick={handleProgressChange}
          variant="success"
          className="progress-bar bg-success"
        />
        <input
          type="range"
          className="progress-slider w-100 mt-2"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
        />
      </div>

      <div className="time d-flex justify-content-between w-100 mt-2">
        <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

// Define los tipos de las props
Player.propTypes = {
  trackUrl: PropTypes.string.isRequired,  // trackUrl es requerido y debe ser una cadena
  trackTitle: PropTypes.string            // trackTitle es una cadena opcional
};

export default Player;
