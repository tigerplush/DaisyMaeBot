module.exports =
{
    name: "buy",
    usage: "turnip-price",
    description: "Sets the current price I sell turnips for",
    execute(message, args)
    {
        if(args.length != 1)
        {
            message.reply("please specify a price for your turnips - and only a price!");
            return;
        }

        //Validate that it's a positive number
        if(! /^\+?[1-9]\d*$/.test(args[0]))
        {
            message.reply("Please enter a valid price :slight_frown:");
            return;
        }        

        //Search for author
        const {buyers} = message.client;
        let buyer = buyers.find(price => price.owner == message.author)
        if(buyer)
        {
            // the author already exists
            buyer.price = args[0];
            message.reply("I've updated your turnip price");
        }
        else
        {
            //add new author with the price
            buyer = {
                "owner": message.author,
                "price": args[0]
            }
            buyers.push(buyer);
            message.reply("I added you to the list of buyers");
        }

        message.client.emit('priceUpdate', message.client);
    },
};