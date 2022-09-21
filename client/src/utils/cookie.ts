import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (key: string, value: string) => {
    cookies.set(key, value, { maxAge: parseInt(`${process.env.REACT_APP_COOKIE_EXP}`) });
};
export const removeCookie = (key: string) => {
    cookies.remove(key);
};
export const getCookie = (key: string) => {
    return cookies.get(key);
};