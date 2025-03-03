import React, { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router";
import { fetchCourseContent, FetchCourseDetailsResponse ,Lecture} from "../api/courseService";

export const MyLearning: React.FC = () => {
  const [courseContent, setCourseContent] = useState<FetchCourseDetailsResponse>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { courseId } = useParams();

  const tabs = ["Overview", "Q&A", "Notes", "Announcements", "Reviews", "Learning tools"];

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        const response = await fetchCourseContent(courseId);
        setCourseContent(response.data.data);
      } catch (error) {
        console.error("Error fetching course content:", error);
      }
    };

    fetchCourse();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const videoEnded = () => {
      setIsPlaying(false);
    };

    const loadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('ended', videoEnded);
    video.addEventListener('loadedmetadata', loadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('ended', videoEnded);
      video.removeEventListener('loadedmetadata', loadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setProgress(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = (seekTime / 100) * duration;
    }
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Video Player */}
        <div className={`${isCollapsed ? 'w-full' : 'w-full md:w-3/4'} bg-black transition-all duration-300`}>
          <div
            ref={videoContainerRef}
            className="relative h-full flex items-center justify-center"
          >
            <video
              ref={videoRef}
              className="max-h-full max-w-full"
              src={(selectedLecture?selectedLecture?.video_path:courseContent?.course.intro_video)||""}
              poster={courseContent?.course.banner_image || ""}
              onClick={togglePlay}
            />

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex flex-col space-y-2">
                {/* Progress bar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Play/Pause button */}
                    <button onClick={togglePlay} className="text-white hover:text-gray-300">
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </button>

                    {/* Volume control */}
                    <div className="flex items-center space-x-1">
                      <button onClick={toggleMute} className="text-white hover:text-gray-300">
                        {isMuted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-gray-500 rounded-full appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Time display */}
                    <div className="text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Toggle sidebar on mobile */}
                    <button
                      onClick={toggleSidebar}
                      className="md:hidden text-white hover:text-gray-300"
                    >
                      {isCollapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </button>

                    {/* Fullscreen button */}
                    <button onClick={toggleFullscreen} className="text-white hover:text-gray-300">
                      {isFullscreen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M15 9H19.5M15 9V4.5M9 15v4.5M9 15H4.5M15 15h4.5M15 15v4.5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Sidebar */}
        <div
          className={`${isCollapsed ? 'hidden' : 'absolute md:relative inset-0 z-10 md:w-1/4 bg-white md:bg-gray-50'
            } overflow-y-auto border-l transition-all duration-300`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-lg">Course content</h2>
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Course Lectures</h2>

      {courseContent?.course.lecture.map((section, secIdx) => (
        <div key={secIdx} className="border rounded-lg mb-2">
          {/* Section Header (Click to Toggle) */}
          <div
            className="p-3 bg-gray-100 flex justify-between items-center cursor-pointer"
            onClick={() =>
              setActiveSection(activeSection === secIdx ? null : secIdx)
            }
          >
            <span className="font-medium">{section.title}</span>
            <span>{activeSection === secIdx ? "▲" : "▼"}</span>
          </div>

          {/* Lectures List (Only Visible When Section is Active) */}
          {activeSection === secIdx && (
            <div className="p-3 space-y-2">
              {section.lectures.map((lecture, lecIdx) => (
                <div key={lecIdx}>
                  <button
                    className={`p-2 w-full text-left rounded-lg border ${
                      selectedLecture?.id === lecture.id
                        ? "bg-gray-200"
                        : "bg-white"
                    }`}
                    onClick={() => setSelectedLecture(lecture)}
                  >
                    {lecture.title}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Display Selected Lecture Content */}
      {selectedLecture && (
        <div className="mt-4 p-4 border rounded-lg shadow bg-white">
          <h3 className="font-medium mb-2">{selectedLecture.title}</h3>

          {/* Video Player */}
          {selectedLecture.video_path && (
            <video
              controls
              className="w-full rounded-lg"
              src={selectedLecture.video_path}
            />
          )}

          {/* PDF Download Link */}
          {selectedLecture.pdf_path && (
            <div className="mt-2">
              <a
                href={selectedLecture.pdf_path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download PDF Notes
              </a>
            </div>
          )}
        </div>
      )}
    </div>
        </div>
      </div>

      {/* Navigation Tabs & Description */}
      <div className="border-t">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${tab === activeTab ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Course Description */}
        <div className="p-4">
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            {courseContent?.course.title || "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps"}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-2">
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg md:text-2xl font-bold mr-1">
                {courseContent?.userRating || "4.7"}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="gold" stroke="gold" strokeWidth="1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>



          </div>



          {activeTab === "Overview" && (
            <div className="mt-6">
              <p className="text-gray-700">
                {courseContent?.course.description ||
                  "This comprehensive course covers everything you need to become a professional full-stack web developer. From front-end technologies like HTML, CSS, and JavaScript to back-end development with Node.js and database management with PostgreSQL. You'll also learn modern frameworks like React and dive into Web3 technologies."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};