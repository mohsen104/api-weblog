import multer from "multer";

const storage = multer.memoryStorage();

const uploadFile = multer({
  storage,
  limits: {
    fileSize: 2000000, // 2MB
  },
  fileFilter: (req, file, cb) => {
    const whiteListFormat = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (whiteListFormat.includes(file.mimetype)) {
      return cb(null, true); // Accept file
    }
    return cb(new Error("format file is not allowed !"));
  },
});

export default uploadFile;
