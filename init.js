const {sellerpost} = require('./config.json');

module.exports =
{
    name: "init",
    usage: "",
    description: "Initialises the best seller post",
    async execute(message, args)
    {
        let post = await message.channel.send(sellerpost);
        message.client.post = post;
        post.pin();

        message.client.emit('sellerUpdate', {
            "message": message,
            "args": []
        });
    },
};