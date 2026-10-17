import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Maximize2 } from 'lucide-react';
import { sendHeartbeat } from '../api/client';

interface VideoPlayerProps {
  lessonId: string;
  videoUrl?: string;
  durationSeconds?: number;
  onTimeUpdate?: (current: number, duration: number) => void;
  onEnded?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lessonId,
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  durationSeconds = 977,
  onTimeUpdate,
  onEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(durationSeconds);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [watermarkPos, setWatermarkPos] = useState({ top: 20, left: 30 });

  // Anti-Piracy Watermark Movement every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWatermarkPos({
        top: Math.floor(Math.random() * 70) + 10,
        left: Math.floor(Math.random() * 70) + 10,
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Heartbeat progress reporter every 15 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (videoRef.current) {
        sendHeartbeat(lessonId, Math.floor(videoRef.current.currentTime), Math.floor(videoDuration));
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isPlaying, lessonId, videoDuration]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * (videoDuration || 1);
    videoRef.current.currentTime = newTime;
    setPlaybackTime(newTime);
  };

  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  const handleFullscreen = () => {
    const container = document.getElementById('classroom-video-container');
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  return (
    <div 
      id="classroom-video-container"
      className="relative rounded-2xl bg-black border border-slate-800 dark:border-white/10 overflow-hidden aspect-video flex flex-col justify-end select-none group shadow-xl"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        onTimeUpdate={() => {
          if (videoRef.current) {
            const cur = videoRef.current.currentTime;
            setPlaybackTime(cur);
            onTimeUpdate?.(cur, videoDuration);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            const dur = videoRef.current.duration || durationSeconds;
            setVideoDuration(dur);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          onEnded?.();
        }}
        onClick={togglePlay}
      />

      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity"
        >
          <button className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform">
            <Play className="w-7 h-7 fill-current ml-1" />
          </button>
        </div>
      )}

      {/* DYNAMIC ANTI-PIRACY FLOATING WATERMARK */}
      <div 
        className="absolute pointer-events-none transition-all duration-1000 ease-in-out font-mono text-[11px] text-white/50 bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md select-none"
        style={{ top: `${watermarkPos.top}%`, left: `${watermarkPos.left}%` }}
      >
        Jasur Abdullayev • +998 90 111 22 33 • ID: 77a0-c1
      </div>

      {/* Video Controls Bar */}
      <div className="relative z-10 bg-black/85 backdrop-blur-md px-4 py-3 border-t border-white/10 text-white flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="hover:text-blue-400 cursor-pointer">
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
          <div className="flex items-center gap-1 text-[11px] text-zinc-300">
            <span>{Math.floor(playbackTime / 60)}:{(Math.floor(playbackTime) % 60).toString().padStart(2, '0')}</span>
            <span>/</span>
            <span>{Math.floor(videoDuration / 60)}:{(Math.floor(videoDuration) % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div 
          onClick={handleSeek}
          className="flex-1 mx-4 bg-white/20 hover:bg-white/30 h-1.5 rounded-full overflow-hidden cursor-pointer relative"
        >
          <div 
            className="bg-blue-500 h-full transition-all duration-150" 
            style={{ width: `${(playbackTime / (videoDuration || 1)) * 100}%` }}
          ></div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button 
            onClick={() => handleSpeedChange(playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors"
          >
            {playbackSpeed}x
          </button>
          <Volume2 className="w-4 h-4 text-zinc-300" />
          <button onClick={handleFullscreen} className="hover:text-blue-400">
            <Maximize2 className="w-4 h-4 text-zinc-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
