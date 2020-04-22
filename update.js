const {sellerpost} = require('./config.json');
module.exports =
{
    name: "update",
    usage: "",
    description: "Updates the best seller post",
    execute(client)
    {        
        const {post, sellers} = client;
                
        let content = sellerpost + "\n";
        if(!sellers || sellers.length == 0)
        {
            content += "There are no active sellers :frowning2:";
        }
        else
        {
            //find highest seller
            
            sellers.sort(function(a, b){
                return b.price-a.price
            });
            content += "Seller:";
            sellers.forEach(seller => {
                content += "\n<@" + seller.owner.id + "> with " + seller.price + " bells per turnip";
            });
        }
        post.edit(content);

    },
};