const {sellerpost, servers} = require('./config.json');
const Discord = require('discord.js');

module.exports =
{
    name: "init",
    usage: "",
    description: "Initialises the best seller post",
    async execute(client)
    {
        let {posts, sellers, buyers} = client;
        // client.posts = new Discord.Collection();
        // client.sellers = new Discord.Collection();
        // client.buyers = new Discord.Collection();

        for(const server of servers)
        {
            if(client.channels.cache.has(server.channelid))
            {
                channel = client.channels.cache.get(server.channelid);
                //find seller post
                pinnedMessages = await channel.messages.fetchPinned();
                if(pinnedMessages)
                {
                    //there is one
                    //find post by Daisy Mae
                    let post = pinnedMessages.find(message => message.author === client.user);
                    if(!post)
                    {
                        //if there is none, create one
                        //else create one
                        post = await channel.send(sellerpost);
                        post.pin();                
                    }
                    posts.set(server.guildid, post);
                    sellers.set(server.guildid, []);
                    buyers.set(server.guildid, []);
                }
    
                client.emit('priceUpdate', server.guildid);    
            }
        }
        
    },
};