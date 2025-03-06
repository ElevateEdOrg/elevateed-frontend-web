import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Lecture } from "@/api/courseService";

interface UploadLectureMediaProps {
  setLecture: Dispatch<SetStateAction<Lecture>>;
}

export const UploadLectureMedia: React.FC<UploadLectureMediaProps> = ({
  setLecture,
}) => {
  const [video, setVideo] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;
    if (name === "video") setVideo(files[0]);
    if (name === "pdf") setPdf(files[0]);
  };

  const handleUpload = async () => {
    if (!video) {
      setMessage("Please select a lecture video.");
      return;
    }

    const formData = new FormData();
    formData.append("video_path", video);
    if (pdf) {
      formData.append("pdf_path", pdf);
    }

    try {
      setUploading(true);
      const response = await axios.post(
        "http://192.168.10.49/api/courses/lectures/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLecture((prev) => ({
        ...prev,
        video_path: response.data.data.video_path,
        pdf_path: response.data.data.pdf_path || "",
      }));
      setMessage("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500 transition">
        <span className="text-gray-500">Upload Lecture Video</span>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
        />
      </label>

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500 transition">
        <span className="text-gray-500">Upload PDF (Optional)</span>
        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full px-4 py-2 text-white rounded-lg transition ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="text-center text-green-500">{message}</p>}
    </div>
  );
};
