## mossa.js [![npm version](https://badge.fury.io/js/mossa.svg)](http://badge.fury.io/js/mossa)

> An Italian library to move elements :it: 

#### install
Available on npm:
`npm install mossa` or [directly download](https://github.com/evandroeisinger/mossa.js/raw/master/src/mossa.js)

#### basic usage
Just create a new instance of mossa.js for each element you want to move.

```html
<article>
  <h1>mossa.js</h1>
  <p>Lorem ipsum dolizzle sit amizzle, i saw beyonces tizzles and my pizzle went crizzle adipiscing my shizz. Ghetto sapien velizzle, aliquet volutpizzle, fizzle quizzle, pimpin' vel, arcu. Pellentesque gangsta tortor.</p>
  <figure>
    <img src="example.jpg">
  </figure>
</article>
```

```javascript
new Mossa(document.getElementsByTagName('figure')[0], {
  onStartMoving: function(element, thumbnail) {
    console.log('onStartMoving: ', element, thumbnail);
  },
  onDrop: function(element) {
    console.log('onDrop: ', element);
  }
});
```
---
### constructor
```javascript
new Mossa(DOMElement, options);
```
###### parameters
  - **DOMElement**: the element that will be used for Mossa.js instantiation
  - **options**
    - *onStartMoving(element, thumbnail)*: callback called when the element start moving
    - *onDrop(element)*: callback called when the element has been dropped

---
## support
- chrome: latest
- firefox: latest
- safari: latest
- internet explore: ? 

---
## contribute
Everyone can contribute! Finding bugs, creating issues, improving documentation, improving editor it self or creating components.
Every contribution will be welcomed! :santa: 

**Fork it** -> **Branch it** -> **Test it** -> **Push it** -> **Pull Request it** :gem:  