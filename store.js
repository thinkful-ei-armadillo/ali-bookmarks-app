'use strict';

const store = (function() {

    const bookmarks = [];
    let adding = false; 
    //let editing = null;
    let minRating = null;
    let error = null;
     // never contain bool

    const addBookmark = function(item) {
        this.bookmarks.push(item);
    };

    const addError = function(err) {
        this.error = err;
    }

    const expandBookmark = function(id) {
        const obj = this.findBookmarkId(id);
        obj.expanded = true;
    }
    const unexpandBookmark = function(id) {
        const obj = this.findBookmarkId(id);
        obj.expanded = false;
    }
    const deleteBookmark = function(id) {
        this.bookmarks = this.bookmarks.filter(list => list.id !== id);
    }

    const findBookmarkId = function(id) {
        return this.bookmarks.find(item => item.id === id);
    };

    // const editBookmark = function(id, newData) {
    //     const item = this.findBookmarkId(id);
    //     Object.assign(item, newData);
    // };

    return {
        bookmarks,
        adding,
        minRating,

        addBookmark,
        addError,
        expandBookmark,
        unexpandBookmark,
        deleteBookmark,
        findBookmarkId,

        //editBookmark
    };
}());

