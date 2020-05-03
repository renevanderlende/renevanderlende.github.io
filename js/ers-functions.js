// Shortcuts to HTML elements references, by ID or by various selectors.
// Param: selector string
var ALL = function (s) { return document.querySelectorAll(s); };
var CLS = function (s) { return document.getElementsByClassName(s); };
var ID  = function (s) { return document.getElementById(s); };
var SEL = function (s) { return document.querySelector(s); };
var TAG = function (s) { return document.getElementsByTagName(s); };

// Shortcuts to <html>, <body> and <head> elements
var html = document.documentElement;
var body = document.body;
var head = document.head;

/************************************/
// Returns a values rounded up to a given number of decimals.
// Params: float [, required # of decimals, default = 3]
var clampDec = function (value,dec) {
 if (dec==null) dec=3; dec = Math.abs(dec);
 return (dec>0) ? Math.ceil(value * Math.pow(10,dec)) / Math.pow(10,dec) : value;
};
// Rounded down
var clampDecLow = function (value,dec) {
 if (dec==null) dec=3; dec = Math.abs(dec);
 return (dec>0) ? Math.floor(value * Math.pow(10,dec)) / Math.pow(10,dec) : value;
};

/****************************************************/
//Traverse an array and execute the passed callback function for each array element found
var forEachEntryIn = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) { callback.call(scope, i, array[i]); } };

/************************************/
var addEvent = function (el, type, fn) {
if (el.addEventListener) el.addEventListener(type, fn, false); else el.attachEvent('on'+type, fn); };

/*************************/
// Toggle the use of a specific style element by ID (param: id string )
function toggleStyleById(s)     { switchAbility(ID(s)); }

/*************************/
// Toggle abilities of an array of elements (param: string of CSS selectors)
function switchAbilities(s)     { forEachEntryIn(ALL(s), function (idx,el,sc) { switchAbility(el) }); }

/***********************/
// Toggle ability of a single element (en/disabled) (param: element)
function switchAbility(e)       { e.disabled = !e.disabled; }

/**************************/
// (Initially a string with value 'inherit'. To toggle, however, use booleans. Yes, quotes! Nasty....)
function switchEditAll(s)       { forEachEntryIn( ALL(s), function (idx,el,sc) { switchEditable(el) }); }
function switchEditbyId(s)      { switchEditable(ID(s)); }
function switchEditable(e)      { if (e.contentEditable == "true") e.contentEditable = false; else e.contentEditable = true; }

// Toggle custom <html>, <body> or <head> attributes ON or OFF (param: attribute string)
function toggleHtmlAttribute(a) { if (html.getAttribute(a)=='1') html.setAttribute(a,'0'); else html.setAttribute(a,'1'); }
function toggleBodyAttribute(a) { if (body.getAttribute(a)=='1') body.setAttribute(a,'0'); else body.setAttribute(a,'1'); }
function toggleHeadAttribute(a) { if (head.getAttribute(a)=='1') head.setAttribute(a,'0'); else head.setAttribute(a,'1'); }

/**********************************/
// Toggle any custom attribute ON or OFF (param: element, attribute string, on string, off string)
function toggleAttribute(e,a,on,off)    { if (e.getAttribute(a)==on) e.setAttribute(a,off); else e.setAttribute(a,on); }
function toggleAttributeById(s,a,on,off){ toggleAttribute(ID(s),a,on,off); }
function toggleAttributeAll(s,a,on,off) { forEachEntryIn(ALL(s), function (idx,el,sc) { toggleAttribute(el,a,on,off); }); }

/**********************/
// Toggles the document <html> direction given passed param, where L = 'ltr' anything else = 'rtl'
function toggleDocDir(s)        { if  (s.toUpperCase()=='L') toggleLtr(html); else toggleRtl(html); }

// Toggles the document element direction from LTR to RTL, use in 'left-to-right' reading favouring regions
function toggleLtr(e)           { if  (e.getAttribute('dir')=='rtl') e.setAttribute('dir','ltr');
                                  else e.setAttribute('dir','rtl'); }

// Inverse logic for 'right-to-left' reading favouring regions (I am NL, so, not tested. Please report errors)
function toggleRtl(e)           { if  (e.getAttribute('dir')=='ltr') e.setAttribute('dir','rtl');
                                  else e.setAttribute('dir','ltr'); }

/*********************/
/* Shift :focus to the element with given ID */
function moveFocusTo(s)         { ID(s).focus(); };
/*********************/


(function(){
var extend = function(obj,ext){
    for(var key in ext) if(ext.hasOwnProperty(key)) obj[key] = ext[key]; return obj; };

// Creates 'calc(mx+b)' from given points p1 and p2 x,y values for use in CSS
/*******************************************/
window.getlinearEquation = function (options) {
/*******************************************/
    var settings = extend({
        'x1'       : 320, /* change defaults to meet your requirements */
        'y1'       : 14,
        'x2'       : 1280,
        'y2'       : 20,
        'factor'   : 16,
        'unit'     : 'rem',
        'vp'       : 'vmin',
        'ratio'    : 1,
        'precision': 3,
        'calc'     : true,
        'comment'  : false,
        'important': false
    }, options);

    var x1 = settings.x1, y1 = settings.y1;
    var x2 = settings.x2, y2 = settings.y2;
    var p  = settings.precision;

    var m = (y2 - y1) / (x2 - x1);
    var x = 100;
    var b = (settings.factor==1) ? y1 - m * x1 : (y1 - m * x1) / settings.factor;

    var prefix = 'calc(', output = '', suffix = ')';

    var mxOut = clampDec(m * x,settings.precision) + settings.vp;

    var bOut  = (b==0) ? '' :  ((b>0) ? ' + ' : ' - ') +
                               Math.abs(clampDec(b,settings.precision)) +
                               ((settings.factor==1) ? 'px' : settings.unit );
    var ratioOut = { 
            L: (settings.ratio==1) ? '' : ((b==0) ? '' : '('),
            R: (settings.ratio==1) ? '' : ((b==0) ? ' * ' : ') * ') + clampDec(settings.ratio,settings.precision)
    };

    var comOut = (settings.comment)   ? ' /* (' +
            settings.x1 + ',' + settings.y1 + ')(' +
            settings.x2 + ',' + settings.y2 +  ') */' : '';

    var impOut = (settings.important) ? ' !important;' : ';';
    
    if (!b==0) { // 'calc()' needed when b<>0
        output = ratioOut.L + mxOut + bOut + ratioOut.R;
        output = (settings.calc) ? prefix + output + suffix + impOut + comOut: output;
    }
    else
        if (settings.ratio==1) { // b=0 and ratio=1 then no 'calc()' needed, ignores settings.calc
            output = mxOut + bOut + impOut + comOut;
        }
        else { // b=0 and ratio<>1 then need 'calc()' for mx * ratio
            output = ratioOut.L + mxOut + ratioOut.R;
            output = (settings.calc) ? prefix + output + suffix + impOut + comOut: output;
        };

    // Return either the equation as a full 'calc();' or just the equation
    return { 
        calc: output
    };
};
})();



