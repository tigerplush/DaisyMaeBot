const Discord = require('discord.js');
const {sellerpost} = require('./config.json');
module.exports =
{
    name: "update",
    usage: "",
    description: "Updates the best seller post",
    execute(info)
    {        
        const {client, guildid} = info;
        const {posts} = client;

        if(!client.sellers.has(guildid) || !client.buyers.has(guildid))
        {
            //if there is no current guild config'd
            return;
        }

        const sellers = client.sellers.get(guildid);

        let content = sellerpost + "\n";
        if(!sellers || sellers.length == 0)
        {
            content += "There are no active users where you can sell turnips :frowning2:";
        }
        else
        {
            //sort for highest selling prices
            
            sellers.sort(function(a, b){
                return b.price-a.price
            });
            content += "**__Active users where you can sell turnips:__**";
            sellers.forEach(seller => {
                content += "\n<@" + seller.owner.id + "> with " + seller.price + " bells per turnip";
            });
        }

        content += "\n";

        const buyers = client.buyers.get(guildid);
        if(!buyers || buyers.length == 0)
        {
            content += "There are no active users where you can buy turnips :frowning2:";
        }
        else
        {
            //sort for lowest buying prices
            
            buyers.sort(function(a, b){
                return a.price-b.price
            });
            content += "**__Active users where you can buy turnips:__**";
            buyers.forEach(buyer => {
                content += "\n<@" + buyer.owner.id + "> with " + buyer.price + " bells per turnip";
            });
        }

        if(posts.has(guildid))
        {
            posts.get(guildid).edit(content)
        }
    },
};