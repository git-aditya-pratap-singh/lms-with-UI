import express from "express";
import AdminModelControllers from "./modules/admin.model";
//import { upload } from '../../middlewares/multer.middleware';
import multer from 'multer';

const upload = multer({dest: '../../../public/uploads'})

const adminRoutes = express.Router();
const INSTANCE_OF_ADMIN = new AdminModelControllers();

//-----------METHOD-> GET-------------------
adminRoutes.get('/getProfileDetails', INSTANCE_OF_ADMIN.getProfileDetails);

//-----------METHOD-> POST-------------------
adminRoutes.put('/updateDetails', INSTANCE_OF_ADMIN.updateDetails);
adminRoutes.post('/uploadProfilePicture', upload.single("file"), INSTANCE_OF_ADMIN.uploadProfilePicture);

export default adminRoutes;