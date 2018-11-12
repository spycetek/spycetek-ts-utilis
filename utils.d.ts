/**
 *
 */
export declare class Utils {
    static readonly DEFAULT_SELECTOR_PARAMS = ".spycetek-params";
    private static pageParams;
    private static initialized;
    static init(): void;
    /**
     * Parse page parameter like <div class="spycetek-params" data-my-param-1=".." data-my-param-2=".." ...>.
     * This also moves this <div> to the end of <body>.
     */
    private static parsePageParameter;
    /**
     *
     * @param {string} dataName. e.g. "myValue" for attribute with name "data-my-value".
     * @return {any} number, string, or associative array (object)
     */
    static getPageParameter(dataName: string): any;
    /**
     * Format number with comma as thousands separators.
     * @param {number} num
     * @returns {string}
     */
    static numberFormat(num: number): string;
    /**
     * @param paramName parameter name to parse the value.
     * @param decode true to apply decodeURIComponent on the parsed value.
     */
    getUrlParameter(paramName: string, decode: boolean): string | boolean;
    /**
     * Just a wrapper of localStorage.setItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     *
     * @param {string} key
     * @param {string} value
     * @return {boolean} true if success, false otherwise
     */
    static setLocalStorage(key: string, value: string): boolean;
    /**
     * Just a wrapper of localStorage.getItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     */
    static getLocalStorage(key: string, defaultValue: string): string;
    /**
     * Just a wrapper of localStorage.removeItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     */
    static removeLocalStorage(key: string): boolean;
}
