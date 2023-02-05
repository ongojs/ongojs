
"use strict";

/**
 * @author Ericson S. Weah  <ericson.weah@gmail.com> <https://github.com/eweah>  <+1.385.204.5167>
 *
 * @module LinkedList
 * @kind class
 * @requires Node

 */

const Node = require('./Node');
class LinkedList {
    constructor(first_node = {}, length = 0 ){
        this.first_node = first_node;
        this.length = length
    }

     /**
     * @name read
     * @function
     * 
     * @param {String} commands the bash command to run
     * @param {Object} options the options for the bash command
     * @param {Function} fn the callback function
     * 
     * @description sends emails, sms; processes payments, and executes schedules, and much more ...
     * 
     * @return {Function} function that executes the child_process command
     * 
     */
    
    read(index){
        let current_node = this.first_node;
        let current_index = 0;
        if(index <= current_index){
            if(!current_node || !current_node.data) return null; 
            return current_node
        }else{
            while(current_node.next){
                current_node = current_node.next 
                current_index++ 
                if(current_index === index){
                    if(!current_node || !current_node.data) return null;
                    return current_node
                }
            }
            return null;
        }
      }
      find(index){
        let current_node = this.first_node;
        let current_index = 0;
        if(index <= current_index){
            if(!current_node || !current_node.data) return null; 
            return current_node
        }else{
            while(current_node.next){
                current_node = current_node.next 
                current_index++ 
                if(current_index === index){
                    if(!current_node || !current_node.data) return null;
                    return current_node
                }
            }
            return null;
        }
      }
      first(){
        return this.find(0);
      }
      last(){
        return this.find(this.length)
      }
      head(){
        return this.find(0)
      }
      tail(){
        return this.find(this.length)
      }
      before(index){
        return this.find(index - 1);
      }
      after(index){
        return this.find(index + 1);
      }
      insert(index, data){
        let current_index = 0;
        if(index <= current_index){
            this.prepend(data)
            return this;
        }
        if(index >= this.length){
            this.append(data);
            return this;
        }
        let indexNode = this.find(index);
        let beforeIndexNode = this.before(index);
        let newNode = new Node(data);
        this.length++
        newNode.next = indexNode;
        beforeIndexNode.next = newNode;
        return this;


      }

      update(index, data){
        this.find(index).data = data;
        return this;
      }
      updateFirst(data){
        this.first().data = data;
        return this;
      }
      updateLast(data){
        this.last().data = data; 
        return this;
      }
      updateHead(data){
        this.head().data = data; 
        return this;
      }
      updateTail(data){
        this.tail().data = data; 
        return this;
      }

      pop(){
        this.before(this.length).next  = null
        this.length--;
        return this;
      }
      shift(){
        this.first_node = this.after(0);
        this.length--;
        return this;
      }
      unshift(data){
        this.prepend(data);
        return this;
      }
      delete(index){
        let beforeIndexNode = this.before(index);
        let afterIndexNode = this.after(index);
        beforeIndexNode.next = afterIndexNode;
        this.length--;
        return this;
      }
      prepend(data){
        if(!this.first_node) {
            this.first_node = new Node(data)
            return this;
        };
        if(this.first_node.next){
            let first_node_next = this.first_node.next 
            const node = new Node(data);
             node.next = first_node_next;
             this.first_node = node;
             return this;
        }
        return this;
      }
      append(data){
        if(!this.first_node) {
            this.first_node = new Node(data)
            this.length++;
            return this;
        };
        let current_node_next = this.first_node.next 
        if(!current_node_next){
            this.first_node.next  = new Node(data);
            this.length++;
            return this;
        }
        while(current_node_next.next){
            current_node_next = current_node_next.next;
        }
        current_node_next.next = new Node(data);
        this.length++;
        return this;

      }
      search(data = {}){

        let current_node = this.first_node
        if(data === this.first_node.data) return 0;
        let index = 0; 
        while(current_node.next){
          current_node = current_node.next
          index++
          if(data === current_node.data)return index;
        }

        return null;
      }
}

module.exports = LinkedList