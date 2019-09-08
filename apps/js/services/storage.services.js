angular.module("storage.services", [])
.factory("StorageService", StorageService);

function StorageService() {
  localStorageSupported=false;
  this.localStorageSupported =
    typeof window["localStorage"] !== "undefined" &&
    window["localStorage"] != null;

  // add value to storage
  function add(key, item) {
    if (this.localStorageSupported) {
      localStorage.setItem(key, item);
    }
  }

  function addObject(key, data) {
    const jsonData = JSON.stringify(data);
    if (this.localStorageSupported) {
      localStorage.setItem(key, jsonData);
    }
  }

  function getObject(key) {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  }

  // get all values from storage (all items)
  function getAllItems() {
    const list = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      list.push(
        new StorageItem({
          key: key,
          value: value
        })
      );
    }

    return list;
  }

  // get only all values from localStorage
  function getAllValues() {
    const list = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      list.push(value);
    }

    return list;
  }

  // get one item by key from storage
  function get(key) {
    if (this.localStorageSupported) {
      const item = localStorage.getItem(key);
      return item;
    } else {
      return null;
    }
  }

  // remove value from storage
  function remove(key) {
    if (this.localStorageSupported) {
      localStorage.removeItem(key);
    }
  }

  // clear storage (remove all items from it)
  function clear() {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }

  return {
    add: add,
    addObject: addObject,
    get: get,
    getObject: getObject,
    getAllItems: getAllItems,
    getAllValues: getAllValues,
    remove: remove,
    clear: clear
  };
}
