var __root__ = document.documentElement;

var getComputedProperty = function (el,prop) { return window.getComputedStyle(el,null).getPropertyValue(prop) };

function updateRootValues() {
/*
    Keep this content as short as possible as it is called on each browser resize!!
*/
// Find the min/max of viewport W/H
// and set custom variables accordingly so we can use it with CSS var()
__root__.style.setProperty('--js-vmin', Math.min(window.innerWidth, window.innerHeight));
__root__.style.setProperty('--js-vmax', Math.max(window.innerWidth, window.innerHeight));
__root__.style.setProperty('--js-vw'  , window.innerWidth);
__root__.style.setProperty('--js-vh'  , window.innerHeight);
};

function setRootDefaults() {
    // Add anything that needs to be initialized once

// Very WIP!, only on document load because of responsive html fontsize
var fs = parseFloat(getComputedProperty(__root__,'font-size'));
if (!fs==16) { __root__.style.setProperty('--def-px',fs); };
/**/

    updateRootValues();
};

document.addEventListener('DOMContentLoaded', setRootDefaults);
window.addEventListener('resize', updateRootValues);
