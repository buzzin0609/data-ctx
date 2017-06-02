/**
 * Convenience wrapper for click handlers using data-ctx-click data attributes
 */

import handleCtxBind from '../data-ctx-bind/data-ctx-bind';

/**
 *   Add one global click handler to the body to handle elements with data-ctx-click as a data attribute
 *   Use .closest polyfill if needed
 */

if ('ontouchstart' in window) {
	let startPosX = 0;
	let startPosY = 0;

	document.addEventListener('touchstart', function (e) {
		startPosX = e.touches[0].clientX;
		startPosY = e.touches[0].clientY;
	});

	document.addEventListener('touchend', function (e) {
		const biggestDiff = Math.max(
			Math.abs(startPosX - e.touches[0].clientX),
			Math.abs(startPosY - e.touches[0].clientY)
		);

		if (biggestDiff < 20) {
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