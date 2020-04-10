// Shortcuts to HTML elements references, by ID or by various selectors.
// Param: selector string
var ALL = function (s) { return document.querySelectorAll(s); };
var CLS = function (s) { return document.getElementsByClassName(s); };
var ID  = function (s) { return document.getElementById(s); };
var SEL = function (s) { return document.querySelector(s); };
var TAG = function (s) { return document.getElementsByTagName(s); };

/************************************/
// Returns a values rounded up to a given number of decimals.
// Params: float [, required # of decimals, default = 2]
var clampDec = function (value,dec) {
 if (dec==null) dec=2; dec = Math.abs(dec);
 return (dec>0) ? Math.ceil(value * Math.pow(10,dec)) / Math.pow(10,dec) : value;
};
// Rounded down
var clampDecLow = function (value,dec) {
 if (dec==null) dec=2; dec = Math.abs(dec);
 return (dec>0) ? Math.floor(value * Math.pow(10,dec)) / Math.pow(10,dec) : value;
};

/****************************************************/
//Traverse an array and execute the passed callback function for each array element found
var forEachEntryIn = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) { callback.call(scope, i, array[i]); } };

/******************************************/
var getComputedProperty = function (el,prop) { return window.getComputedStyle(el,null).getPropertyValue(prop) };

/************************************/
var addEvent = function (el, type, fn) {
if (el.addEventListener) el.addEventListener(type, fn, false); else el.attachEvent('on'+type, fn); };

/*************************/
// Toggle the use of a specific style element by ID (param: id string )
function toggleStyleById(s) { switchAbility(ID(s)); }

/*************************/
// Toggle abilities of an array of elements (param: string of CSS selectors)
function switchAbilities(s) { forEachEntryIn(ALL(s), function (idx,el,sc) { switchAbility(el) }); }

/***********************/
// Toggle ability of a single element (en/disabled) (param: element)
function switchAbility(e)   { e.disabled = !e.disabled; }

/**************************/
// (Initially a string with value 'inherit'. To toggle, however, use booleans. Yes, quotes! Nasty....)
function switchStylesEdit(s)    { forEachEntryIn( ALL(s), function (idx,el,sc) { switchStyleEdit(el) }); }
function switchStyleEditbyId(s) { switchStyleEdit(ID(s)); }
function switchStyleEdit(e)     { if (e.contentEditable == "true") e.contentEditable = false; else e.contentEditable = true; }

/**********************************/
// Toggle any custom attribute ON or OFF (param: element, attribute string, on string, off string)
function toggleAttribute(e,a,on,off)     { if (e.getAttribute(a)==on) e.setAttribute(a,off); else e.setAttribute(a,on); }
function toggleAttributeById(s,a,on,off) { toggleAttribute(ID(s),a,on,off); }
function toggleAttributeAll(s,a,on,off)  { forEachEntryIn(ALL(s), function (idx,el,sc) { toggleAttribute(el,a,on,off); }); }


