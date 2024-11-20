// ----------------------------------------------------------------------------------------------------------
// TASK 1: Prototype Chain Termination
// ----------------------------------------------------------------------------------------------------------

// Implement a function checkPrototypeChain(obj) that:
// Takes an object obj.
// Traverses its prototype chain until it finds a null prototype.
// Returns the depth of the prototype chain.


// Recursive

function checkPrototypeChainRec(obj) {
    if (obj == null && typeof obj !== 'object'  ) { return -1; }
    
    if (!checkPrototypeChainRec.sum) { checkPrototypeChainRec.sum = 1; }
    if (Object.getPrototypeOf(obj) == null) {return checkPrototypeChainRec.sum}

    ++(checkPrototypeChainRec.sum);
    return checkPrototypeChainRec(Object.getPrototypeOf(obj));
}

// Interativ

function checkPrototypeChain(obj) {
    if (obj == null && typeof obj !== 'object') { throw new Error('Is not a object'); }
    let sum = 0;
    while(obj != null) {
        obj = Object.getPrototypeOf(obj);
        sum++;
    }
    return sum;
}


// let obj = {}
// const obj2 = Object.create(obj); 
// const noProtoObj = Object.create(null); 

// console.log(checkPrototypeChain(function(){}));

// ----------------------------------------------------------------------------------------------------------
// TASK 2: Sparse Arrays
// ----------------------------------------------------------------------------------------------------------


// Write a function analyzeSparseArray that:
// Takes an array as input.
// Counts and logs:
// The total number of elements.
// The number of undefined values in the array.
// The number of explicitly set null values.
// The number of missing (sparse) indices.


function analyzeSparseArray (arr) {
    if (!Array.isArray(arr)) { return -1; }
    console.log('The total number of elements = ' + arr.length);
    console.log('The number of undefined values in the array = ' + arr.filter(num => num === undefined).length);
    console.log('The number of null values = ' + arr.filter(num => num === null).length);
    
    let count = 0;
    for (let i = 0; i < arr.length; ++i) {
        if (! (i in arr)) {            
            ++count;
        }
    }    
    console.log('The number of missing (sparse) indices = ' + count);
    
}


// let arr = [1, 2, 3, undefined, undefined , null, , , 5];
// analyzeSparseArray(arr);


// ------------------------------------------------------------------------------------------------------------------
// TASK 3: JSON Serialization
// ------------------------------------------------------------------------------------------------------------------


// Create a function testJSONSerialization that:
// Accepts an object as input.
// Replaces all properties with the value undefined with null.
// Serializes the object to JSON and logs the result.


let object = {
    a: undefined,
    b: 18,
    c: undefined,
    d: 'hellow',
    f: {
        a: undefined,
        b: null,
        c: 45
    }
}

//testJSONSerialization(object);

function testJSONSerialization(object) {

    for (const key in object) {
        
        if(object[key] !== null && typeof object[key] === 'object'){
            testJSONSerialization(object[key]);
        }

        if (object[key] === undefined) {
            object[key] = null;
        }   
    }

    console.log(JSON.stringify(object));
}


// ----------------------------------------------------------------------------------------------------
// TASK 4: Null and Undefined Diff Checker
// ----------------------------------------------------------------------------------------------------


// Write a function deepDiffChecker(obj1, obj2) that:
// Compares two objects obj1 and obj2 deeply.
// Specifically identifies mismatches between:
// null vs. undefined.
// Missing properties in one object but not the other.
// Logs a detailed report showing:
// Properties present in one but missing in the other.
// Properties that have null in one and undefined in the other.
// Nested mismatches in a tree-like structure.


let o1 = { c: {a: 10, b: 6}};
let o2 = {a: 5, b:10, c: {a: 10}};

//console.log(deepDiffChecker(o1, o2));


function deepDiffChecker(obj1, obj2, path = []) {    
    let result = [];
    
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    for (const key of keys1) {
        let curentPath = [...path, key]

        if (! keys2.includes(key)) {
            result.push({path: curentPath.join('.'), msg: 'Dont Obj2'})
        } else {
            let val1 = obj1[key];
            let val2 = obj2[key];

            if (val1 === undefined && val2 === null) {
                result.push({path: curentPath.join('.'),msg: "Obj1 have undefined, Obj2 have null"})
            } else if (typeof val1 === 'object' && val1 !== 'null' && typeof val2 === 'object' && val2 !== null ) {
                result = result.concat(deepDiffChecker(val1, val2, curentPath));
            } else if (val1 !== val2) {
                result.push({path: curentPath.join('.'),msg: 'Obj1-i u Obj2 tarery urishen'})
            }

        }
    }

    for (const key of keys2) {
        if (!keys1.includes(key)) {
            let currentPath = [...path, key];
            result.push({ path: currentPath.join('.'), msg: 'Obj1 - um chka' });
        }
    }

    return result;
}

// ----------------------------------------------------------------------------------------------------
// TASK 5: Implement a Fully Functional Linked List in JavaScript
// ----------------------------------------------------------------------------------------------------

// Create a class LinkedList that implements a singly linked list. Your implementation must include the following features:

// Core Features:
// Node Structure:
//  Each node should contain:
//      value: The data stored in the node.
//      next: A reference to the next node (or null if it's the last node).
// Linked List Operations:
// Add:
//  Add a new node at the end of the list (append).
//  Add a new node at the start of the list (prepend).
// Remove:
//  Remove the first occurrence of a specific value.
//  Remove a node by its position (index).
// Search:
//  Find a node by its value.
//  Return null if the value is not found.
// Insert:
//  Insert a new node at a specific index.
// Reverse:
//  Reverse the entire linked list.
// Utility Operations:
//  Get the size of the linked list.
//  Print all values in the linked list as a string (e.g., "1 -> 2 -> 3 -> null").
//  Check if the list is empty.

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}


class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(value) {
        if (! this.head) {
            this.head = new Node(value);
        } else {
            let current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = new Node(value);
        }
        ++this.size;        
    }

    prepend(value) {
        if(!this.head) {
             this.head = new Node(value); 
        } else {
            let newNode = new Node(value);
            newNode.next =  this.head;
            this.head = newNode;
        }
        ++this.size;
    }

    remove(value) {
        if (!this.head) { return; }
        if (this.head.value === value) {
            this.head = this.head.next;
            --this.size;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                --this.size;
                return;
            }   
            current = current.next;
        }
    }

    insert(value, index) {
        if (index < 0 || index > this.size) { return -1; }
        let newNode = new Node(value);

        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            let headindex = 0;

            while(headindex < index - 1) {
                current = current.next;
                ++headindex;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
        ++this.index;
    }

    reverse() {
        let prev = null;
        let current = this.head;

        while (current) {
            let next  = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        this.head = prev;
    }
    search(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                console.log(`{value: ${value}, Node: {value: ${current.value} , next: ${current.next ? current.next.value : null}}`);
                return;
            }
            current = current.next;
        }
        console.log(`${value} - value Not found`);
    }
    toString() {
        let current = this.head;
        let res = [];
        while(current) {
            res.push(current.value);
            current = current.next;
        }
        console.log(res.join('->'));
    }
 }

 let list = new LinkedList();
 list.append(10);
 list.append(20);
 list.append(30);
 list.append(40);
 list.toString(); // 10 -> 20 -> 30 -> 40
list.append(10);
list.append(20);
list.append(30);
list.search(20); // {value: 20, Node: {value: 20, next: 30}}
list.search(30); // {value: 30, Node: {value: 30, next: null}}
list.search(80); // Value Not Found
list.toString(); // 10 -> 20 -> 30 -> 40
list.reverse();
list.prepend(88)
list.toString()