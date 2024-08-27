import { Request, Response } from "express";
import AlertService from "../../../helpers/AlertService";
import asyncHandler from "../../../utils/asyncHandler";

class DashboardHome extends AlertService {

    public fetchHomedetails = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
        

    });

}
export default DashboardHome;