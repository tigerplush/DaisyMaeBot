const {sellerpost} = require('./config.json');
module.exports =
{
    name: "update",
    usage: "",
    description: "Updates the best seller post",
    execute(client)
    {        
        const {post, sellers, buyers} = client;
                
        let content = sellerpost + "\n";
        if(!sellers || sellers.length == 0)
        {
            content += "There are no active sellers :frowning2:";
        }
        else
        {
            //sort for highest selling prices
            
            sellers.sort(function(a, b){
                return b.price-a.price
            });
            content += "**__Active sellers:__**";
            sellers.forEach(seller => {
                content += "\n<@" + seller.owner.id + "> with " + seller.price + " bells per turnip";
            });
        }

        content += "\n";

        if(!buyers || buyers.length == 0)
        {
            content += "There are no active buyers :frowning2:";
        }
        else
        {
            //sort for lowest buying prices
            
            buyers.sort(function(a, b){
                return a.price-b.price
            });
            content += "**__Active buyers:__**";
            buyers.forEach(buyer => {
                content += "\n<@" + buyer.owner.id + "> with " + buyer.price + " bells per turnip";
            });
        }

        post.edit(content);

    },
};