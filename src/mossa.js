(function (global, Mossa) {
  'use strict';

  if (typeof define === 'function' && define.amd)
    define('mossa-js', [], Mossa);
  else if (typeof exports !== 'undefined')
    exports.Mossa = Mossa();
  else
    global.Mossa = Mossa();
}(window, function() {
  'use strict';

  function Mossa(element, options) {
    var self = this;

    if (!element || !element.children)
      return new Error('No element or valid element was passed!');

    element.draggable = false;
    self.options = options || {};
    self.element = element;
    self.dropArea = self.createDropArea();
    self.button = self.getButton(element) || self.createButton();
    self.thumbnail = null;
    self.elementSiblings = null;

    self.startMoving = function(e) {
      e.preventDefault();
      var parent = self.element.parentElement,
          child;

      self.thumbnail = self.createThumbnail(self.element, e);
      self.elementSiblings = element.parentElement.children;
      self.element.style.display = 'none';
      
      self.moveThumbnail(self.thumbnail, e);
      self.insertThumbnail(self.thumbnail);
      
      for (var i = self.elementSiblings.length - 1; i >= 0; i--) {
        child = self.elementSiblings[i];
        child.addEventListener('mouseover', self.addDropArea);
        child.addEventListener('mouseup', self.drop);
      }

      document.addEventListener('mouseup', self.stopMoving);
      document.addEventListener('mousemove', self.move);

      if (self.options.onStartMoving)
        self.options.onStartMoving(self.element, self.thumbnail);
    }

    self.move = function(e) {
      e.preventDefault();

      self.moveThumbnail(self.thumbnail, e);
    }

    self.drop = function(e) {
      e.preventDefault();

      self.insertElement(self.element, self.dropArea);
      if (self.options.onDrop)
        self.options.onDrop(self.element);
    }

    self.addDropArea = function(e) {
      e.preventDefault();

      self.insertDropArea(self.dropArea, e.currentTarget);
    }

    self.stopMoving = function(e) {
      e.preventDefault();

      self.element.style.display = 'block';
      self.removeThumbnail(self.thumbnail);
      self.removeDropArea(self.dropArea);

      for (var i = self.elementSiblings.length - 1; i >= 0; i--) {
        self.elementSiblings[i].removeEventListener('mouseover', self.addDropArea);
        self.elementSiblings[i].removeEventListener('mouseup', self.drop);
      }

      document.removeEventListener('mouseup', self.stopMoving);
      document.removeEventListener('mousemove', self.move);
    }

    self.dropArea.addEventListener('mouseup', self.drop);
    self.button.addEventListener('mousedown', self.startMoving);

    // insert button
    return self.insertButton(self.button, self.element);
  }

  Mossa.prototype = {
    insertElement: function(element, dropArea) {
      var parent = dropArea.parentElement;

      if (parent)
        parent.insertBefore(element, dropArea);
    },

    insertButton: function(button, element) {
      element.appendChild(button);
    },

    insertThumbnail: function(thumbnail) {
      document.body.appendChild(thumbnail);
    },

    insertDropArea: function(dropArea, element) {
      var parent = element.parentElement,
          sibling = element.nextSibling;

      if (sibling)
        parent.insertBefore(dropArea, sibling);
      else
        parent.appendChild(dropArea);
    },

    createDropArea: function() {
      var dropArea = document.createElement('div');
      dropArea.className = 'drop-area';
      return dropArea;
    },

    createButton: function() {
      var button = document.createElement('button');
      button.innerHTML = String.fromCharCode(8597);
      button.className = 'move-button';
      return button;
    },

    createThumbnail: function(element, mouseEvent) {
      var thumbnail = element.cloneNode(true);
      thumbnail.className += 'move-thumbnail';
      thumbnail.style.position = 'fixed';
      thumbnail.style.overflow = 'hidden';
      thumbnail.style.margin = '0';
      thumbnail.style.padding = '0';
      thumbnail.style.float = 'none';
      thumbnail.style.zIndex = 99999;
      thumbnail.style.width = (element.clientWidth * .5) + 'px';
      thumbnail.style.height = (element.clientHeight * .5) + 'px';
      thumbnail.style.pointerEvents = 'none';
      return thumbnail;
    },

    removeDropArea: function(dropArea) {
      var parent = dropArea.parentElement;
      
      if (parent)
        parent.removeChild(dropArea);
    },

    removeThumbnail: function(thumbnail) {
      document.body.removeChild(thumbnail);
    },

    moveThumbnail: function(thumbnail, mouseEvent) {
      thumbnail.style.top = (mouseEvent.clientY + 20) + 'px';
      thumbnail.style.left = (mouseEvent.clientX + 20) + 'px';
    },

    getButton: function(element) {
      if (element.children)
        for (var i = 0; i < element.children.length; i++) {
          var child = element.children[i];
          if ( child.nodeName.toLowerCase() == 'button' &&  child.className.indexOf('move-button') <= 0)
            return child;  
        }

      return false;
    }
  }

  return Mossa;
}));
