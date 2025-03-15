import { v2 as cloudinary } from "cloudinary";
import cron from 'node-cron';

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

const checkDate = async(req, res)=>{
  try {
    const date =new Date();
    
    res.json({
      total:date,
      year:date.getFullYear(),
      months:date.getMonth(),
      date:date.getDate(),
      day:date.getDay(),
      hours:date.getHours(),
      min:date.getMinutes(),
      check:date.getTime()
    });
    
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
}


const jobs = async (req, res) => {
  try {
    let { date, hour, minutes } = req.body;

    const now = new Date();

    // Default to current values if not provided
    if (date === undefined) date = now.getDate();
    if (hour === undefined) hour = now.getHours();
    if (minutes === undefined) minutes = now.getMinutes();

    const job = cron.schedule("* * * * *", () => {
      const current = new Date();

      if (
        current.getDate() == date &&
        current.getHours() == hour &&
        current.getMinutes() == minutes
      ) {
        console.log("✅ Job executed at", current.toLocaleString());

        job.stop();
        console.log("🛑 Cron job stopped");
      } 
    });
                         
    res.status(200).json({ msg: "⏰ Cron job started and checking every minute" });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};


export { checkimage, checkDate, jobs };
