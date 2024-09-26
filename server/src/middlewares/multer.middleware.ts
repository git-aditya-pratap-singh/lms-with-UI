import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path, { resolve } from "path";
import fs from 'fs';
 
// const storage: StorageEngine = multer.diskStorage({
    
//     destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
//         console.log("HIIIIIIIIIIIIIIIIIIII",__dirname)
//         cb(null, resolve(__dirname, "../upload"));
//         console.log("multer", file);
//     },
//     filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
//         cb(null, file.originalname);
//     }
// });

const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("hiii")
      const uploadPath = path.join(__dirname, '../upload');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);
    },
  });

const upload = multer({
    storage: storage,
}).single('image');

export default upload;
