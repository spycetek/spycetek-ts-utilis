"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
var typescript_map_1 = require("typescript-map");
/**
 *
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Parse page parameter like <div class="spycetek-params" data-my-param-1=".." data-my-param-2=".." ...>.
     * This also moves this <div> to the end of <body>.
     */
    Utils.parsePageParameters = function (namespace) {
        var params = new typescript_map_1.TSMap();
        var $paramTags = $('.' + namespace);
        $paramTags.appendTo('body');
        $paramTags.each(function (i, element) {
            $.each($(element).data(), function (key, value) {
                params.set(String(key), value);
            });
        });
        Utils.pageParams[namespace] = params;
    };
    /**
     *
     * @param {string} dataName. e.g. "myValue" for attribute with name "data-my-value".
     * @param namespace
     * @return {any} number, string, or associative array (object)
     */
    Utils.getPageParameter = function (dataName, namespace) {
        if (namespace === void 0) { namespace = Utils.DEFAULT_SELECTOR_PARAMS; }
        return Utils.getPageParameters(namespace).get(dataName);
    };
    /**
     *
     * @param namespace
     * @return {TSMap<string, any>}
     */
    Utils.getPageParameters = function (namespace) {
        if (namespace === void 0) { namespace = Utils.DEFAULT_SELECTOR_PARAMS; }
        if (Utils.pageParams[namespace] == null) {
            Utils.parsePageParameters(namespace);
        }
        return Utils.pageParams[namespace];
    };
    /**
     * Remove specified page parameter from both memory and DOM.
     * @param dataName
     * @param namespace
     */
    Utils.removePageParameter = function (dataName, namespace) {
        var map = Utils.getPageParameters(namespace);
        map.delete(dataName);
        var $paramTags = $('.' + namespace);
        $paramTags.removeData(dataName); // Remove value on memory
        $paramTags.removeAttr("data-" + Utils.camelToKebab(dataName)); // Remove from DOM
    };
    Utils.camelToKebab = function (text) {
        return text
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
            .toLowerCase();
    };
    /**
     * Format number with comma as thousands separators.
     * @param {number} num
     * @returns {string}
     */
    Utils.numberFormat = function (num) {
        return num.toString().replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g, '$1,');
    };
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
    Utils.prototype.getUrlParameter = function (paramName, decode) {
        var queryStr = window.location.search.substring(1);
        var params = queryStr.split('&');
        var paramKeyValue;
        for (var i = 0; i < params.length; i++) {
            paramKeyValue = params[i].split('=');
            if (paramKeyValue[0] === paramName) {
                var value = paramKeyValue[1] === undefined ? true : paramKeyValue[1];
                if (typeof value === 'string' && decode) {
                    return decodeURIComponent(value);
                }
                else {
                    return value;
                }
            }
        }
        return false;
    };
    /**
     * Just a wrapper of localStorage.setItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     *
     * @param {string} key
     * @param {string} value
     * @return {boolean} true if success, false otherwise
     */
    Utils.setLocalStorage = function (key, value) {
        try {
            localStorage.setItem(key, value);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    /**
     * Just a wrapper of localStorage.getItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     */
    Utils.getLocalStorage = function (key, defaultValue) {
        var ret;
        try {
            ret = localStorage.getItem(key);
        }
        catch (e) {
            ret = defaultValue;
        }
        return (ret === null) ? defaultValue : ret;
    };
    /**
     * Just a wrapper of localStorage.removeItem().
     * This is workaround for the issue that accesses to localStorage from
     * iOS Safari private mode throws an exception.
     */
    Utils.removeLocalStorage = function (key) {
        try {
            localStorage.removeItem(key);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    Utils.DEFAULT_SELECTOR_PARAMS = "spycetek-params";
    Utils.pageParams = {};
    return Utils;
}());
exports.Utils = Utils;
