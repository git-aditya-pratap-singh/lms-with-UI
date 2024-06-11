import express from "express";
import AdminModelControllers from "./modules/admin.model";

const adminRoutes = express.Router();
const INSTANCE_OF_ADMIN = new AdminModelControllers();

adminRoutes.post('/updateDetails', INSTANCE_OF_ADMIN.updateDetails);

export default adminRoutes;