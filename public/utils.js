// const { json } = require('body-parser');

export let dataList = {};
export let catchData = async () => {
    let response = await fetch('https://high-balancer-452319-n8.rj.r.appspot.com/history', {method: "GET", cache: "no-cache"});
    let jsonResponse = {};
    try {
        if (response.ok) {
            jsonResponse = await response.json();
            console.log(jsonResponse);
        }
    } catch(error) {
        console.log(error)
    }
    dataList = jsonResponse;
    console.log(dataList);
}

export function reverseList(list) {
    let current = list.head;
    let prev = null;

    while (current) {
        let hold = current.next;
        current.next = prev;
        prev = current;
        current = hold;
    }

    return prev;
}

export const printList = async () => {

    await catchData();

    let list = dataList;

    let ul = document.createElement('ul');
    ul.id = "list";
    let history = document.getElementById('history');
    history.appendChild(ul);
    let domList = document.getElementById('list')
    let li = document.createElement('li');
    
    let finalList = reverseList(list);

    while (finalList) {
        let text = list.data.text;
        domList.appendChild(li);
        list = list.next;
    }
}