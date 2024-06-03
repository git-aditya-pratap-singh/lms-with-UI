import { Response } from 'express';

class AlertService {

    private options = {
        httpOnly: true,
        secure: true
    }

    public sendSuccessResponseToken(res: Response, status: boolean, message: string, data?: any): void{
        res.status(200)
        .cookie("token", data?.token, this.options)
        .json({
            status: status,
            message: message,
            data: data
       })
    }
    public sendSuccessResponse(res: Response, status: boolean, message: string, data?: any): void{
        res.status(200).json({
            status: status,
            message: message,
            data: data
       })
    }
    public sendErrorResponse(res: Response, status: boolean, message: string): void{
        res.status(201).json({
            status: status,
            message: message,
        })
    }
    public sendServerErrorResponse(res: Response, status: boolean, message: string): void{
        res.status(500).json({
            status: status,
            message: message
        })
    }
}
export default AlertService;
