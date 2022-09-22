import jwt_decode from 'jwt-decode';

export const jwtVerify = (token: string) => {
    try {
        const decoded: any = jwt_decode(token);
        if(decoded && decoded.type === 'access') {
            return token;
        }
        return null;
    } catch (error) {
        return null;
    }
};