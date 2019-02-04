'use strict';
/* global $ store api */

const api = (function() {
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ali/bookmarks';
    const headers = {
        'Content-Type': 'application/json'
    };

    const ListApiFetch = function(...args) {
        let error = false;
        return fetch(...args)
        .then(res => {
            if (!res.ok) {
                error = true;   
            }
            return res.json();
        })
        .then(data => {
            if (error) {
                throw new Error(data.message);
            }
        return data;
        });
    }

    const getItems = function() {
        const parameters = {method: 'GET', headers};
        return ListApiFetch(`${BASE_URL}`, parameters);
    };

    const createItem = function(data) {
        console.log(data);
        const parameters = {method: 'POST', headers, body: data};
        return ListApiFetch(`${BASE_URL}`, parameters);
    };

    const deleteItem = function(id) {
        const parameters = {method: 'DELETE', headers};
        return ListApiFetch(`${BASE_URL}/${id}`, parameters);
    };

    return {
        ListApiFetch,
        getItems,
        createItem,
        deleteItem
    };  


}());

