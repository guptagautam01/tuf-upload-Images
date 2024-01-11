const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowed_origins = [
    "https://staging.takeuforward.org", 
    "https://www.staging.takeuforward.org",
    "http://localhost:3000",
    "http://www.localhost:3000"
];
app.use(cors({
    origin: allowed_origins
}));

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {s3Client, PutObjectCommand} = require('./s3Client.js');
const {nanoid} = require('nanoid');

app.put('/api/uploadImage', upload.single('image'), async(req, res)=>{
    try{
        let fileName = req.body.fileName;
        const buffer = req.file.buffer;
        const bucket_name = process.env.BUCKET_NAME;
        fileName += `-${nanoid(8)}`;
        //upload to s3:
        //create s3 command:
        const params = {
            Bucket: bucket_name,
            Key: fileName,
            Body: buffer,
            ContentType: req.file.mimetype
        }
        const command = new PutObjectCommand(params);

        //upload image to s3:
        const result = await s3Client.send(command);
        if(result[`$metadata`].httpStatusCode !== 200) throw new Error();
        const url = "https://takeuforward-content-images.s3.ap-south-1.amazonaws.com/"+fileName;

        res.status(200).send({
            success: true,
            link: url
        })
    }catch(err){
        console.error(err);
        res.sendStatus(501);
    }
})

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.listen(PORT, ()=>{
    console.log("Started listening to the port "+PORT);
})