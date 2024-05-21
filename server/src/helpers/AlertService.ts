import { Response } from 'express';

class AlertService {
    public sendSuccessResponse(res?: Response, status: Number, msg: String, data?: any){
        res.status(200).json({
            status: status,
            msg: msg,
            list: data
       })
    }
    public sendErrorResponse(res: Response, status: Number, msg: String){
        res.status(201).json({
            status: status,
            msg: msg,
        })
    }
    public sendDataResponse(res: Response, status: Number, data: any){
        res.status(200).json({
            status: status,
            list: data
        })
    }
    public sendServerErrorResponse(res: Response, status: Number, msg: any){
        res.status(500).json({
            status: status,
            msg: msg
        })
    }
}
export default AlertService;
