/**
 * @author Test Author

 */
import config from "config";

const DEV: boolean = config.get('dev')
declare type ErrorDefination = {
    field?: string
}
export default class AppError extends Error {

    _field: string | null | undefined

    constructor(params: ErrorDefination | null | undefined) {
        super()

        const {
            field
        } = (params || {})
        this._field = field
    }

    toJSON() {
        return {
            error: this.errorCode(),
            message: this.errorMessage(),
            field: this._field,
            stack: DEV ? this.stack : undefined,
            __httpCode: this.httpCode(),
            __appError: true,
        }
    }

    errorCode(): number {
        /* istanbul ignore next */
        throw new Error('errorCode() must be overridden by subclasses')
    }

    httpCode(): number {
        /* istanbul ignore next */
        return 500
    }

    errorMessage(): string {
        /* istanbul ignore next */
        return 'An error occurred'
    }

}
