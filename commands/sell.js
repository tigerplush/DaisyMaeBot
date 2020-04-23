module.exports =
{
    name: "sell",
    usage: "turnip-price",
    description: "Sets the current price Tommy and Timmy buy turnips for",
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
        const sellers = message.client.sellers.get(message.guild.id);
        let seller = sellers.find(price => price.owner == message.author)
        if(seller)
        {
            // the author already exists
            seller.price = args[0];
            message.reply("I've updated your turnip price");
        }
        else
        {
            //add new author with the price
            seller = {
                "owner": message.author,
                "price": args[0]
            }
            sellers.push(seller);
            message.reply("I added you to the list of sellers");
        }

        message.client.emit('priceUpdate', message.guild.id);
    },
};