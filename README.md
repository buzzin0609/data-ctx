# data-ctx
Simple data context manager. Can use this to build one way data-attribute binding functions or values to DOM elements.
The dom usage is similar to Angular JS, but that is the only similarity. This is purely for UI data binding and not an MVC project

data-ctx provides a simple way to manage dynamic DOM updating and event handling.

- note: data-ctx uses es6 modules by default, so you will need to use a bundler and babel to compile

Simple usage

```javascript
//app.js
import ctx from 'data-ctx'
//data-ctx-bind and data-ctx-click only need to be loaded once for your app to enable auto parsing of the DOM, 
//so import them once in your main app file.
import 'data-ctx-bind'
import 'data-ctx-click'

ctx.setContext('app', {
    title: 'Shiny Title'
});

```
Now in your html

```html
<h1 data-ctx-bind="app.title"></h1>
```
Which outputs

```html
<h1 class="ctx-bound" data-ctx-bind="app.title">Shiny Title</h1>
```

# API
## data-ctx.js
- getContext : retrieve a context
- setContext : set a NEW context
- extendContext : use this for extending existing contexts and not setContext

## data-bind-ctx
- parse : Is use explicitely on DOM ready, but you can use this to dynamically parse elements that are included to the DOM later,  like after an AJAX request
