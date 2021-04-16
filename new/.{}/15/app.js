/*global books*/
let storageBooklist;
const root = document.getElementById('root');
const bookListerContainer = document.createElement('div');
bookListerContainer.className = 'book-lister-container';
const contentContainer = document.createElement('div');
contentContainer.className = 'content-container';
const formContainer = document.createElement('form');
formContainer.className = 'form-container';
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.placeholder = 'Title';
const authorInput = document.createElement('input');
authorInput.type = 'text';
authorInput.placeholder = 'Author';
const imgURLInput = document.createElement('input');
imgURLInput.type = 'text';
imgURLInput.placeholder = 'Book image in URL format';
const plotInput = document.createElement('input');
plotInput.type = 'text';
plotInput.placeholder = 'Book\'s plot in short';
const saveBtn = document.createElement('button');
saveBtn.innerText = 'SAVE';
let addBtn = document.createElement('button');
addBtn.className = 'addBtn'
addBtn.innerText = 'ADD NEW BOOK'
root.append(bookListerContainer, contentContainer);
const editingContainer = document.createElement('form');
editingContainer.className = 'editing-container';
const cancelBtn = document.createElement('button');
cancelBtn.className = 'cancel-btn';
cancelBtn.innerText = 'Cancel';
const modalContainer = document.createElement('div');
modalContainer.className = 'modalContainer';
const modal = document.createElement('div');
modal.className = 'modal';
modalContainer.appendChild(modal);
root.prepend(modalContainer);
const modalClose = document.createElement('span');
modalClose.className = 'modalClose';
modalClose.innerText = '×'
modal.appendChild(modalClose);
const modalText = document.createElement('p');
modalText.className = 'modalText';
modal.appendChild(modalText);
modalText.innerText = 'Book Saved';
function buildBookList() {
    bookListerContainer.textContent = '';
    storageBooklist = JSON.parse(localStorage.getItem('books'));
    for (let i = 0; i < storageBooklist.length; i++) {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        const listEl = document.createElement('span');
        listEl.innerText = storageBooklist[i].title;
        listEl.className = 'listEl';
        const editBtn = document.createElement('button');
        editBtn.innerText = 'EDIT';
        editBtn.className = 'edit-btn';
        li.append(listEl, editBtn);
        ul.appendChild(li);
        bookListerContainer.append(ul, addBtn);
        const item = document.createElement('div');
        item.className = 'item';
        item.id = `${i}`;
        const bookTitle = document.createElement('span');
        bookTitle.className = 'title';
        bookTitle.innerText = storageBooklist[i].title;
        const bookContainer = document.createElement('div');
        bookContainer.className = 'bookContainer';
        const bookAuthor = document.createElement('h3');
        bookAuthor.className = 'author';
        bookAuthor.innerText = storageBooklist[i].author;
        const image = document.createElement('img');
        image.src = storageBooklist[i].imgURL;
        image.className = 'image';
        const bookPlot = document.createElement('p');
        bookPlot.className = 'plot';
        bookPlot.innerText = storageBooklist[i].plot;
        item.append(bookTitle, bookAuthor, image, bookPlot);
        bookContainer.appendChild(item);
        contentContainer.appendChild(bookContainer);

        editBtn.addEventListener('click', (e) => {
            let uid;
            for (let i = 0; i < storageBooklist.length; i++) {
                if (e.target.previousSibling.innerText === storageBooklist[i].title) {
                    uid = i;
                }
            }
            history.pushState({}, 'Preview Book', `/homework/index.html?id={${uid}}#edit`);
            editBook(uid);
        });

        listEl.addEventListener('click', (e) => {
            let uid;
            for (let i = 0; i < storageBooklist.length; i++) {
                if (e.target.innerText === storageBooklist[i].title) {
                    uid = i;
                }
            }
            history.pushState({}, 'Preview Book', `/homework/index.html?id={${uid}}#preview`);
            previewBook(uid);
        });
    }
}

function poppin() {
    let bookId;
    let hash = location.hash.replace('#', '');
    if (location.search) {
        bookId = location.search.match(/[0-9]+/)[0];
    }
    if (hash === 'preview') {
        previewBook(bookId);
    }
    if (hash === 'edit') {
        editBook(bookId);
    }
    if (!hash || !location.search) {
        history.pushState('', '', 'index.html')
    }
}

function previewBook(uid) {
    if (root.querySelector('.editing-container') !== null) {
        editingContainer.remove();
    }
    if (document.querySelector('.active')) {
        document.querySelector('.active').classList.remove('active');
    }
    document.getElementById(uid).classList.add('active');
}

function editBook(uid) {
    if (root.querySelector('.editing-container') !== null) {
        editingContainer.remove();
    }
    if (root.querySelector('.form-container') !== null) {
        formContainer.remove();
    }
    if (document.querySelector('.active')) {
        document.querySelector('.active').classList.remove('active');
    }
    plotInput.value = storageBooklist[uid].plot;
    titleInput.value = storageBooklist[uid].title;
    authorInput.value = storageBooklist[uid].author;
    imgURLInput.value = storageBooklist[uid].imgURL;
    const updateBtn = document.createElement('button');
    updateBtn.className = 'updateBtn';
    updateBtn.innerText = 'Update';

    updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let storageBooklist = JSON.parse(localStorage.getItem('books'));
        storageBooklist.splice(uid, 1);
        const author = authorInput.value;
        const title = titleInput.value;
        const imgUrl = imgURLInput.value;
        const plot = plotInput.value;
        const book = {
            title: title,
            author: author,
            imgURL: imgUrl,
            plot: plot
        };
        storageBooklist.push(book);
        localStorage.setItem('books', JSON.stringify(storageBooklist));
        fetchBooks();
        editingContainer.reset();
        buildBookList();
        showModal();
    });

    editingContainer.append(titleInput, authorInput, imgURLInput, plotInput, cancelBtn, updateBtn);
    contentContainer.appendChild(editingContainer);

    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
        modalText.innerText = 'Discard changes?'
        const discardBtn = document.createElement('button');
        discardBtn.className = 'discardBtn';
        discardBtn.innerText = 'Discard';
        modal.appendChild(discardBtn);

        discardBtn.addEventListener('click', () => {
            history.pushState({}, 'Preview Book', `/homework/index.html?id={${uid}}#preview`);
            modalContainer.style.display = 'none';
        });

        const cancelModal = document.createElement('button');
        cancelModal.className = 'cancelModal';
        cancelModal.innerText = 'Cancel';

        cancelModal.addEventListener('click', () => {
            modalContainer.style.display = 'none';
        });
        modal.appendChild(cancelModal);
    });
}

function newBook() {
    if (document.querySelector('.active')) {
        document.querySelector('.active').classList.remove('active');
    }
    if (root.querySelector('.editing-container') !== null) {
        editingContainer.remove();
    }
    if (root.querySelector('.form-container') !== null) {
        formContainer.remove();
    }
    formContainer.append(titleInput, authorInput, imgURLInput, plotInput, saveBtn);
    contentContainer.appendChild(formContainer);
}

function fetchBooks() {
    if (localStorage.getItem('books')) {
        storageBooklist = JSON.parse(localStorage.getItem('books'));
    } else {
        localStorage.setItem('books', JSON.stringify(books));
    }
    buildBookList();
}

function storeNewBook(e) {
    e.preventDefault();
    const author = authorInput.value;
    const title = titleInput.value;
    const imgUrl = imgURLInput.value;
    const plot = plotInput.value;
    const book = {
        title: title,
        author: author,
        imgURL: imgUrl,
        plot: plot
    };
    storageBooklist.push(book);
    localStorage.setItem('books', JSON.stringify(storageBooklist));
    fetchBooks();
    formContainer.reset();
    buildBookList();
    showModal();
}

function showModal() {
    modalContainer.style.display = 'block';
}

addBtn.addEventListener('click', newBook);
saveBtn.addEventListener('click', storeNewBook);
modalClose.addEventListener('click', () => {
    modalContainer.style.display = 'none'
});
window.addEventListener('click', (e) => {
    e.target === modal ? modalContainer.style.display = 'none' : false
});
window.addEventListener('popstate', poppin);
window.onload = () => {
    fetchBooks();
};