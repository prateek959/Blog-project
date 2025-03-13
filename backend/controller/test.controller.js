import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbiarsb7i",
  api_key: "336148829687569",
  api_secret: "Lra3nFrAW49kUiWko8w4Hn9S0ms",
});

const checkimage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageFile = req.files.image

    const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
      folder: "uploads", 
    });

    res.json({
      message: "Image uploaded successfully",
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};

export { checkimage };
