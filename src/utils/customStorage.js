"use client";

import Cookies from "js-cookie";

export class CustomStorage {
    static get(name, defaultValue = null) {
        return Cookies.get(name) || defaultValue
    }
    static getObj(name, defaultValue = null) {
        return JSON.parse(CustomStorage.get(name, defaultValue))
    }
    static set(name, value, options = {}) {
        return Cookies.set(name, value, options)
    }
    static setObj(name, value, options = {}) {
        return Cookies.set(name, JSON.stringify(value), options)
    }
    static has(name) {
        return !!Cookies.get(name)
    }
    static remove(name) {
        Cookies.remove(name)
    }
}
