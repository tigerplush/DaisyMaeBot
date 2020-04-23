module.exports =
{
    name: "reset",
    usage: "",
    description: "Resets your current turnip price and removes you from the list of sellers",
    execute(message, args)
    {
        const sellers = message.client.sellers.get(message.guild.id);
        const buyers = message.client.buyers.get(message.guild.id);

        //Search for author
        let index = sellers.findIndex(price => price.owner === message.author);
        if (index > -1) {
            sellers.splice(index, 1);
            message.reply("I have removed you from the list of sellers :slight_smile:");
        }

        index = buyers.findIndex(price => price.owner === message.author);
        if (index > -1) {
            buyers.splice(index, 1);
            message.reply("I have removed you from the list of buyers :slight_smile:");
        }

        message.client.emit('priceUpdate', message.guild.id);
    },
};