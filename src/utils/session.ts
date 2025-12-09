export const generateSessionId = (userId: string | number): string => {
    const timestamp = Date.now();
    return `${userId}-${timestamp}`;
};