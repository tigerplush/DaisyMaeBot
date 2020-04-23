const fs = require('fs');
const Discord = require('discord.js');
const auth = require('./auth.json');
const package = require('./package.json');
const {prefix} = require('./config.json');

const update = require('./update.js');
const init = require('./init.js');
const initFromConfig = require('./initFromConfig.js');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}

bot.sellers = new Discord.Collection();
bot.buyers = new Discord.Collection();
bot.posts = new Discord.Collection();

bot.on('priceUpdate', function(guildid)
{
    update.execute({client: bot, guildid: guildid});
});

bot.on('ready', () => {
    //console.log(bot);
    initFromConfig.execute(bot);
});

bot.on('message', message => {
    if(message.content.startsWith(prefix) && !message.author.bot)
    {
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (!bot.commands.has(command))
        {
            return;
        }

        try {
            bot.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }
});

bot.login(auth.token);
