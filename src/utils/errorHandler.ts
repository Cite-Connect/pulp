// Standard interface for what our API might return in case of error
export interface ApiErrorData {
    message?: string;
    detail?: string | Array<{ msg: string; type?: string }>;
}

export const getApiErrorMessage = (error: unknown, defaultMsg: string = 'Something went wrong'): string => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'object' && error !== null && 'response' in error) {
        const apiError = error as { response: { data?: ApiErrorData } };
        const data = apiError.response?.data;

        if (data) {
            if (data.message) {
                return data.message;
            }
        
            if (data.detail) {
                if (Array.isArray(data.detail)) {
                    return data.detail[0]?.msg || 'Validation error';
                }
                return data.detail;
            }
        }
    }

    // 3. Fallback
    return defaultMsg;
};