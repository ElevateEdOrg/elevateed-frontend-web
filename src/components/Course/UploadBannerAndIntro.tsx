import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { Course } from "@/types";

interface UploadBannerAndIntroVideoProps {
  setCourse: Dispatch<SetStateAction<Partial<Course>>>;
}

export const UploadBannerAndIntro: React.FC<UploadBannerAndIntroVideoProps> = ({
  setCourse,
}) => {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [introVideo, setIntroVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;
    if (name === "banner_image") setBannerImage(files[0]);
    if (name === "intro_video") setIntroVideo(files[0]);
  };

  const handleUpload = async () => {
    if (!bannerImage || !introVideo) {
      setMessage("Please select both Banner Image and Intro Video.");
      return;
    }

    const formData = new FormData();
    formData.append("banner_image", bannerImage);
    formData.append("intro_video", introVideo);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://192.168.10.49/api/courses/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setCourse((prev) => ({
        ...prev,
        banner_image: response.data.data.banner_image,
        intro_video: response.data.data.intro_video,
      }));
      setMessage(response.data.message);
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
        <span className="text-gray-500">Upload Banner Image</span>
        <input
          type="file"
          name="banner_image"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500 transition">
        <span className="text-gray-500">Upload Intro Video</span>
        <input
          type="file"
          name="intro_video"
          accept="video/*"
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
