//custom on dom ready handler for functions when jQuery not needed

//array of callbacks to call on dom ready
export const callbacks = [];

/**
 * Fires all callbacks
 */
export function onReady() {
	let i = 0;
	const len = callbacks.length;

	for (; i < len; i++) {
		callbacks[i].call(callbacks[i]);
	}
}

//register the onReady function to fire on DOMContentLoaded
document.addEventListener('DOMContentLoaded', onReady);

/**
 * Main registering function. Will call the function if DOM is already available
 * @param {Function} cb
 */
export default function domReady(cb) {
	if (document.readyState === 'complete') {
		//fire if dom ready
		cb.call(cb);
	} else {
		//add to callbacks array to be fired when DOM ready
		callbacks.push(cb);
	}
}
