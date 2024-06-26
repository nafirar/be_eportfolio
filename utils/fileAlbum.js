const multer = require("multer");
const path = require("path");

const storage = (destination) =>
  multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

const fileAlbum = (destination) =>
  multer({
    storage: storage(destination),
    limits: {
      fileSize: 10 * 1024 * 1024, //10mb,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/gif" ||
        file.mimetype == "image/svg+xml" ||
        file.mimetype == "image/webp" ||
        file.mimetype == "video/quicktime" ||
        file.mimetype == "video/webm" ||
        file.mimetype == "video/mp4" ||
        file.mimetype == "audio/ogg" ||
        file.mimetype == "application/pdf"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Format is not allowed!"));
      }
    },
    onError: function (err, next) {
      return console.log("error", err);
      next(err);
    },
  }).single("fileAlbum");

module.exports = fileAlbum;
