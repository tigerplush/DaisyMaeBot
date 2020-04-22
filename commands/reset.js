module.exports =
{
    name: "reset",
    usage: "",
    description: "Resets your current turnip price and removes you from the list of sellers",
    execute(message, args)
    {
        const {sellers} = message.client;

        //Search for author
        const index = sellers.findIndex(price => price.owner === message.author);
        if (index > -1) {
            sellers.splice(index, 1);
            message.reply("I have removed you from the list of sellers :slight_smile:");
        }
        else
        {
            message.reply("I couldn't find you on the list of sellers :slight_frown:");
        }

        message.client.emit('sellerUpdate', message.client);
    },
};