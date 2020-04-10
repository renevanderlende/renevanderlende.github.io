(function(){

var extend = function(obj,ext){
    for(var key in ext) if(ext.hasOwnProperty(key)) obj[key] = ext[key]; return obj; };

var clampDec = function (value,dec) {
    if (dec==null) dec=2; dec = Math.abs(dec);
    return (dec>0) ? Math.ceil(value * Math.pow(10,dec)) / Math.pow(10,dec) : value;
};

// Creates 'calc(mx+b)' from given points p1 and p2 X/Y values for use in CSS
/*******************************************/
window.getlinearEquation = function (options) {
/*******************************************/
    var settings = extend({
        'x1': 320,          // point p1 viewport minimum value
        'y1': 14,           // point p1 minimum size at vp minimum
        'x2': 1280,         // point p2: viewport maximum value
        'y2': 20,           // point p2: maximum size at vp maximum
        // The default point values are demo and can be used to set <html> font-size

        'factor': 16,       // unit calculation factor, default 16 = rem, 1 = px
        'unit'  : 'rem',    // Standard unit to use for 'b'
        'vp'    : 'vmin',   // Viewport dependency unit
        'ratio' : 1,        // multiplication factor for 'y', convenient for boxes

        'precision': 5,     // decimal precision, 5 is usually sufficient enough
                            // e.g. 16:9 = 1.77778, 17:10 = 1.7, golden ratio = 1.618
        'calc'     : true,  // return full 'calc()' or equation only
        'important': false  // convenience, make calc() persistent or not
    }, options);

    /*
        CSS custom variables version

        --m: calc((var(--y2) - var(--y1)) / (var(--x2) - var(--x1)));
        --b: calc( var(--y1) - var(--m) * var(--x1));
        --y: calc( var(--m)  * var(--x) + var(--b));

        or

        --x: --js-v*** JS value;
        --y: calc( var(--y1) + (var(--y2) - var(--y1)) / (var(--x2) - var(--x1)) * (var(--x) - var(--x1)) );

        BEWARE: --x has to be the current 100vmin/vh/vw/vmax without unit, which has to be derived by JS as
                the current CSS custom variable system does not update that value on browser resize.
                (See below 'updateVPsizeValues()' for an example)
    */
    var x1 = settings.x1, y1 = settings.y1;
    var x2 = settings.x2, y2 = settings.y2;

    // Slope, 'm' (steepness of line)
    var m = (y2 - y1) / (x2 - x1);
    // Run, 'x' (how far along the line), is always 100vmin/vh/vw/vmax
    var x = 100;
    // Y-Intercept, 'b' (where the line crosses the Y-axis)
    var b = (settings.factor==1) ? y1 - m * x1 : (y1 - m * x1) / settings.factor;

    /*
        OUTPUT construction

        - mx   = multiply 'm' by 100 to turn '0.xxx * 100vmin' into 'xx.xvmin' and add vp unit
        - bOut = empty when b is 0, else when 'b' is larger than 0 then use a '+', otherwise use '-'
                 and when factor = 1 use 'px', otherwise use specified unit

        - when ratio <> 1 add left parenthesis

        - ratioOut = when ratio <> 1 add left and right parenthesis and multiplifcation of the factor
                     when b=0 leave out parenthesis

        - impOut = add '!important' when requested, but only when 'calc' is requested too

        - All calculated values will use the specified decimal precision
    */
    var prefix = 'calc(', output = '', suffix = ')';

    var mxOut = clampDec(m * x,settings.precision) + settings.vp;
    var bOut  = (b==0) ? '' :  ((b>0) ? ' + ' : ' - ') +
                               Math.abs(clampDec(b,settings.precision)) +
                               ((settings.factor==1) ? 'px' : settings.unit );
    var ratioOut = { 
            L: (settings.ratio==1) ? '' : ((b==0) ? '' : '('),
            R: (settings.ratio==1) ? '' : ((b==0) ? ' * ' : ') * ') + clampDec(settings.ratio,settings.precision)
    };
    var impOut = (settings.important) ? ' !important;' : ';';
    
    if (!b==0) { // 'calc()' needed when b<>0
        output = ratioOut.L + mxOut + bOut + ratioOut.R;
        output = (settings.calc) ? prefix + output + suffix + impOut: output;
    }
    else
        if (settings.ratio==1) { // b=0 and ratio=1 then no 'calc()' needed, ignore settings.calc
            output = mxOut + bOut + impOut;
        }
        else { // b=0 and ratio<>1 then need 'calc()' for mx * ratio
            output = ratioOut.L + mxOut + ratioOut.R;
            output = (settings.calc) ? prefix + output + suffix + impOut: output;
        };

    // Return either the equation as a full 'calc();' or just the equation
    //  (y1 + (y2 - y1) / (x2 - x1) * (x - x1))
    return { 
        calc: output
    };

};
})();

// Purposely commented out
/*
function updateVPsizeValues() {
var root = document.documentElement;
// Find the min/max of viewport Width/Height
// and set custom variables accordingly so we can use it with CSS var()
root.style.setProperty('--js-vmin', Math.min(window.innerWidth, window.innerHeight));
root.style.setProperty('--js-vmax', Math.max(window.innerWidth, window.innerHeight));
root.style.setProperty('--js-vw'  , window.innerWidth);
root.style.setProperty('--js-vh'  , window.innerHeight);
};
window.addEventListener('resize', updateVPsizeValues);
*/

// For debugging purposes
var TEST_getlinearEquation = false;

if (TEST_getlinearEquation) {
    var test_getlinearEquation = {
            t000: '---',
            t001: getlinearEquation( { y1: 160, x2: 1920, y2: 960 } ),
            t002: getlinearEquation( { y1: 160, x2: 1920, y2: 960, factor: 1 } ),
            t003: getlinearEquation( { y1: 160, x2: 1920, y2: 960, factor: 1, unit: 'ch' } ),
            t004: getlinearEquation( { y1: 160, x2: 1920, y2: 960, factor: 3, unit: 'pc' } ),
            t005: getlinearEquation( { y1: 160, x2: 1920, y2: 960, factor: 3, unit: 'pc', important: true } ),
            t006: getlinearEquation( { y1: 160, x2: 1920, y2: 960, factor: 3, unit: 'pc', vp: 'vw', important: true } ),
            t007: getlinearEquation( { y1: 160, x2: 1920, y2: 960, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),
            t008: getlinearEquation( { y1: 160, x2: 1920, y2: 960, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),

            t100: '---',
            t101: getlinearEquation( { y1: 160, x2: 1920, y2: 960, ratio: 1.7 } ),
            t102: getlinearEquation( { y1: 160, x2: 1920, y2: 960, ratio: 1.7, factor: 1 } ),
            t103: getlinearEquation( { y1: 160, x2: 1920, y2: 960, ratio: 1.7, factor: 1, unit: 'ch' } ),
            t104: getlinearEquation( { y1: 160, x2: 1920, y2: 960, ratio: 1.7, factor: 3, unit: 'pc' } ),
            t105: getlinearEquation( { y1: 160, x2: 1920, y2: 960, ratio: 1.7, factor: 3, unit: 'pc', important: true } ),
            t106: getlinearEquation( { y1: 160, x2: 1920, y2: 960, ratio: 1.7, factor: 3, unit: 'pc', vp: 'vw', important: true } ),
            t107: getlinearEquation( { y1: 160, x2: 1920, y2: 960, ratio: 1.7, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),
            t108: getlinearEquation( { y1: 160, x2: 1920, y2: 960, ratio: 1.7, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),

            t200: '---',
            t201: getlinearEquation( { y1: 285, x2: 1920, y2: 540 } ),
            t202: getlinearEquation( { y1: 285, x2: 1920, y2: 540, factor: 1 } ),
            t203: getlinearEquation( { y1: 285, x2: 1920, y2: 540, factor: 1, unit: 'ch' } ),
            t204: getlinearEquation( { y1: 285, x2: 1920, y2: 540, factor: 3, unit: 'pc' } ),
            t205: getlinearEquation( { y1: 285, x2: 1920, y2: 540, factor: 3, unit: 'pc', important: true } ),
            t206: getlinearEquation( { y1: 285, x2: 1920, y2: 540, factor: 3, unit: 'pc', vp: 'vw', important: true } ),
            t207: getlinearEquation( { y1: 285, x2: 1920, y2: 540, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),
            t208: getlinearEquation( { y1: 285, x2: 1920, y2: 540, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),

            t300: '---',
            t301: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778 } ),
            t302: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, factor: 1 } ),
            t303: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, factor: 1, unit: 'ch' } ),
            t304: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, factor: 3, unit: 'pc' } ),
            t305: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, factor: 3, unit: 'pc', important: true } ),
            t306: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, factor: 3, unit: 'pc', vp: 'vw', important: true } ),
            t307: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),
            t308: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),

            t400: '---',
            t401: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, precision: 3 } ),
            t402: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, precision: 3, factor: 1 } ),
            t403: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, precision: 3, factor: 1, unit: 'ch' } ),
            t404: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, precision: 3, factor: 3, unit: 'pc' } ),
            t405: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, precision: 3, factor: 3, unit: 'pc', important: true } ),
            t406: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, precision: 3, factor: 3, unit: 'pc', vp: 'vw', important: true } ),
            t407: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, precision: 3, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),
            t408: getlinearEquation( { y1: 285, x2: 1920, y2: 540, ratio: 1.77778, precision: 3, factor: 3, unit: 'pc', vp: 'vw', important: true, calc: false } ),
          };

        console.log('test_getlinearEquation',test_getlinearEquation);
};



