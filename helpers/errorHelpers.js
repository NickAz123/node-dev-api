import { USER_ERROR_CODES } from '../oonstants/userErrors.js';
import { SYSTEM_ERROR_CODES } from '../constants/systemErrors.js';

const ALL_ERRORS = { ...USER_ERRORS, ...SYSTEM_ERRORS };

export const sendError = (res, errorCode, customMessage = null) => {
  // Find the configuration or default to a standard 500 server error
  const errorConfig = ALL_ERRORS[errorCode] || SYSTEM_ERRORS.SERVER_ERROR;
  
  return res.status(errorConfig.status).json({
    status: errorConfig.status >= 500 ? 'error' : 'fail',
    code: errorCode || 'INTERNAL_SERVER_ERROR',
    message: customMessage || errorConfig.message
  });
};