# data-ctx
Simple data context manager. Can use this to build one way data-attribute binding functions or values to DOM elements.
The dom usage is similar to Angular JS, but that is the only similarity. This is purely for UI data binding and not an MVC project

data-ctx provides a simple way to manage dynamic DOM updating and event handling.

- note: data-ctx uses es6 modules by default, so you will need to use a bundler and babel to compile

Simple usage

```javascript
//app.js
import ctx from 'data-ctx'


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

## Handling click events

Easy, just add the data-ctx-click attribute with you context string to fire that function on click

```html
<button data-ctx-click="app.alert">Click me</button>
```
And in your js

```javascript
import ctx from 'data-ctx';

ctx.setContext('app', {
    //click events pass in the clicked elements, not an event object. The event is already preventDefault(ed)
    alert: function(el) {
        alert('clicked the button, yo');
    }
})

```


# API

## Attributes
Default attributes that work out the box
- data-ctx-bind 
- data-ctx-click

## data-ctx.js
- getContext : retrieve a context
- setContext : set a NEW context
- extendContext : use this for extending existing contexts and not setContext

## data-bind-ctx
- parse : Is use explicitely on DOM ready, but you can use this to dynamically parse elements that are included to the DOM later,  like after an AJAX request
