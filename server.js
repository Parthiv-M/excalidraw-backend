
const path = require("path");
const express = require("express");
const app = express();
// const cors = require("cors");

const formidable = require("formidable");
const fs = require("fs");

const port = process.env.PORT || 3001;

// use express middleware
// app.use(cors());
app.use(express.json({ extended: false }));

// buffer route
app.get('*', (req, res) => {
    
});

const saveFile = async (file, fileName) => {
  const data = fs.readFileSync(file.path);
  console.log(path.join(__dirname));
  // fs.writeFileSync(`${path.join(__dirname, "../../", "public/uploads")}/${fileName}.png`, data); 
  fs.writeFileSync(`${__dirname}/${fileName}.png`, data);
  await fs.unlinkSync(file.path);
  return;
};

app.post("/api/upload", (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      // console.log(fields.fileName.substring(fields.fileName.lastIndexOf("/") + 1, fields.fileName.length - 1))
      await saveFile(files.file, fields.fileName.substring(fields.fileName.lastIndexOf("/") + 1, fields.fileName.length - 1));
      return res.status(200).send({ success: true, message: "File uploaded successfully" });
    });
})

// listens to the app on PORT
app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});