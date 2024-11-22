class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
        this.greater = null;
        this.lesser =  null;
    }
}

class FrankensteinList {
    constructor() {
        this.head = null; //
        this.tail = null; //
        this.ascHead = null; // mecicc poqr
        this.descHead = null; // poqric mec
        this.size = 0;
    }

    sortLogic(newNode) {        
        if(newNode.value >= this.ascHead.value) {
            newNode.lesser = this.ascHead;
            this.ascHead.greater = newNode;
            this.ascHead = newNode;
        } else if(newNode.value <= this.descHead.value) {
            newNode.greater = this.descHead;
            this.descHead.lesser = newNode;
            this.descHead = newNode;
        } else {

            let tmpDesc = this.descHead;
            while (tmpDesc.value < newNode.value) {
                tmpDesc = tmpDesc.greater;
            }
            newNode.greater = tmpDesc;
            newNode.lesser = tmpDesc.lesser
            tmpDesc.lesser.greater = newNode;
            tmpDesc.lesser = newNode;
        }
    }

    sortedIfRemove(value) {

        if (this.descHead.value == value && this.descHead == this.ascHead) {
            this.descHead = null;
            this.ascHead = null;
            this.ascdescHead = null;
            this.descdescHead = null;
            return;
        } else if(this.descHead.value == value) {
            this.descHead = this.descHead.greater;
            this.descHead.lesser = null;
        } else if(this.ascHead.value == value) {
            this.ascHead = this.ascHead.lesser;
            this.ascHead.greater = null;
        } else {
            let tmp = this.descHead;
            while (tmp && tmp.value != value) {
                tmp = tmp.greater
            }
            if (tmp == null) { return 'This value is not find'; }
            tmp.greater.lesser = tmp.lesser;
            tmp.lesser.greater = tmp.greater;
        }

    }

    append(value) {    
        let newNode = new Node(value, );
        if(! this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.ascHead = newNode;
            this.descHead = newNode;
            this.size = 1;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
            
            this.sortLogic(newNode);
        }
        ++this.size;
    }

    prepend(value) {
        let newNode = new Node(value);
        if (! this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.ascHead = newNode;
            this.descHead = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.sortLogic(newNode);
    }

    searchByValue(value) {
        if (!this.head) { return -1;}
        let tmp  = this.head;
        while (tmp.next) {
            if (tmp.value == value) {                
                return 'This value have a in List'
            }
            tmp = tmp.next;
        }
        return null;
    }

    insert(value, index) {
        if (index < 0 || index > this.size - 1 || !this.head ) { return; }
        let newNode = new Node(value);

        if (index == 0) {
            this.prepend(value);
        } else if( index == this.size) {
            this.append(value);
        } else {

            let tmp =  this.head;
            let i = 0;

            while (i < index - 1) {
                ++i;
                tmp = tmp.next;
            }
            newNode.prev = tmp;
            newNode.next = tmp.next;
            tmp.next.prev = newNode;
            tmp.next = newNode;
        }
        this.size++;
        this.sortLogic(newNode);
    }

    removeByValue(value) {
        if (!this.head) { return; }
        if (this.head.value == value && this.head == this.tail) {
            this.head = null;
            this.tail = null;
            this.ascHead = null;
            this.descHead = null;
            returnl;
        } else if(this.head.value == value) {
            this.head = this.head.next;
            this.head.prev = null;
        } else if(this.tail.value == value) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            let tmp = this.head;
            while (tmp && tmp.value != value) {
                tmp = tmp.next
            }
            if (tmp == null) { return 'This value is not find'; }
            tmp.next.prev = tmp.prev;
            tmp.prev.next = tmp.next;
        }
        this.sortedIfRemove(value)
        --this.size;
    }

    removeByIndex(index) {
        if (index < 0 || index > this.size - 1) { return; }

        let i = 0;
        let tmp = this.head;
        while (i < index) {
            ++ i;
            tmp = tmp.next;
        }
        this.removeByValue(tmp.value);
    }

    printHead() {
        if (this.head == null) { return 'null'; }
        let res = '';
        let tmp = this.head;
        while(tmp) {
            res += tmp.value + ' -> ';
            tmp = tmp.next;
        }
        return res + 'null';
    }

    printAscHead() {
        if (this.ascHead == null) { return 'null'; }
        let res = '';
        let tmp = this.ascHead;
        while(tmp) {
            res += tmp.value + ' -> ';
            tmp = tmp.lesser;
        }
        return res + 'null';
    }

    printDescHead() {
        if (this.descHead == null) { return 'null'; }                
        let res = '';
        let tmp = this.descHead;
        while(tmp) {
            res += tmp.value + ' -> '
            tmp = tmp.greater;
        }
        return res + 'null' ;
    }

}

let list = new FrankensteinList();

list.append(5)
list.append(1)
list.append(8)
list.append(15)
list.prepend(22);
list.prepend(890);
list.insert(9, 5);

list.removeByIndex(0);
list.removeByIndex(3);

console.log(list.printHead());
console.log(list.printAscHead());
console.log(list.printDescHead());

console.log(list.searchByValue(8));
console.log(list.searchByValue(81));
