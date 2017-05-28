/**
 * Convenience wrapper for click handlers using data-ctx-click data attributes
 */

import handleCtxBind from '../data-ctx-bind/data-ctx-bind';

/**
 *   Add one global click handler to the body to handle elements with data-ctx-click as a data attribute
 *   Use .closest polyfill if needed
 */

if ('ontouchstart' in window) {
	var newTouch = false;

	document.addEventListener('touchstart', function (e) {
		newTouch = true;
	});

	document.addEventListener('touchmove', function (e) {
		newTouch = false;
	});

	document.addEventListener('touchend', function (e) {
		if (newTouch) {
			decide(e);
		}
	});
} else {
	document.addEventListener('click', decide);
}

function decide(e) {
	if (e.target.closest('[data-ctx-click]')) {
		handleCtxClick(e);
	}
}

/**
 * Function here essentially uses the global handleHnBind function, passing in the element (referenced as this in the function context) and 'data-ctx-click' as the attribute name.
 * @param {object} e - the event object
 */
export default function handleCtxClick(e) {
	e.preventDefault();
	handleCtxBind(e.target.closest('[data-ctx-click]'), 'data-ctx-click', e);
}