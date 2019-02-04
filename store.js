'use strict';

const store = (function() {

    const bookmarks = [];
    let adding = false; 
    let editing = null;
    let minRating = null; // never contain bool
    let lastClickedBookmark = null; // not bool, relies on id of bookmark clicked

    const addBookmark = function(item) {
        this.bookmarks.push(item);
    };

    const deleteBookmark = function(id) {
        this.bookmarks = this.bookmarks.filter(list => list.id !== id);
    }

    const findBookmarkId = function(id) {
        return this.bookmarks.find(item => item.id === id);
    };

    const toggleBookmarkView = function(id) {
        const item = store.findBookmarkId(id);
    
    };

    // const editBookmark = function(id, newData) {
    //     const item = this.findBookmarkId(id);
    //     Object.assign(item, newData);
    // };

    return {
        bookmarks: [],
        adding,
        editing,
        minRating,
        lastClickedBookmark,

        addBookmark,
        deleteBookmark,
        findBookmarkId,
        toggleBookmarkView,
        editBookmark
    };
}());

