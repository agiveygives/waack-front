function set(cookieName: string, cookieValue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires: string = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function get(cookieName: string): string {
    const name: string = cookieName + "=";
    const decodedCookie: string = decodeURIComponent(document.cookie);
    const ca: string[] = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setLoginCookie(username: string) {
    set('username', username, 2);
}

export default { set, get };