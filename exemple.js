const Discord = require("discord.js");
const Safeness = require("safeness-prevnames");

const client = new Discord.Client({ intents: 53608447 });

const asciiArt = `
\`\`\`ANSI
[1;32m⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣖⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀[0m
[1;32m⠀⠀⠀⠀⢀⣾⡟⣉⣽⣿⢿⡿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀[0m
[1;32m⠀⠀⠀⢠⣿⣿⣿⡗⠋⠙⡿⣷⢌⣿⣿⠀⠀⠀⠀⠀⠀⠀[0m
[1;32m⣷⣄⣀⣿⣿⣿⣿⣷⣦⣤⣾⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀[0m
[1;32m⠈⠙⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⢀⠀⠀⠀⠀[0m
[1;32m⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠻⠿⠿⠋⠀⠀⠀⠀[0m
[1;32m⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀[0m
[1;32m⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⡄[0m
[1;32m⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⢀⡾⠀[0m
[1;32m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣷⣶⣴⣾⠏⠀⠀[0m
[1;32m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠛⠋⠁⠀⠀⠀[0m
\`\`\`
`;

const API = false; // Set to true to use API, false for local mode

const prev = new Safeness.Client({
    api: API,  // Determines whether to use an external API or the local database
    url: 'https://example.com',  // Replace with your API URL if API is true
    key: 'your_api_key',  // API key required if API is true
});

client.on("ready", async () => {
    console.log(client.user.username)
})

client.on("userUpdate", async (oldUser, newUser) => {
    try {
        if (oldUser.username !== newUser.username || oldUser.displayName !== newUser.displayName) {
            const data = {
                user_id: newUser.id,
                username: newUser.username,
                name: newUser.displayName, // Use the displayName 
                changedAt: new Date().toISOString()  // Date in ISO format
            };

            await prev.save(data);
            console.log(`Name saved successfully for user ID ${newUser.id}`);
        }
    } catch (error) {
        console.error("Error saving name:", error.message);
    }
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith("!")) return;

    const args = message.content.slice(1).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    switch (cmd) {
        case "help":
            message.reply(
                `${asciiArt}\n\`\`\`ANSI\n[1;33mAvailable commands:[0m[33m help, prevnames, clearprevnames, prevnamescount, save, infos[0m\n\`\`\``
            );
            break;

        case "prevnames":
            let userId;
            if (message.mentions.users.size) {
                userId = message.mentions.users.first().id;
            } else {
                userId = args[0] || message.author.id;
            }

            try {
                const prevNames = await prev.prevnames(userId);

                if (prevNames.length === 0) {
                    message.reply(
                        `${asciiArt}\n\`\`\`ANSI\n[1;31mNo previous names found for the user with ID [0m[1;31m${userId}[0m\n\`\`\``
                    );
                } else {
                    const prevNamesList = prevNames
                        .map((entry, index) => {
                            return `[1;33m${index + 1}.[0m [1;34m${entry.changedAt}[0m - [1;37m${entry.name}[0m`;
                        })
                        .join("\n");

                    message.reply(
                        `${asciiArt}\n\`\`\`ANSI\n[1;32mList of previous names for [1;34m${prevNames[0].username}[1;32m:\n${prevNamesList}\n\`\`\``
                    );
                }
            } catch (error) {
                console.error("Error retrieving previous usernames:", error.message);
                message.reply(
                    `${asciiArt}\n\`\`\`ANSI\n[1;31mError retrieving previous usernames.[0m\n\`\`\``
                );
            }
            break;

        case "clearprevnames":
            try {
                const result = await prev.clear(message.author.id);
                message.reply(
                    `${asciiArt}\n\`\`\`ANSI\n[1;32mPrevious names cleared for the user with ID [1;34m${message.author.id}[1;32m.[0m\n\`\`\``
                );
            } catch (error) {
                console.error("Error clearing previous usernames:", error.message);
                message.reply(
                    `${asciiArt}\n\`\`\`ANSI\n[1;31mError clearing previous usernames.[0m\n\`\`\``
                );
            }
            break;

        case "prevnamescount":
            try {
                const count = await prev.count();

                if (count === 0) {
                    message.reply(
                        `${asciiArt}\n\`\`\`ANSI\n[1;33mThere are no previous usernames in the database.[0m\n\`\`\``
                    );
                } else {
                    message.reply(
                        `${asciiArt}\n\`\`\`ANSI\n[1;32mThere are [1;33m${count}[1;32m previous usernames in the database.[0m\n\`\`\``
                    );
                }
            } catch (error) {
                console.error("Error retrieving the count of previous usernames:", error.message);
                message.reply(
                    `${asciiArt}\n\`\`\`ANSI\n[1;31mError retrieving the count of previous usernames.[0m\n\`\`\``
                );
            }
            break;

        case "infos":
            message.reply(
                `${asciiArt}\n\`\`\`ANSI\n[1;34mBot using the[0m[1;37m safeness-prevnames[0m[1;34m module to manage previous usernames.[0m\n\`\`\``
            );
            break;

        default:
            message.reply(
                `${asciiArt}\n\`\`\`ANSI\n[1;31mUnknown command. Type[0m[1;34m !help[0m[1;31m to see the list of commands.[0m\n\`\`\``
            );
    }
});

client.login("your-token")