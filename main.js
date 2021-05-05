const { Client, MessageEmbed } = require('discord.js');
// Create an instance of a Discord client
const client = new Client();
const keys = require('./keys')
const firebase = require('firebase')
// const beerList = require('./beerList.js')

// .on checks for different events
client.on("ready", () => {
    console.log("All good here :)")
})

let config = {
    apiKey: keys.apiKey,
    authDomain: keys.authDomain,
    databaseURL: keys.databaseURL,
};
  firebase.initializeApp(config);

  // Get a reference to the database service
  let database = firebase.database();
const beerList = [
    {
        name: "norrlandsguld",
        id: "!norrlandsguld",
        img: "https://product-cdn.systembolaget.se/productimages/805587/805587_400.png"
    },
    {
        name: "carlsberg",
        id: "!carlsberg",
        img: "https://www.247kiosk.se/media/catalog/product/cache/12/thumbnail/330x/9df78eab33525d08d6e5fb8d27136e95/0/0/006394900_1602252893_2000084.jpg"
    },
    {
        name: "The Only Carlsberg",
        id: "!bestcarlsberg",
        img: "https://product-cdn.systembolaget.se/productimages/507840/507840_400.png"
    }
]

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