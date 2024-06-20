import multer, { StorageEngine } from "multer";
import { Request } from "express";
import { resolve } from "path";
 
const storage: StorageEngine = multer.diskStorage({
   
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        console.log("HIIIIIIIIIIIIIIIIIIII")
        cb(null, resolve(__dirname, "../../public/uploads"));
        console.log("multer", file);
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage: storage,
});
