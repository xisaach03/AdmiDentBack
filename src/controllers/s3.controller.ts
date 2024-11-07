// src/services/uploadService.ts
import multer from 'multer';
import path from 'path';
import { S3Client, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import Image from '../types/image';

// Configuración de S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// Configuración de Multer para almacenar el archivo en memoria
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only images (jpg, jpeg, png) are allowed.'));
    }
  },
});

// Función para subir archivo a S3 y devolver la URL
const uploadImageToS3 = async (file: Express.Multer.File) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
  const fileName = `images/${Date.now()}_${file.originalname}`;
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read' as ObjectCannedACL,  // ACL se define como ObjectCannedACL
  };

  // Subir el archivo a S3
  await s3.send(new PutObjectCommand(params));

  // Generar la URL pública del archivo
  const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  // Guardar la información en MongoDB
  const image = new Image({
    url: url,
    filename: fileName,
  });
  await image.save();

  return url;
};

export { upload, uploadImageToS3 };
