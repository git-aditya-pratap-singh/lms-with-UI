import {Response} from 'express';
import AlertService from './AlertService';

class CommonServices extends AlertService{

    public createUserName = async( userName: string, res: Response): Promise<string | any> =>{
        try{ 
            return userName.toLowerCase().split(" ").join('-') + '@' + Math.floor(Math.random() * 1000);
        }catch(err){
            return this.sendServerErrorResponse(res, false, `SERVER_ERROR!!${err}`);
        }
    }

}
export default CommonServices;