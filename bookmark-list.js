'use strict';
/* global, store, api */

const bookmarkList = (function() {

function render() {
    if (store.adding) {
        $('.js-initialViewButtons').addClass('hidden');          
        $('#js-bookmarkSubmitForm').removeClass('hidden');
    } else {
        $('.js-initialViewButtons').removeClass('hidden');
        $('#js-bookmarkSubmitForm').addClass('hidden');
    }

    let books = [...store.bookmarks].filter(item => item.rating >= store.minRating);  
    const bookmarkListElements = [];

    for (let i = 0; i < books.length; i++) {
        bookmarkListElements.push(generateBookmarkElement(books[i]));    
    }
    let htmlBookmarks = bookmarkListElements.join('')
    $('#js-bookmarkList').html(htmlBookmarks);

    if(store.error != null) {
        $('.error-alert').removeClass('hidden');
        $('.error-msg').html(store.error);
    } else {
        $('.error-alert').addClass('hidden');
        $('.error-msg').html('');
    }
       
}

function generateBookmarkElement(bookmarks) {
    if (bookmarks.expanded) {
        return generateExpandHtml(bookmarks);
    } else {
        return generateCondenseHtml(bookmarks);
    }      
};

function handleAddButton() {
    $('.js-addButton').click(function(event) {
        store.adding = !store.adding;
        render();
    });
}

function handleBookmarkAdd() {
    $('#js-bookmarkSubmitForm').on('submit', function(event) {
        event.preventDefault();
        const formVals = $(event.target).serializeJson();
        api.createItem(formVals)
        .then(response => {
            store.bookmarks.push(response);
            store.adding = !store.adding;
            render();
        })
        .catch(e => {
            store.addError(e);
            render();
        });    
        event.currentTarget.reset();
        store.error = null;
    });
}

function handleBookmarkDelete() {
    $('#js-bookmarkList').on('click', '.js-delete', function(event) {
        const id = $(event.currentTarget).parents('li').data('id');
        api.deleteItem(id)
        .then(() => {
            store.deleteBookmark(id);
            render();
        })
        .catch(e => {
            store.addError(e);
            render();
    });
});
}

function handleBookmarkExpand() {
    $('#js-bookmarkList').on('click', '.js-moreDetails', function(event){
        const id = ($(event.currentTarget).parents('li').data('id'));
        const expandedItem = generateExpandHtml(id);
        store.expandBookmark(id);
        render();
    });
   
}

function generateExpandHtml(info) {
    let expand = `<li data-id="${info.id}" class="bookmarkItem js-bookmarkItem">
    <article class="bookmarkParent js-bookmarkParent">
    <span class="site-title js-site-title">Title:${info.title}</span> 
    <span class="site-rating js-site-rating">Rating:${info.rating}</span>
    <span class="site-url js-site-url">Visit Site: <a href="${info.url}" target="_blank">Here</a></span>
    <span class="site-desc js-site-desc">Description:${info.desc}</span>
    </article>
    <button aria-label="Delete Button" class="delete js-delete">DELETE</button>
    <button aria-label="Condense Button" class="lessDetails js-lessDetails">LESS DETAILS</button> `
    return expand;
}


function handleBookmarkEdit() {
    console.log('TODO; Apologies not implemented  yet.')
    // this function will be responsible for when users edit
    // a bookmark item's information
    //console.log('`handleBookmarkEdit` ran');
}

function handleBookmarkCondense() {
    $('#js-bookmarkList').on('click', '.js-lessDetails', function(event){
        const id = ($(event.currentTarget).parents('li').data('id'));
        store.unexpandBookmark(id);
        render();
});
}

function generateCondenseHtml(info) {
    let condense = `<li data-id="${info.id}" class="bookmarkItem js-bookmarkItem">
    <article class="bookmarkParent js-bookmarkParent">
        <span class="site-title js-site-title">Title:${info.title}</span> 
        <span class="site-rating js-site-rating">Rating:${info.rating}</span>
    </article> 
        <ul class="edit-buttons js-edit-buttons">
            <button aria-label="Submit Button" type="submit" class="editor js-editor">EDIT</button>
            <button aria-label="More Details" class="moreDetails js-moreDetails">MORE DETAILS</button>
            <button aria-label="Delete Button" class="delete js-delete">DELETE</button>
        </ul>
    </li>`
    return condense;
}

function handleBookmarkFilter() {
    const selectMin = document.getElementById('minId');
    selectMin.addEventListener('change', event => {
        store.minRating = (event.target.value);
        render();
    });
 }

 function handleCloseError() {
     $('.error-close').click(function(event) {
         store.error = null;
         render();
     });
 }



function handleBookmarkList() {
    render();
    handleBookmarkAdd();
    //handleBookmarkEdit();
    handleBookmarkExpand();
    handleBookmarkCondense();
    handleBookmarkFilter();
    handleAddButton();
    handleBookmarkDelete();
    handleCloseError();
    

}

return {
    handleBookmarkList,
    render
};

}());