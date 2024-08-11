# Example Safeness

This repository provides an example of how to use the `safeness-prevnames` module for managing previous usernames with or without an API. It includes a setup for using a local database as well as an external API.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commands](#commands)
- [Event Handling](#event-handling)
- [Contributing](#contributing)
- [License](#license)

## Overview

`exemple-safeness` is a Discord bot example showcasing the integration of the `safeness-prevnames` module. It demonstrates how to:

- Save and manage previous usernames and display names.
- Use the module with a local database.
- Optionally use an external API for storage.

For more information about the `safeness-prevnames` module, visit:

- [GitHub Repository](https://github.com/pertinentes/safeness-prevnames)
- [npm Page](https://www.npmjs.com/package/safeness-prevnames)

## Getting Started

To run this example, you need to set up a Discord bot and configure the `safeness-prevnames` module.

### Prerequisites

- Node.js (v16 or later recommended)
- A Discord bot token
- [safeness-prevnames](https://www.npmjs.com/package/safeness-prevnames) package
- Optional: An external API and key if using API mode

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/exemple-safeness.git
    cd exemple-safeness
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the bot:

    - Open `index.js` and replace `YOUR_DISCORD_BOT_TOKEN` with your actual bot token.
    - Set the `API` variable to `true` if you want to use an external API and provide the `url` and `key`.

## Configuration

### Using Local Database

Ensure `API` is set to `false`:

```javascript
const API = false; // Use local database
```

### Using External API

1. Set `API` to `true`:

    ```javascript
    const API = true; // Use external API
    ```

2. Provide your API URL and key:

    ```javascript
    const prev = new Safeness.Client({
        api: API,
        url: 'https://example.com',  // Replace with your API URL
        key: 'your_api_key',  // Your API key
    });
    ```

## Usage

1. Start the bot:

    ```bash
    node index.js
    ```

2. Interact with the bot using the following commands:

    - `!help`: Displays available commands.
    - `!prevnames [user]`: Shows the previous names of a user.
    - `!clearprevnames`: Clears previous names for the user.
    - `!prevnamescount`: Displays the count of previous names in the database.
    - `!save [name]`: Saves a new name for the user.
    - `!infos`: Shows information about the bot.

## Event Handling

The bot listens for the `userUpdate` event to automatically save changes to a user's username or display name:

```javascript
client.on("userUpdate", async (oldUser, newUser) => {
    // Check for changes in username or display name
    // Save changes to the database or API
});
```

## Contributing

Feel free to open issues or submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
