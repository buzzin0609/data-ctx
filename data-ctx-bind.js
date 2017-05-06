/**
 * Bind context functions to DOM elements using the data-ctx-bind data-attribute
 */

import ctx from './data-ctx';

//parse and handle bindings on DOM ready
$(parse);

/**
 * parsing function to handle all current visible elements with data-hn-bind as a data attribute
 */
export function parse() {
	const els = document.querySelectorAll('[data-ctx-bind]');

	for (let i = 0, l = els.length; i < l; i++) {
		handleCtxBind(els[i]);
	}
}

/**
 * A global function to handle data binding
 * The function will take the dataName and evaluate it using the context.eval function. If a function is found as a result of the evaluation, the function will fire having the element passed in as a parameter. Otherwise a string value is assumed and set as the element html.
 * @param {any} el - the element to which the data attribute is attached
 * @param {any} dataName - the data attribute name, data-ctx-bind by default;
 */
export default function handleCtxBind(el, dataName) {
	dataName = dataName || 'data-ctx-bind';

	const result = ctx.eval(el.getAttribute(dataName));
	if (result) {
		if (typeof result === "function") {
			result(el);
		} else {
			el.innerHTML = result;
		}

		if (dataName === 'data-ctx-bind') {
			//Sometimes you might want to keep an element hidden, or you want to wait until it's value has been assigned before performing some style modification. Add a class to the element here to use in CSS
			el.className += ' ctx-bound';
		}

	} else {
		//console warning if no value found in contexts
		console.warn(`[${dataName}-error] result ${result} does not exist. Please double check ${result} is defined in your script files`);
	}
}