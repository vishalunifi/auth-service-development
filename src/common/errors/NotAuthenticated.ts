/**
 /**
 * @author Test Author

 */
import AppError from "./AppError"
import Codes from "./Codes"

export default class NotAuthenticatedError extends AppError {

    errorCode(): number {
        return Codes.NOT_AUTHENTICATED
    }

    errorMessage(): string {
        return 'You are not authenticated'
    }

    httpCode() {
        return 401
    }

}
