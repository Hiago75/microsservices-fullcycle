import { Request, Response } from "express";
import { InputGetBalanceDTO, OutputGetBalanceDTO } from "@application/usecases/get-balance/get-balance.dto";
import BaseControllerInterface from "src/@shared/domain/base-controller.interface";
import BaseServiceInterface from "src/@shared/domain/base-service.interface";

export default class GetBalanceController implements BaseControllerInterface {
    constructor(private balanceService: BaseServiceInterface<InputGetBalanceDTO, OutputGetBalanceDTO>) {}

    async handle(request: Request, response: Response): Promise<void> {
        const { accountId } = request.params;
    
        try {
            const input: InputGetBalanceDTO = {
                accountId
            }

            const balance = await this.balanceService.execute(input);
            
            response.status(200).send(balance);
        } catch(error) {
            response.status(400).send(error);
        }
    }
}