class Node {
  constructor(data){
    this.data = data;
    this.next = null;
  }

  setNextNode(node) {
    if(!(node instanceof Node)) {
        throw new Error('Next node must be a member of the Node class');
    }
    this.next = node;
  }

  getNextNode() {
    return this.next;
  }
};


//Add a new node as Head
//Add a new node as Tail
//Remove a node from the Head
//Print out the nodes from head to tail

class LinkedList {
    constructor () {
        this.head = null;
    }

    addToHead(data) {
        const newHead = new Node(data);
        const currentHead = this.head;
        this.head = newHead;
        if (currentHead) {
            newHead.setNextNode(currentHead);
        }
    }

    addToTail(data) {
        let tail = this.head;
        if (!tail) {
            this.head = new Node(data);
        } else {
            while (tail.next) {
                tail = tail.next;
            }
            tail.setNextNode(new Node(data));
        }
    }

    removeHead() {
        const removedHead = this.head;
        if(!removedHead){
            return
        } 
        this.head = removedHead.getNextNode();
        return removedHead.data;
    }

    printList() {
        let currentNode = this.head;
        let output = "<head> ";
        while (currentNode !== null) {
            output += currentNode.data + " ";
            currentNode = currentNode.getNextNode();
        };
        output = output + "<tail>";
        return output;
    }

    reverseList() {
        let current = this.head;
        let prev = null;

        while (current) {
            let hold = current.next;
            current.next = prev;
            prev = current;
            current = hold;
        }

        this.head = prev;
    }

    listLength() {
        let length = 0;
        let list = this.head;

        while (list) {
            length += 1;
            list = list.getNextNode();
        }

        return length;
    }

    searchList(data) {
        let current = this.head;
        let index = 1;

        while (current) {
            if (current.data === data){
                return `Found ${current.data} in index ${index}`;
            }
            index += 1;
            current = current.getNextNode();
        };

        return `${data} not found in LinkedList`;
    }
}

function sortAscending(list) {
    let current = list.head;
    let prev = null;

    while (current) {
        if(current.data < current.getNextNode().data){
            prev = current;
            prev.next = null;
        }
        current = current.getNextNode()
    }



}

const swapNodes = (list, data1, data2) => {
    let node1 = list.head;
    let prev1 = null;
    let node2 = list.head;
    let prev2 = null;

    if (data1 === data2) {
        return `No swap as both numbers are the same`
    }

    while (node1) {
        if (node1.data === data1) {
            break;
        }
        prev1 = node1;
        node1 = node1.getNextNode();
    };

    while (node2) {
        if (node2.data === data2) {
            break;
        }
        prev2 = node2;
        node2 = node2.getNextNode();
    };

    if (node1 === null || node2 === null) {
        return `No swap possible - one or more element is not in the list`;
    }

    if (prev1 === null) {
        list.head = node2;
    } else {
        prev1.setNextNode(node2);
    }

    if (prev2 === null) {
        list.head = node1;
    } else {
        prev2.setNextNode(node1);
    }

    let temp = node1.getNextNode();
    node1.setNextNode(node2.getNextNode());
    node2.setNextNode(temp);
};

module.exports = { Node, LinkedList};