const express = require("express");
const app = express();
// const cors = require("cors");

const formidable = require("formidable");
const fs = require("fs");

const port = process.env.PORT || 3001;

// use express middleware
app.use(express.json({ extended: false }));

const saveFile = async (file, fileName) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`${__dirname}/uploads/${fileName}.png`, data);
  await fs.unlinkSync(file.path);
  return;
};

app.post("/api/upload", (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      await saveFile(files.file, fields.fileName.substring(fields.fileName.lastIndexOf("/") + 1, fields.fileName.length - 1));
      return res.status(200).send({ success: true, message: "File uploaded successfully" });
    });
});

app.get("/api/getFiles", (req, res) => {
    try {
        fs.readdir(`${__dirname}/uploads`, (err, files) => {
            if(files.length === 0) {
                return res.status(401).send({ success: false, message: "No files in uploads" })
            }
            res.status(200).send({ success: true, files: files })
        })
    } catch(err) {
        console.log(err);
        return res.status(501).send({ success: false, message: "Oops, server error" })
    }
})

app.get("/api/download", (req, res) => {
    if(!req.query || !req.query.fileName) {
        return res.status(401).send({ success: false, message: "No file name" })
    }
    const reqFile = req.query.fileName;
    const filePath = `${__dirname}/uploads/${reqFile}`;
    res.download(filePath)
})

// buffer route
app.get('*', (req, res) => {
    res.status(200).send({ message: "Oops, nothing to see here" })  
});

// listens to the app on PORT
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});