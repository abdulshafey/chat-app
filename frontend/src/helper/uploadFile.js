const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error.message);
    }

    return responseData;
  } catch (error) {
    console.error("Upload error:", error.message);
    throw error;
  }
};

export default uploadFile;
