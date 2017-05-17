/**
 * Simple data context manager. Can use this to build one way data-attribute binding functions or values
 * @author Will Busby - https://github.com/buzzin0609
 */

import ctx from './data-ctx-main/data-ctx';
import {parse} from './data-ctx-bind/data-ctx-bind';
import './data-ctx-click/data-ctx-click';


export default ctx;

export function ctxParse(el) {
    parse(el);
}
