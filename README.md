# Exemple-safeness

[![](https://img.shields.io/badge/Explications_en-français-blue)](https://github.com/pertinentes/exemple-safeness/blob/main/README_FR.md)

This `README.md` explains how to use the `safeness-prevnames` module to manage previous usernames. You can choose to use it with a local database or an external API.
## Utilitaires

- [API Safeness](https://github.com/pertinentes/safeness-api) - Use this API to manage prevnames.
- [Support Serveur](https://discord.gg/safeness) - Join our Discord server for help !

## Installation

Install the module with npm:

```bash
npm install safeness-prevnames
```

## Client Setup

### Without API (Local)

```javascript
const Safeness = require('safeness-prevnames');

const prev = new Safeness.Client({
    api: false,  // Local usage
});
```

### With API

```javascript
const Safeness = require('safeness-prevnames');

const prev = new Safeness.Client({
    api: true,  // Using an API
    url: 'https://example.com',  // Replace with your API URL
    key: 'your_api_key',  // Replace with your API key
});
```

## Save a Username

Use this code to save a prevnames:

```javascript
const data = {
    user_id: '123456789012345678',
    username: 'new_username',
    name: 'New Display Name',
    changedAt: new Date().toISOString(),
};

await prev.save(data);
```

## Retrieve Prevnamess

To get the list of prevnames for a user:

```javascript
const prevNames = await prev.prevnames('953916177275555862');
console.log(prevNames);
```

![](https://i.imgur.com/up735NA.png)

## Clear Prevnames

To clear all prevnames for a user:

```javascript
await prev.clear('953916177275555862');
```

![](https://i.imgur.com/3IDTUHb.png)

## Count Prevnames

To count the total number of prevnames in the database or via API:

```javascript
const count = await prev.count();
console.log(`Total prevnames : ${count}`);
```

![](https://i.imgur.com/97afx1f.png)

## Automatically Save with a Discord Bot

To automatically save prevnames when a user updates their username with a Discord bot:

```javascript
const Discord = require("discord.js");
const Safeness = require("safeness-prevnames");

const client = new Discord.Client({ intents: 53608447 });

const prev = new Safeness.Client({
    api: false,  // Set to true if using an API
    url: 'https://example.com',  // Replace with your API URL if API is true
    key: 'your_api_key',  // API key required if API is true
});

client.on("userUpdate", async (oldUser, newUser) => {
    if (oldUser.username !== newUser.username || oldUser.displayName !== newUser.displayName) {
        const data = {
            user_id: newUser.id,
            username: newUser.username,
            name: newUser.displayName,
            changedAt: new Date().toISOString(),
        };

        await prev.save(data);
    }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
```