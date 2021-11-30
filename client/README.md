## Explaning the folder structure

**assest:**
- company icons: contains all the company logos.
- images: contains all the images used in the website.
- icons: contains all the icons used in the website.
- logo: logo of the company.

**authentication:**
Has login and register pages for the user. Needs a bit of refactoring and a custom component for the input elements.

**components:**
Components need to be created as of now they are just used as a wrapper.

**config:**
Contains socket io and backend api connection settings and urls.

**firebase:**
Don't know if its needed. Its just there to act as a storage house for messages and possibly images. Might be moved in the config folder. in future.

**hooks:**
Essential parts doesn't have to be explained what its used for 'cux' ofcourse the name is self explanatory.

**layout:**
Contains the main layout of the website. Or just a some complex components what I like to call.

**misc:**
This is just used by some hooks.

**pages:**
Star of every website aka _pages_. House of main components like Chats, Music, settings, etc.

**redcuers:**
Reducers are used to update the state of the application.

**routes:**
Contains all the routes of the website.

**store:**
House of all reducers need a _function_ to create a reducer automatically without having to write it again and again.

    const { readdirSync } = require('fs');

    const events = readdirSync('./reducers/').filter(file => file.endsWith('.ts'));

    for (const file of events) {
    const event = require(`../reducers/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
    };
    

This is however not a complete function to automate the creation of reducers. But is just a gist of it.

**styles:**
Used only for custom styling.

**workers:**
This is possibly could be the most important file since workers are yet to written so that the main thread aren't blocked. This is pretty much a TODO which needs to be completed for performance metrics.

## TODO List

1. Create a custom component for the input elements.
2. Recieving messaged and sending messaged need to be refactored.
3. Creation of web workers.
4. Add image uploading and sending via web socket functinality.
5. Dropdown which has _invite_ and _delete_ options as a very least.
6. Homepage and about pages are there but are really not designed well and looks pretty ugly when compared to rest of the application.
