import {TSMap} from "typescript-map";

/**
 *
 */
export class Utils {

    static readonly DEFAULT_SELECTOR_PARAMS = ".spycetek-params";

    private static pageParams: AssociativeArray<TSMap<string, any>>;

    /**
     * Parse page parameter like <div class="spycetek-params" data-my-param-1=".." data-my-param-2=".." ...>.
     * This also moves this <div> to the end of <body>.
     */
    private static parsePageParameters(namespace: string) {
        let params = new TSMap<string, any>();
        let $paramTags: JQuery = $('.' + namespace);
        $paramTags.appendTo('body');
        $paramTags.each(function (i, element) {
            $.each($(element).data(), function (key, value) {
                params.set(String(key), value);
            });
        });
        Utils.pageParams[namespace] = params;
    }

    /**
     *
     * @param {string} dataName. e.g. "myValue" for attribute with name "data-my-value".
     * @param namespace
     * @return {any} number, string, or associative array (object)
     */
    public static getPageParameter(dataName: string, namespace: string = Utils.DEFAULT_SELECTOR_PARAMS): any {
        return Utils.getPageParameters(namespace).get(dataName);
    }

    /**
     *
     * @param namespace
     * @return {TSMap<string, any>}
     */
    public static getPageParameters(namespace: string = Utils.DEFAULT_SELECTOR_PARAMS): TSMap<string, any> {
        if (Utils.pageParams[namespace] == null) {
            Utils.parsePageParameters(namespace);
        }

        return Utils.pageParams[namespace];
    }

    /**
     * Format number with comma as thousands separators.
     * @param {number} num
     * @returns {string}
     */
    public static numberFormat(num: number): string {
        return num.toString().replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,');
    }

    // /**
    //  * Returns border spaces of table element in pixels.
    //  * This supports only 0 or number with px unit.
    //  * @return object (associative array) of spaces in pixel.
    //  */
    // public getTableBorderSpaces($table: JQueryStatic) {
    //     let spStr: string = $table.css('border-spacing');
    //     let tokens: string[] = spStr.split(' ');
    //
    //     return {
    //         horizontal: parseValue(tokens[0]),
    //         vertical: parseValue(tokens[1]),
    //     };
    //
    //     function parseValue(str) {
    //         str = str.match(/[0-9]+px/i);
    //         if (str == null) {
    //             return 0;
    //         } else {
    //             str = str[0].replace(/px/i, '');
    //             return Number(str);
    //         }
    //     }
    // }

    /**
     * @param paramName parameter name to parse the value.
     * @param decode true to apply decodeURIComponent on the parsed value.
     */
    public getUrlParameter(paramName: string, decode: boolean) {
        var queryStr = window.location.search.substring(1);
        var params = queryStr.split('&');
        var paramKeyValue;

        for (var i = 0; i < params.length; i++) {
            paramKeyValue = params[i].split('=');

            if (paramKeyValue[0] === paramName) {
                var value = paramKeyValue[1] === undefined ? true : paramKeyValue[1];
                if (typeof value === 'string' && decode) {
                    return decodeURIComponent(value);
                } else {
                    return value;
                }
            }
        }
        return false;
    }

    /**
     * Just a wrapper of localStorage.setItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     *
     * @param {string} key
     * @param {string} value
     * @return {boolean} true if success, false otherwise
     */
    public static setLocalStorage(key: string, value: string): boolean {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * Just a wrapper of localStorage.getItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     */
    public static getLocalStorage(key: string, defaultValue: string): string {
        let ret: string | null;
        try {
            ret = localStorage.getItem(key);
        } catch (e) {
            ret =  defaultValue;
        }
        return (ret === null) ? defaultValue : ret;
    }

    /**
     * Just a wrapper of localStorage.removeItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     */
    public static removeLocalStorage(key: string): boolean {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            return false;
        }
        return true;
    }
}

export interface AssociativeArray<T> {
    [key: string]: T;
}