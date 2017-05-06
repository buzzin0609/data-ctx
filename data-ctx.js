/**
 * Simple data context manager. Can use this to build one way data-attribute binding functions or values
 * @author Will Busby - https://github.com/buzzin0609
 */

//debug in localhost environments
var debug = /localhost/.test(location.href);

/**
 * @var contexts - list of contexts which can be utilised in data binding. The global window object is in as a default to use
 */
var contexts = {
	window
};

/**
 * Main module with public methods. Methods defined below
 */
export default {
	getContext,
	setContext,
	extendContext,
	getValue,
	getObject: evalToObject,
	eval: getValueFromExpression,
	reset: resetContexts
};

/**
 * Console warning for when a called context is not found. Only used if in localhost (debug) environment
 * @param {string} name - context name
 */
function noContextWarn(name) {
	if (debug) {
		console.warn('[ctx-context] context - ' + name + ' - not found.');
	}
}

/**
 * Console warning for when a called value is not found. Only used if in localhost (debug) environment
 * @param {string} name - value name
 * @param {string} context - context name
 */
function noValueWarn(name, context) {
	if (debug) {
		console.warn('[ctx-context] value - ' + name + ' - not found in context - ' + context + ' - please double check the variable and context names');
	}
}

/**
 * Retrieve a context object
 * @param {string} name - context name
 * @returns {Object} the context object with key/value pair properties
 */
function getContext(name) {
	if (!contexts[name]) {
		noContextWarn(name);
		return false;
	}
	return contexts[name];
}

/**
 * Set a new context object. Will not override an existing context
 * @param {string} name - context name
 * @param {Object} value - context object
 * @returns {null} null
 */
function setContext(name, value) {
	if (contexts[name]) {
		console.warn('[ctx-context] context - ' + name + ' - already exists. Please choose another name or edit that context directly');
		return false;
	}
	contexts[name] = value;
	//convenience function to extend itself
	//just uses the extendContext function passing the name variable as the contextName with the props
	contexts[name].extend = function (props) {
		extendContext(name, props);
	};
}

/**
 * Extend an existing context
 * @param {string} contextName name of the context
 * @param {Object} props mixed properties to add to context
 * @returns {Object} context object with extended properties
 */
function extendContext(contextName, props) {
	if (!contexts[contextName]) {
		noContextWarn(contextName);
		return false;
	}

	const ctx = contexts[contextName];

	Object.keys(props).forEach(key => {
		if (ctx[key]) {
			console.warn(`[ctx-context] value ${key} in context ${contextName} already exists. You cannot overwrite existing properties. Please rename your extend value and try again.`);
			return false;
		}

		ctx[key] = props[key];
	});

	return ctx;

}

/**
 * Retrieve a value from a given context
 * @param {string} valueName - name of value
 * @param {string} contextName - name of context object
 * @returns {mixed} the value from the given context if exists, empty string if not.
 */
function getValue(valueName, contextName) {
	var context = getContext(contextName);
	if (!context) {
		noContextWarn(contextName);
		return '';
	}
	var value = context[valueName];
	if (!value) {
		noValueWarn(valueName, contextName);
		return '';
	}

	return value;
}

/**
 * Parse a data expression into an object with the context and value as properties
 * @param {string} expression - js dot notation expression to access context
 * @returns {Object} object containing context name and value name
 *      @prop {string} context
 *      @prop {string} value
 */
function evalToObject(expression) {
	const parts = expression.split('.');
	let context = void 0;
	let value = void 0;

	if (parts.length === 0) {
		noContextWarn('undefined');
		return false;
	}

	if (parts.length === 1) {
		context = 'window';
		value = parts[0];
	} else {
		context = parts[0];
		value = parts[1];
	}

	return {
		context,
		value
	};
}

/**
 * Convenience function to retrieve context value straight from the data expression
 * @param {string} expression - object notation expression e.g window.myFunc
 * @returns {mixed} context value
 */
function getValueFromExpression(expression) {
	const contextObj = evalToObject(expression);
	return getValue(contextObj.value, contextObj.context);
}

/**
 * Reset contexts object back to default object
 * mainly for testing purposes
 */
function resetContexts() {
	contexts = {
		window
	};
}