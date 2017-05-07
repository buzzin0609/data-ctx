/**
 * Convenience wrapper for click handlers using data-ctx-click data attributes
 */

import handleCtxBind from 'data-ctx-bind';

/**
 *   Add one global click handler to the body to handle elements with data-ctx-click as a data attribute
 *   Use .closest polyfill if needed
 */
document.addEventListener('click', function(e) {
	if (e.target.closest('[data-ctx-click]')) {
		handleCtxClick(e);
	}
});

/**
 * Function here essentially uses the global handleHnBind function, passing in the element (referenced as this in the function context) and 'data-ctx-click' as the attribute name.
 * @param {object} e - the event object
 */
export default function handleCtxClick(e) {
	e.preventDefault();
	handleCtxBind(this, 'data-ctx-click');
}