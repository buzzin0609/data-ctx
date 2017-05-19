/**
 * Bind context functions to DOM elements using the data-ctx-bind data-attribute
 */

import ctx from '../data-ctx-main/data-ctx';
import domReady from './dom-ready'
//parse and handle bindings on DOM ready
domReady(parse);

/**
 * parsing function to handle all current visible elements with data-hn-bind as a data attribute
 */
export function parse() {
	const els = document.querySelectorAll('[data-ctx-bind]');

	for (let i = 0, l = els.length; i < l; i++) {
		if (els[i].className.indexOf('ctx-bound') !== -1) continue;
		handleCtxBind(els[i], 'data-ctx-bind');
	}
}

/**
 * A global function to handle data binding
 * The function will take the dataName and evaluate it using the context.eval function. If a function is found as a result of the evaluation, the function will fire having the element passed in as a parameter. Otherwise a string value is assumed and set as the element html.
 * @param {any} el - the element to which the data attribute is attached
 * @param {any} dataName - the data attribute name, data-ctx-bind by default;
 */
export default function handleCtxBind(el, dataName, e) {
	const expressions = getExpressions(el.getAttribute(dataName));
	expressions.forEach(expr => bind(el, expr, dataName, e))

}

/**
 * Adds support for multiple expressions to be evaluated.
 * @param {string} fullStr - the full expression string
 * @returns {Array} of expressions
 */
export function getExpressions(fullStr) {
	return fullStr.indexOf(',') !== -1 && fullStr.split(/\s*(.[^,]*),?/) || [fullStr];
}

export function bind(el, expr, dataName, e) {
	const result = ctx.eval(expr);
	if (result) {
		if (typeof result === "function") {
			result(el, e);
		} else {
			el.innerHTML = result;
		}

		if (dataName === 'data-ctx-bind' && el.className.indexOf('ctx-bound') === -1) {
			//Sometimes you might want to keep an element hidden, or you want to wait until it's value has been assigned before performing some style modification. Add a class to the element here to use in CSS
			el.className += ' ctx-bound';
		}

	} else {
		//console warning if no value found in contexts
		console.warn(`[${dataName}-error] result ${result} does not exist. Please double check ${result} is defined in your script files`);
	}
}