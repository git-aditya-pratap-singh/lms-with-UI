import { Response } from 'express';

class AlertService {
    public sendSuccessResponse(res: Response, status: boolean, message: string, data?: any){
        res.status(200).json({
            status: status,
            message: message,
            data: data
       })
    }
    public sendErrorResponse(res: Response, status: boolean, message: string){
        res.status(201).json({
            status: status,
            message: message,
        })
    }
    public sendDataResponse(res: Response, status: boolean, data: any){
        res.status(200).json({
            status: status,
            list: data
        })
    }
    public sendServerErrorResponse(res: Response, status: boolean, message: string){
        res.status(500).json({
            status: status,
            message: message
        })
    }
}
export default AlertService;
