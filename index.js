/* global store, $, api, bookmark */

'use strict';

$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => (o[name] = val));
    if (o["desc"] === '') { o["desc"] = " "; };
    o["rating"] = parseInt(o["rating"]);
    return JSON.stringify(o);
  }
});

function main() {
  bookmarkList.handleBookmarkList();
  api.getItems()
    .then((items) => {
      items.forEach(item => store.addBookmark(item));
      bookmarkList.render();
    });
}

$(main);