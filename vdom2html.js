var VNode  = require('virtual-dom/vnode/vnode');
var VText  = require('virtual-dom/vnode/vtext');
var toHtml = require('vdom-to-html');



var dom = {
    tagName: 'html',
    children: [
      {tagName: 'head', children:[
        {tagName: 'link', properties:{href:'cdn.google.com/my-lib.css', rel:'stylesheet'}},
        {tagName: 'link', properties:{href:'cdn.google.com/my-app.css', rel:'stylesheet'}}

      ]},
      {tagName: 'body', children:[{
        tagName: 'div',
        properties: {className: 'container'},
        children: [{
            tagName: 'div',
            properties: {className:'row', id:'v-row', width:'300px', height:'500px'},
            children:[{tagName: 'div', properties: {className: 'col'}, children:['I am a text node inside a div']}]
        }]
      },
      {tagName: 'script', properties:{src:'cdn.google.com/my-lib.js'}},
      {tagName: 'script', properties:{src:'cdn.google.com/my-app.js'}}
      ]
    }]
};

var convertToVNode = function (node) {

    var children = [];

    if (node.children && node.children.length > 0) {

        node.children.forEach(function(c){
          if(typeof c === 'string') {
            children.push(new VText(c));
          } else {
            children.push(convertToVNode(c));
          }
        });
    }
    return new VNode(node.tagName, node.properties, children);
}

var vnode = convertToVNode(dom);

console.log(toHtml(vnode));
