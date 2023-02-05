const Node = require('./Node');
const LinkedList = require('./LinkedList')

const node = new Node('Once');
const list = new LinkedList(node)
list.append('upon');
list.append('a');
list.append('time');
list.append('in');
list.append('Mexico');
list.insert(2,"Côte D'ivoire")
list.update(1, {name: 'Hello World'})
console.log(list.find(1))