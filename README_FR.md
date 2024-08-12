# Exemple-Safeness

[![Explanation in English](https://img.shields.io/badge/Explanation_in-English-blue)](https://github.com/pertinentes/exemple-safeness/blob/main/README.md)

Ce `README.md` explique comment utiliser le module `safeness-prevnames` pour gérer les anciens noms d'utilisateur. Vous pouvez choisir de l'utiliser avec une base de données locale ou une API externe.

## Utilitaires

- [API Safeness](https://github.com/pertinentes/safeness-api) - Utilisez cette API pour gérer les prevnames.
- [Support Serveur](https://discord.gg/safeness) - Rejoignez notre serveur Discord pour obtenir de l'aide !

## Installation

Installez le module avec npm :

```bash
npm install safeness-prevnames
```

## Configuration du Client

### Sans API (Local)

```javascript
const Safeness = require('safeness-prevnames');

const prev = new Safeness.Client({
    api: false,  // Utilisation locale
});
```

### Avec API

```javascript
const Safeness = require('safeness-prevnames');

const prev = new Safeness.Client({
    api: true,  // Utilisation avec API
    url: 'https://example.com',  // Remplacez par l'URL de votre API
    key: 'your_api_key',  // Remplacez par votre clé API
});
```

## Sauvegarder un Prevnames

Utilisez ce code pour sauvegarder un Prevnames :

```javascript
const data = {
    user_id: '123456789012345678',
    username: 'new_username',
    name: 'New Display Name',
    changedAt: new Date().toISOString(),
};

await prev.save(data);
```

## Récupérer les Prevnames

Pour obtenir la liste des prevnames d'un utilisateur :

```javascript
const prevNames = await prev.prevnames('953916177275555862');
console.log(prevNames);
```

![](https://i.imgur.com/r7d6k5o.png)

## Effacer les Prevnames

Pour effacer tous les anciens noms d'un utilisateur :

```javascript
await prev.clear('953916177275555862');
```

![A](https://i.imgur.com/UdhSVGv.png)

## Compter les Prevnames

Pour compter le nombre total de prevnames dans la base de données ou via l'API :

```javascript
const count = await prev.count();
console.log(`Nombre total de prevnames : ${count}`);
```

![Aperçu du comptage des prevnames](https://i.imgur.com/1sAyOyH.png)

## Sauvegarder Automatiquement avec un Bot Discord

Pour sauvegarder automatiquement les prevnames avec un bot Discord :

```javascript
const Discord = require("discord.js");
const Safeness = require("safeness-prevnames");

const client = new Discord.Client({ intents: 53608447 });

const prev = new Safeness.Client({
    api: false,  // Définissez sur true pour utiliser une API
    url: 'https://example.com',  // Remplacez par l'URL de votre API si API est true
    key: 'your_api_key',  // Clé API nécessaire si API est true
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

client.login('VOTRE_TOKEN_DISCORD_BOT');