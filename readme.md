# express i18n messages
express-i18n-messages is a simple middleware which reads .json files in a directory and outputs the values based on the "Accept-Language" header automatically.

# Requirments
- nodejs version  - v6.10.0 or higher
- express - 4.14.1 or higher

# How to install
```bash
npm install express-i18n-messages --save
```
Once installed with the project you have to setup the middleware with express. 
A sample setup would look like this:
```js
var express = require('express');
var app = express();
var i18nMessages = require('./express-i18n-messages');

app.use(i18nMessages({
    dir: MESSAGES_FILE_DIR
}));

app.listen(3000);
```
# Arguments
The middleware accepts one argument only, which is the directory location where the messages.json files will reside.

```js
app.use(i18nMessages({
    dir: MESSAGES_FILE_DIR
}));
```


#### IMPORTANT
The residing .json files inside the directory must start with the name of "messages" followed by the language prefix (e.g. messages.json, messages_fr.json)

The default file which the middleware will look for if there is no language specific message file found would be messages.json (it is a good idea to create this file)


For examples sake let's take an additional language in this case French (I have no idea how to speak in French so excuse me if I am using incorrect grammar on the translated file, this is a direct google translate which has been copied and pasted )

##### Default: messages.json

```json
{  
   "food_opinion":"cheese omelettes gives me gas"
}
```

##### French: messages_fr.json

```json
{  
   "food_opinion":"Omelettes de fromage me donne du gaz"
}
```

And finally inside a route you can use it as:

```js
app.get('/', function (req, res) {
    res.send(req.i18nMessages.food_opinion);
});
```

Afterwords dependent on the language header automatically the text will change.