import { openDB } from "idb";

let store = {
  db: null,

  init: async function () {
    if (store.db) {
      return Promise.resolve(store.db);
    }
    return await openDB("messages", 1, {
      upgrade(upgradeDb) {
        upgradeDb.createObjectStore("outbox", {
          autoIncrement: true,
          keyPath: "id",
        });
      },
    }).then(function (db) {
      return (store.db = db);
    });
  },

  outbox: async function (mode) {
    return await store.init().then(function (db) {
      return db.transaction("outbox", mode).objectStore("outbox");
    });
  },
};

export default store;
