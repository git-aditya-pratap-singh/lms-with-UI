import express from "express";
import AdminModelControllers from "./modules/admin.model";
import { upload } from '../../middlewares/multer.middleware';

const adminRoutes = express.Router();
const INSTANCE_OF_ADMIN = new AdminModelControllers();

//-----------METHOD-> GET-------------------
adminRoutes.get('/getProfileDetails', INSTANCE_OF_ADMIN.getProfileDetails);

//-----------METHOD-> POST-------------------
adminRoutes.post('/updateDetails', INSTANCE_OF_ADMIN.updateDetails);
adminRoutes.post('/uploadProfilePicture', upload.single('files'), INSTANCE_OF_ADMIN.uploadProfilePicture);

export default adminRoutes;