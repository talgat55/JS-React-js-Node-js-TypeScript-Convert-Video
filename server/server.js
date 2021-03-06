import express from "express";
import multiparty from "multiparty";
import bodyParser from "body-parser";
import ffmpeg  from "fluent-ffmpeg";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = 4000;


app.get("/", (req, res) => {
    res.json({
        message: "Notetaking API v1"
    });
});
// app.post("/upload",   function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
//    console.log(req)
//
//     /** The original name of the uploaded file
//      stored in the variable "originalname". **/
//     // let target_path = 'temp/input/' + req.file.originalname;
//
//     /** A better way to copy the uploaded file. **/
//     // let src = fs.createReadStream(tmp_path);
//     // let dest = fs.createWriteStream(target_path);
//     // src.pipe(dest);
//     // src.on('end', function() { res.render('complete'); });
//     // src.on('error', function(err) { res.render('error'); });
// })
app.post("/upload", (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if(err === null){
            // try {
                // let command = ffmpeg(files.attachment[0].path)
               let command = ffmpeg('drop.avi')
                    .audioCodec('libfaac')
                    .videoCodec('libx264')
                    .format('mp4')
                   .save('medium.mp4');
            // } catch (e) {
            //     // console.log(e.code);
            //     // console.log(e.msg);
            // }
        }
        // res.writeHead(200, { 'content-type': 'text/plain' });
        // res.write('received upload:\n\n');
        // res.end(util.inspect({ fields: fields, files: files }));
    });
    // console.log(res)
    // res.json({
    //     message: "Notetaking API v1"
    // });

});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});