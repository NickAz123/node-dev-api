export const USER_ERROR_CODES = {
    USER_NOT_FOUND: {
        status: 404,
        message: 'User Not Found.'
    },
    USER_ALREADY_EXISTS: {
        status: 409,
        message: 'User Email or Username already exists.',
    },
    USER_OBJECT_INVALID: {
        status: 400,
        message: 'User Object is invalid.'
    },
    USER_UPDATE_FAIL: {
        status: 500,
        message: 'Failed to update user.'
    },
    USER_PASSWORD_MISMATCH: {
        status: 500,
        message: 'Password mismatched'
    },
    USER_UNAUTHORIZED: {
        status: 401,
        message: 'You do not have permission to access this resource.'
    },
    USER_FIELD_EMPTY: {
        status: 400,
        message: 'Field cannot be empty'
    }
}