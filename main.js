const { Client, MessageEmbed } = require('discord.js');
// Create an instance of a Discord client
const client = new Client();
const keys = require('./keys')
const list = require('./firebase')

client.on("message", msg => {

    if(msg.content === "!list me beers pls") {
        list.forEach((item) => {
            const embed = new MessageEmbed()
            .setTitle(item.name)
            .setColor(0xff0000)
            msg.channel.send(embed)
        })
    }
    if(msg.content !== "!beer") {
        let beerValue = msg.content;
        const beer = list.find(x => x.id === beerValue)
        if(!beer) return;
        const embed = new MessageEmbed()
            .setTitle(beer.name)
            .setColor(0xff0000)
            .setImage(beer.img)
            msg.channel.send(embed)
    }
})

client.login(keys.TOKEN)