import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_IMAGE_PRESET;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const VITE_BASE = import.meta.env.VITE_BASE_URL;

const MAX_VIDEO_SIZE = 5 * 1024 * 1024;
const ALLOWED_VIDEO_TYPES = ["video/mp4"];

const ACCEPT_MAP = {
  image: "image/*",
  video: "video/mp4",
  both: "image/*,video/mp4",
};

const ReusableImageUpload = ({
  value,
  onChange,
  multiple = false,
  title = "Upload",
  disabled = false,
  type = "image",
  resolution,
}) => {
  const [loading, setLoading] = useState(false);

  const { showLoader, hideLoader } = useAuth();

  const uploadMedia = async (file) => {
    showLoader();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const resourceType = file.type.startsWith("video") ? "video" : "image";

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (!data.secure_url) {
        toast.error("Upload failed");
        throw new Error("Upload failed");
      }
      return data;
    } catch (error) {
      toast.error("Upload error");
      throw error;
    } finally {
      hideLoader();
    }
  };

  const isValidFile = (file) => {
    if (type === "video") {
      if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
        toast.error("Invalid video type. Only MP4 allowed.");
        return false;
      }

      if (file.size > MAX_VIDEO_SIZE) {
        toast.error("Video size must be less than 5MB");
        return false;
      }

      return true;
    }
    if (type === "image") {
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid image file");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleUpload = async (e) => {
    if (disabled) return;

    const selectedFiles = Array.from(e.target.files);
    e.target.value = "";

    let validFiles = [];

    for (let file of selectedFiles) {
      if (!isValidFile(file)) continue;

      // ✅ resolution check only for images
      if (file.type.startsWith("image/")) {
        const isValidResolution = await checkImageResolution(file);
        if (!isValidResolution) continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) return;

    setLoading(true);
    showLoader();

    try {
      const uploads = await Promise.all(validFiles.map(uploadMedia));

      const media = uploads.map((item) => ({
        imageUrl: item.secure_url,
        imageId: item.public_id,
        type: item.resource_type,
      }));

      onChange(multiple ? [...(value || []), ...media] : media[0]);
    } finally {
      setLoading(false);
      hideLoader();
    }
  };

  const handleRemove = async (publicId) => {
    showLoader();
    try {
      const res = await fetch(`${VITE_BASE}/image/delete-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });
      if (res.ok) {
        if (multiple) {
          onChange(value.filter((m) => m.imageId !== publicId));
        } else {
          onChange(null);
        }
      }
    } finally {
      hideLoader();
    }
  };
  const mediaList = multiple ? value || [] : value ? [value] : [];

  const checkImageResolution = (file) => {
    return new Promise((resolve) => {
      if (!resolution) return resolve(true); // ✅ allow if not provided

      const [reqWidth, reqHeight] = resolution.split("x").map(Number);

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);

        if (img.width === reqWidth && img.height === reqHeight) {
          resolve(true);
        } else {
          toast.error(
            `Image must be ${reqWidth}x${reqHeight}px. Uploaded: ${img.width}x${img.height}`,
          );
          resolve(false);
        }
      };

      img.onerror = () => {
        toast.error("Invalid image file");
        resolve(false);
      };

      img.src = objectUrl;
    });
  };

  return (
    <div className="w-full">
      {/* TITLE */}
      <label className="block text-[12px] sm:text-sm text-[#94a3b8] mb-2 font-medium">
        {title}
      </label>

      {/* UPLOAD BUTTON */}
      <label
        className={`inline-block ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span
          className="
  text-[10px] sm:text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg
  bg-gradient-to-r from-[#06b6d4] via-[#22d3ee] to-[#67e8f9]
  text-black font-medium
  shadow-[0_0_12px_rgba(34,211,238,0.5)]
  hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]
  transition-all duration-300
"
        >
          Select File
        </span>

        <input
          type="file"
          hidden
          disabled={disabled}
          accept={ACCEPT_MAP[type]}
          multiple={multiple}
          onChange={handleUpload}
        />
      </label>

      {/* LOADING */}

      {loading && (
        <div className="mt-3">
          <div className="w-5 h-5 border-2 border-[#22d3ee] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* MEDIA PREVIEW */}

      <div className="flex flex-wrap gap-4 mt-4">
        {mediaList.map((item) => (
          <div
            key={item.imageId || item.public_id}
            className={`
  relative rounded-lg
  bg-[rgba(2,6,23,0.7)]
  border border-[#22d3ee]/20
  backdrop-blur-md
  shadow-[0_0_10px_rgba(34,211,238,0.1)]
  hover:shadow-[0_0_18px_rgba(34,211,238,0.25)]
  transition-all duration-300
  ${item.type === "video" ? "w-full" : "w-24 h-24"}
`}
          >
            {item.type === "video" ? (
              <video
                src={item.imageUrl || item.url}
                controls
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <img
                src={item.imageUrl || item.url}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
              />
            )}

            {/* REMOVE BUTTON */}

            {!disabled && (
              <button
                onClick={() => handleRemove(item.imageId || item.public_id)}
                className="
  absolute -top-2 -right-2
  bg-black border border-[#22d3ee]/40
  text-[#22d3ee]
  rounded-full w-6 h-6 flex items-center justify-center text-xs
  hover:bg-[#22d3ee] hover:text-black
  hover:scale-110 transition cursor-pointer
"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableImageUpload;
