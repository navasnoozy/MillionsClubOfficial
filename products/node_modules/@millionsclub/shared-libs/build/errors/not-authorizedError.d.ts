import { CustomError } from "./custom-error";
export declare class NotAuthorizedError extends CustomError {
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
