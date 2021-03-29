import express from "express";
import ffmpeg from "ffmpeg";
import multer from "multer";

const upload = multer({ dest: 'temp/input/' })
const app = express();
const PORT = 4000;


app.get("/", (req, res) => {
    res.json({
        message: "Notetaking API v1"
    });
});
let type = upload.single('upload');
app.post("/upload",  type, function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    let tmp_path = req.file.path;

    /** The original name of the uploaded file
     stored in the variable "originalname". **/
    let target_path = 'temp/input/' + req.file.originalname;

    /** A better way to copy the uploaded file. **/
    let src = fs.createReadStream(tmp_path);
    let dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.render('complete'); });
    src.on('error', function(err) { res.render('error'); });
})
// app.post("/upload", (req, res) => {
//     console.log(req)
//     // res.json({
//     //     message: "Notetaking API v1"
//     // });
//     try {
//         new ffmpeg(`/temp/input/video_${new Date()}.mp4`, function (err, video) {
//             if (!err) {
//                 video
//                     .addCommand('-f', 'mp4')
//                     .save(`/temp/output/video_${new Date()}.mp4`, function (error, file) {
//                         if (!error)
//                             console.log('Video file: ' + file);
//                     });
//                 console.log('The video is ready to be processed');
//             } else {
//                 console.log('Error: ' + err);
//             }
//         });
//     } catch (e) {
//         console.log(e.code);
//         console.log(e.msg);
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});