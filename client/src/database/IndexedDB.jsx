import Localbase from "localbase";

let db = new Localbase("MessagesDB");
db.config.debug = false;

let IndexedDB = (channels) => db.collection(channels);

export default IndexedDB;
