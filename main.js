const { Client, MessageEmbed } = require('discord.js');
// Create an instance of a Discord client
const client = new Client();
const keys = require('./keys')
const firebase = require('firebase')
let beerList = []
client.on("ready", () => {
    ref.on('value', (snapshot) => {
        const data = snapshot.val()
        for(const key in data){
            beerList.push(data[key])
        }
    })
    console.log("All good here :)")
})

const firebaseConfig = {
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
};

firebase.initializeApp(firebaseConfig);
let db = firebase.database();
let ref = db.ref('/beers')


client.on("message", msg => {
    if(msg.content === "!beer") {
        beerList.forEach((item) => {
            const embed = new MessageEmbed()
            .setTitle(item.name)
            .setColor(0xff0000)
            .setImage(item.img)
            msg.channel.send(embed)
        })
    }
    if(msg.content !== "!beer") {
        let beerValue = msg.content;
        const beer = beerList.find(x => x.id === beerValue)
        if(!beer) return;
        const embed = new MessageEmbed()
            .setTitle(beer.name)
            .setColor(0xff0000)
            .setImage(beer.img)
            msg.channel.send(embed)
    }
})

client.login(keys.TOKEN)