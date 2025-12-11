export const generateSessionId = (userId: string | number): string => {
    const timestamp = Date.now();
    localStorage.setItem('sessionId', `${userId}-${timestamp}`);
    return `${userId}-${timestamp}`;
};