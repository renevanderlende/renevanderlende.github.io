//http://voidcanvas.com/make-console-log-output-colorful-and-stylish-in-browser-node/
//https://jackcrane.github.io/static/cdn/jconsole.js

const DEBUGCOLORS = false;

    if (DEBUGCOLORS) {

        console.log(crlf);

        //USE: jconsole.css.log(message to log,css code to style the logged message);
        var jconsole = {
                color: { red   :{ log: function(arg) {console.log('%c'+arg,'color:red'   )} },
                         orange:{ log: function(arg) {console.log('%c'+arg,'color:orange')} },
                         yellow:{ log: function(arg) {console.log('%c'+arg,'color:yellow')} },
                         green :{ log: function(arg) {console.log('%c'+arg,'color:green' )} },
                         blue  :{ log: function(arg) {console.log('%c'+arg,'color:blue'  )} },
                         purple:{ log: function(arg) {console.log('%c'+arg,'color:purple')} },
                         teal  :{ log: function(arg) {console.log('%c'+arg,'color:teal'  )}}
                       },
                css: { log: function(arg,css) { console.log('%c'+arg,css) }
                     }
        };

        jconsole.color.red.log   ('logging text color');
        jconsole.color.orange.log('logging text color');
        jconsole.color.yellow.log('logging text color');
        jconsole.color.green.log ('logging text color');
        jconsole.color.blue.log  ('logging text color');
        jconsole.color.purple.log('logging text color');
        jconsole.color.teal.log  ('logging text color');

        jconsole.css.log("logging text css","color:red;");


        function styledConsoleLog() {
        var argArray = [];

            if (arguments.length) {
            var startTagRe = /<span\s+style=(['"])([^'"]*)\1\s*>/gi;
            var endTagRe = /<\/span>/gi;
            var reResultArray;

                argArray.push(arguments[0].replace(startTagRe, '%c').replace(endTagRe, '%c'));

                while (reResultArray = startTagRe.exec(arguments[0])) {
                    argArray.push(reResultArray[2]);
                    argArray.push('');
                };

                // pass through subsequent args since chrome dev tools
                // does not (yet) support console.log styling of the following form:
                // console.log('%cBlue!', 'color: blue;', '%cRed!', 'color: red;');

                for (var j = 1; j < arguments.length; j++) { argArray.push(arguments[j]); };
            };
            console.log.apply(console, argArray);
        };

        styledConsoleLog('<span style="color:hsl(  0, 100%, 90%);background-color:hsl(  0, 100%, 50%);"> Red    </span> ' +
                         '<span style="color:hsl( 39, 100%, 85%);background-color:hsl( 39, 100%, 50%);"> Orange </span> ' +
                         '<span style="color:hsl( 60, 100%, 35%);background-color:hsl( 60, 100%, 50%);"> Yellow </span> ' +
                         '<span style="color:hsl(120, 100%, 60%);background-color:hsl(120, 100%, 25%);"> Green  </span> ' +
                         '<span style="color:hsl(240, 100%, 90%);background-color:hsl(240, 100%, 50%);"> Blue   </span> ' +
                         '<span style="color:hsl(300, 100%, 85%);background-color:hsl(300, 100%, 25%);"> Purple </span> ' +
                         '<span style="color:hsl(  0,   0%, 80%);background-color:hsl(  0,   0%,  0%);"> Black   </span>');

        var styles = [
            'background: linear-gradient(#D33106, #571402)'
            , 'border: 1px solid #3E0E02'
            , 'color: white'
            , 'display: block'
            , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
            , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
            , 'line-height: 40px'
            , 'text-align: center'
            , 'font-weight: bold'
        ].join(';');

        console.log('%c a spicy log message?', styles);
        
        
        
      //For pink background and red text
        console.error("Hello World");  

        //For yellow background and brown text
        console.warn("Hello World");  

        //For just a INFO symbol at the beginning of the text
        console.info("Hello World");  

        //for custom colored text
        console.log('%cHello World','color:blue');
        //here blue could be replaced by any color code

        //for custom colored text with custom background text
        console.log('%cHello World','background:red;color:#fff')

        
        
        /*
        Reset = "\x1b[0m"
        Bright = "\x1b[1m"
        Dim = "\x1b[2m"
        Underscore = "\x1b[4m"
        Blink = "\x1b[5m"
        Reverse = "\x1b[7m"
        Hidden = "\x1b[8m"

        FgBlack = "\x1b[30m"
        FgRed = "\x1b[31m"
        FgGreen = "\x1b[32m"
        FgYellow = "\x1b[33m"
        FgBlue = "\x1b[34m"
        FgMagenta = "\x1b[35m"
        FgCyan = "\x1b[36m"
        FgWhite = "\x1b[37m"

        BgBlack = "\x1b[40m"
        BgRed = "\x1b[41m"
        BgGreen = "\x1b[42m"
        BgYellow = "\x1b[43m"
        BgBlue = "\x1b[44m"
        BgMagenta = "\x1b[45m"
        BgCyan = "\x1b[46m"
        BgWhite = "\x1b[47m"
        */
    }; // if DEBUGCOLORS