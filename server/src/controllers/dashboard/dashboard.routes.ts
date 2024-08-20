import express from 'express';
import DashboardHome from "./modules/dashboardhome.model";

const dashboardHomeRoutes = express.Router();
const INSTANCE_OF_DASHOME = new DashboardHome();

dashboardHomeRoutes.get('/gethomePageData', INSTANCE_OF_DASHOME.fetchHomedetails);

export default dashboardHomeRoutes;