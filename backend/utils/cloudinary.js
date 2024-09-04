import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
const getBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = async (file) => {
  if (!file) {
    return null;
  }

  const uploadPromise = new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      getBase64(file),
      { resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });

  try {
    const result = await uploadPromise;

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { uploadToCloudinary };
