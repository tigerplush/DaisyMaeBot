const {sellerpost, servers} = require('./config.json');

module.exports =
{
    name: "init",
    usage: "",
    description: "Initialises the best seller post",
    async execute(client)
    {
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
                    const pin = pinnedMessages.find(message => message.author === client.user);
                    if(pin)
                    {
                        client.post = pin;
                    }
                    else
                    {
                        //else create one
                        let post = await channel.send(sellerpost);
                        client.post = post;
                        post.pin();                
                    }
                }
    
                client.emit('sellerUpdate', client);    
            }
        }
        
    },
};