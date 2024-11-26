import {Request, Response} from "express";

export default interface BaseControllerInterface {
    handle(request: Request, response: Response): Promise<void>
}