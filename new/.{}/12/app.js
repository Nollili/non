const data = [{
        'folder': true,
        'title': 'Grow',
        'children': [{
                'title': 'logo.png'
            },
            {
                'folder': true,
                'title': 'English',
                'children': [{
                    'title': 'Present_Perfect.txt'
                }]
            }
        ]
    },
    {
        'folder': true,
        'title': 'Soft',
        'children': [{
                'folder': true,
                'title': 'NVIDIA',
                'children': null
            },
            {
                'title': 'nvm-setup.exe'
            },
            {
                'title': 'node.exe'
            }
        ]
    },
    {
        'folder': true,
        'title': 'Doc',
        'children': [{
            'title': 'project_info.txt'
        }]
    },
    {
        'title': 'credentials.txt'
    }
];
'use strict';
const rootNode = document.getElementById('root');
rootNode.className = 'rootNode';
for (let i = 0; i < data.length; i++) {
    let item = data[i];
    let children = item['children'];
    let firstLevelCheckB = document.createElement('input');
    firstLevelCheckB.type = 'checkbox';
    firstLevelCheckB.id = `${item['title']}`;
    rootNode.appendChild(firstLevelCheckB);
    let firstLevelLabel = document.createElement('label');
    rootNode.appendChild(firstLevelLabel);
    firstLevelLabel.innerText = item['title'];
    firstLevelLabel.htmlFor = `${item['title']}`;
    let dir_wrapper = document.createElement('div');
    dir_wrapper.className = 'dir_wrapper';
    rootNode.appendChild(dir_wrapper);
    const folder = document.createElement('i');
    folder.className = 'material-icons folder';
    folder.innerText = 'folder';
    const openFolder = document.createElement('i');
    openFolder.className = 'material-icons folder_open';
    openFolder.innerText = 'folder_open';
    const file = document.createElement('i');
    file.className = 'material-icons file';
    file.innerText = 'insert_drive_file';
    if (!item.hasOwnProperty('children')) {
        firstLevelLabel.insertBefore(file, firstLevelLabel.firstChild);
        firstLevelLabel.className = 'file';
    }
    if (item.hasOwnProperty('children')) {
        firstLevelLabel.insertBefore(folder, firstLevelLabel.firstChild);
        firstLevelLabel.insertBefore(openFolder, firstLevelLabel.firstChild);
        for (const k of children) {
            let child = k;
            let secondLevelCheckB = document.createElement('input');
            secondLevelCheckB.type = 'checkbox';
            secondLevelCheckB.id = `${child['title']}`;
            let secondLevelLabel = document.createElement('label');
            secondLevelLabel.htmlFor = `${child['title']}`;
            secondLevelLabel.innerText = child['title'];
            dir_wrapper.append(secondLevelCheckB, secondLevelLabel);
            const folder = document.createElement('i');
            folder.className = 'material-icons folder';
            folder.innerText = 'folder';
            const openFolder = document.createElement('i');
            openFolder.className = 'material-icons folder_open';
            openFolder.innerText = 'folder_open';
            const file = document.createElement('i');
            file.className = 'material-icons file';
            file.innerText = 'insert_drive_file';
            let dir_wrapper2 = document.createElement('div');
            dir_wrapper2.className = 'dir_wrapper';
            dir_wrapper.appendChild(dir_wrapper2);
            if (child['children']) {
                secondLevelLabel.insertBefore(folder, secondLevelLabel.firstChild);
                secondLevelLabel.insertBefore(openFolder, secondLevelLabel.firstChild);
                for (const k of child['children']) {
                    const file = document.createElement('i');
                    file.className = 'material-icons file';
                    file.innerText = 'insert_drive_file';
                    let thirdLevelCheckB = document.createElement('input');
                    thirdLevelCheckB.type = 'checkbox';
                    let thirdLevelLabel = document.createElement('label');
                    thirdLevelLabel.innerText = k['title'];
                    dir_wrapper2.append(thirdLevelCheckB, thirdLevelLabel);
                    thirdLevelLabel.insertBefore(file, thirdLevelLabel.firstChild);
                }
            } else if (child['children'] === null) {
                const file = document.createElement('i');
                file.className = 'material-icons file';
                file.innerText = 'insert_drive_file';
                let thirdLevelCheckB = document.createElement('input');
                thirdLevelCheckB.type = 'checkbox';
                let thirdLevelLabel = document.createElement('label');
                thirdLevelLabel.className = 'empty';
                thirdLevelLabel.innerText = 'Folder is empty';
                dir_wrapper2.append(thirdLevelCheckB, thirdLevelLabel);
                secondLevelLabel.insertBefore(folder, secondLevelLabel.firstChild);
                secondLevelLabel.insertBefore(openFolder, secondLevelLabel.firstChild);
            } else if (!child['children']) {
                secondLevelLabel.insertBefore(file, secondLevelLabel.firstChild);
            }
        }
    }
}
const menu = document.createElement('div');
menu.className = 'menu';
rootNode.appendChild(menu);
const rename = document.createElement('div');
rename.innerHTML = 'Rename';
rename.id = 'rename';
rename.className = 'menu_item'
menu.appendChild(rename);
const del = document.createElement('div');
del.innerHTML = 'Delete';
del.id = 'delete';
del.className = 'menu_item'
menu.appendChild(del);
let targetItem;
let parentNode;
const customMenu = document.querySelector('.menu');
const menuItem = document.querySelector('.menu_item');
const delBtn = document.querySelector('#delete');
const renameBtn = document.querySelector('#rename');
delBtn.addEventListener('click', deleteItem);
renameBtn.addEventListener('click', renameItem);
const label = document.getElementsByTagName('label');
function showContextMenu(show = true) {
    customMenu.style.display = show ? 'block' : 'none';
}
function deleteItem() {
    if (targetItem.innerText === 'Folder is empty') {
        return;
    } else {
        targetItem.remove();
    }
}
function renameItem() {
    let parentnode = targetItem.parentNode;
    if (targetItem.innerText === 'Folder is empty') {
        return;
    } else {
        let input = document.createElement('input');
        let dot = targetItem.lastChild.nodeValue.indexOf('.');
        input.setAttribute('type', 'text');
        input.setAttribute('value', targetItem.lastChild.nodeValue)
        parentnode.appendChild(input);
        input.focus();
        input.setSelectionRange(0, dot);
        targetItem.lastChild.remove();
        input.addEventListener('click', () => {
            targetItem.appendChild(document.createTextNode(input.value));
            input.remove();
        });
    }
}
function addMenuListeners() {
    renameBtn.addEventListener('click', renameItem);
    delBtn.addEventListener('click', deleteItem);

}
window.addEventListener('contextmenu', (e) => {
    targetItem = e.target;
    e.preventDefault();
    if (e.target.tagName === 'LABEL') {
        customMenu.style.pointerEvents = 'auto';
        showContextMenu();
        customMenu.style.top = e.y + 'px';
        customMenu.style.left = e.x + 'px';
        addMenuListeners();
    } else {
        customMenu.style.pointerEvents = 'none';
        showContextMenu();
        customMenu.style.top = e.y + 'px';
        customMenu.style.left = e.x + 'px';
        addMenuListeners();
    }
});
window.addEventListener('click', (e) => {
    if (e.target !== customMenu) {
        showContextMenu(false);
    }
});