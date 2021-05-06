const keys = require('./keys')
const firebase = require('firebase')
let beerList = []
const firebaseConfig = {
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
};

firebase.initializeApp(firebaseConfig);
let db = firebase.database();
let ref = db.ref('/beers')
ref.on('value', (snapshot) => {
    const data = snapshot.val()
    for(const key in data){
        beerList.push(data[key])
    }
})

module.exports = beerList