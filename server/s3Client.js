const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const bucket_name = process.env.BUCKET_NAME;
const bucket_location = process.env.BUCKET_LOCATION;
const bucket_access_key = process.env.ACCESS_KEY;
const bucket_secret_key = process.env.SECRET_ACCESS_KEY;

//create s3 client:
const s3Client = new S3Client({
    credentials:{
        accessKeyId: bucket_access_key,
        secretAccessKey: bucket_secret_key
    },
    region: bucket_location
});

module.exports={s3Client, PutObjectCommand};