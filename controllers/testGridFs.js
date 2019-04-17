// // Logic
// const mongoose = require("mongoose");
// const fs = require("fs");
// const Grid = require("gridfs-stream");

// //models
// const Files = require("../models/files");

// const conn = mongoose.connection;
// Grid.mongo = mongoose.mongo;
// let gfs;

// exports.upload = (req, res) => {

//   conn.once("open", () => {
//     gfs = Grid(conn.db);

//     let { file } = req.files;
//     let writeStream = gfs.createWriteStream({
//       filename: `${file.name}`,
//       mode: "w",
//       content_type: file.mimetype
//     });
//     writeStream.on("close", function(uploadedFile) {
//       Files.create({
//         doc_id: uploadedFile._id,
//         length: uploadedFile.length,
//         name: uploadedFile.filename,
//         type: uploadedFile.contentType
//       })
//         .then(file =>
//           res.json({
//             success: true,
//             message: "File was saved with success"
//           })
//         )
//         .catch(err => {
//           res.status(500).json({
//             message: `[*] Error while uploading new files, with error: ${err}`
//           });
//         });
//     });
//     writeStream.write(file.data);
//     writeStream.end();
//   });
// };

const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const fs = require('fs');
const File = require('../models/files');

/**
 * Brad Traversy Code
 */
exports.upload = (req, res) => {

    // var new_img = new File;
    // new_img.img.data = fs.readFileSync(req.file.path)
    // new_img.img.contentType = 'image/jpeg';
    // new_img.save();

    if (req.files === null) {
        console.log("No files uploaded");
    }

    console.log(req.files.file);
console.log();
console.log();
console.log();
    File.create(req.files.file)
    .then(upload => console.log('uploaded'))
    .catch(err => console.log(err));
    

}