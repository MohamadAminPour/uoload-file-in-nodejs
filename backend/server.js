const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

// اجازه ارتباط فرانت‌اند با بک‌اند
app.use(cors());

// محل ذخیره فایل‌ها
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// روت آپلود
app.post("/upload", upload.single("myFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("هیچ فایلی ارسال نشد");
  }
  res.json({
    message: "فایل با موفقیت آپلود شد ✅",
    filename: req.file.filename,
    path: "/images/" + req.file.filename,
  });
});

// سرو فایل‌های استاتیک (برای دیدن تصاویر آپلود شده)
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(4000, () => {
  console.log("✅ بک‌اند روی http://localhost:4000 اجرا شد");
});
