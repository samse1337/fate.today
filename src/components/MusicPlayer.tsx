import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronUp, ChevronDown, Music } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  file: string;
  lyric: string;
}

interface LyricLine {
  time: number;
  text: string;
}

export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 加载播放列表
  useEffect(() => {
    fetch('/music/playlist.json')
      .then(res => res.json())
      .then((data: Song[]) => {
        setPlaylist(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const currentSong = playlist[currentSongIndex];

  // 解析LRC歌词
  const parseLRC = useCallback((lrcContent: string): LyricLine[] => {
    const lines = lrcContent.split('\n');
    const lyrics: LyricLine[] = [];
    
    for (const line of lines) {
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const ms = parseInt(match[3].padEnd(3, '0'));
        const time = minutes * 60 + seconds + ms / 1000;
        const text = match[4].trim();
        if (text) {
          lyrics.push({ time, text });
        }
      }
    }
    
    return lyrics.sort((a, b) => a.time - b.time);
  }, []);

  // 加载歌词
  useEffect(() => {
    if (!currentSong) return;
    
    fetch(`/music/${currentSong.lyric}`)
      .then(res => res.text())
      .then(text => {
        setLyrics(parseLRC(text));
        setCurrentLyricIndex(0);
      })
      .catch(() => setLyrics([]));
  }, [currentSong, parseLRC]);

  // 初始化音频
  useEffect(() => {
    if (!currentSong) return;
    
    const audio = new Audio(`/music/${currentSong.file}`);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      handleNext();
    });

    audio.volume = isMuted ? 0 : volume;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [currentSong]);

  // 更新音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // 播放/暂停控制
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // 更新当前歌词
  useEffect(() => {
    if (lyrics.length === 0) return;
    
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        setCurrentLyricIndex(i);
        break;
      }
    }
  }, [currentTime, lyrics]);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentSongIndex(prev => (prev + 1) % playlist.length);
    setCurrentTime(0);
    setCurrentLyricIndex(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex(prev => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
    setCurrentLyricIndex(0);
  };

  const handleSongSelect = (index: number) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setCurrentLyricIndex(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setVolume(Math.max(0, Math.min(1, percent)));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const currentLyric = lyrics[currentLyricIndex]?.text || (currentSong?.title || 'Fate Music');

  if (isLoading || playlist.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className={`music-player-container ${isExpanded ? 'expanded' : 'collapsed'}`}
    >
      {/* 收起状态 */}
      {!isExpanded && (
        <div className="music-player-mini" onClick={toggleExpand}>
          <div className="music-waves">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="music-wave"
                style={{ animationPlayState: isPlaying ? 'running' : 'paused', animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <div className="music-info">
            <p className="music-lyric-text">{currentLyric}</p>
            <p className="music-song-title">{currentSong?.title}</p>
          </div>
          <ChevronUp className="music-expand-icon" />
        </div>
      )}

      {/* 展开状态 */}
      {isExpanded && (
        <div className="music-player-full">
          <div className="music-header">
            <span className="music-header-title">Now Playing</span>
            <button onClick={toggleExpand} className="music-close-btn">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="music-song-info">
            <Music className="w-10 h-10 text-blue-400" />
            <h4 className="music-title">{currentSong?.title}</h4>
            <p className="music-artist">{currentSong?.artist}</p>
          </div>

          {/* 歌词显示 */}
          <div className="music-lyrics-box">
            {lyrics.length > 0 ? (
              lyrics.map((line, index) => (
                <p
                  key={index}
                  className={`music-lyric-line ${index === currentLyricIndex ? 'active' : ''}`}
                >
                  {line.text}
                </p>
              ))
            ) : (
              <p className="music-lyric-line active">{currentSong?.title}</p>
            )}
          </div>

          {/* 进度条 */}
          <div className="music-progress" onClick={handleProgressClick}>
            <div className="music-progress-bar">
              <div className="music-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="music-time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 0)}</span>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="music-controls">
            <button onClick={handlePrev} className="music-control-btn">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={handlePlayPause} className="music-play-btn">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button onClick={handleNext} className="music-control-btn">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* 音量控制 */}
          <div className="music-volume">
            <button onClick={() => setIsMuted(!isMuted)} className="music-mute-btn">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="music-volume-bar" onClick={handleVolumeClick}>
              <div className="music-volume-fill" style={{ width: isMuted ? '0%' : `${volume * 100}%` }} />
            </div>
          </div>

          {/* 播放列表 */}
          <div className="music-playlist">
            <p className="music-playlist-title">Playlist</p>
            <div className="music-playlist-items">
              {playlist.map((song, index) => (
                <button
                  key={song.id}
                  onClick={() => handleSongSelect(index)}
                  className={`music-playlist-item ${index === currentSongIndex ? 'active' : ''}`}
                >
                  <span className="music-playlist-number">{index + 1}</span>
                  <span className="music-playlist-name">{song.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
