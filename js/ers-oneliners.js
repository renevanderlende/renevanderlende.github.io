// Shortcuts to HTML elements references, by ID or by various selectors.
// Param: selector string
var ALL = function (s) { return document.querySelectorAll(s); };
var CLS = function (s) { return document.getElementsByClassName(s); };
var ID  = function (s) { return document.getElementById(s); };
var SEL = function (s) { return document.querySelector(s); };
var TAG = function (s) { return document.getElementsByTagName(s); };

//Returns a values clamped to a given number of decimals.
//Params: float [, required # of decimals, default = 2]
/************************************/
var clampDec = function (value,dec) {
/************************************/
 if (dec==null) dec=2;
 return (dec>0) ? Math.ceil(value * Math.pow(10,dec)) / Math.pow(10,dec) : Math.ceil(value);
};

/*******************************************************/
var forEachEntryIn = function (array, callback, scope) {
/*******************************************************/
 for (var i = 0; i < array.length; i++) { callback.call(scope, i, array[i]); } };

var getComputedProperty = function (el,prop) { return window.getComputedStyle(el,null).getPropertyValue(prop) };

var addEvent = function (el, type, fn) {
if (el.addEventListener) el.addEventListener(type, fn, false); else el.attachEvent('on'+type, fn); };


