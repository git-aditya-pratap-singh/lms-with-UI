import express from 'express';
import ProfileControllers from './modules/profile.controllers';
import upload from '../../middlewares/multer.middleware';

const profilesRoutes = express.Router();
const INSTANCE_OF_PROFILE = new ProfileControllers();

profilesRoutes.get('/getProfileDetails', INSTANCE_OF_PROFILE.getProfileDetails);
profilesRoutes.put('/updateDetails', INSTANCE_OF_PROFILE.updateDetails);
profilesRoutes.post('/uploadProfilePicture', upload.single('image'), INSTANCE_OF_PROFILE.uploadProfilePicture);

export default profilesRoutes;