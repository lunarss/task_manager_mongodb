# React_task_manager + mongodb

run `npm install` in both folders

run `node app.js` in server folder

run `npm start` in client folder

change `localhost:8080` to your own domain IP from `.env` file in client folder

change `<mongodb>` and `<password>` to your own mongodb server setup

## Setup PM2 process manager to keep your app runnin

**install pm2**:

```
sudo npm install pm2 -g
```

**pm2 command** to run react app:

```
pm2 start npm -- start
```

**pm2 command** to run nodejs app:

```
pm2 start app.js
```

**pm2 command** to restart nodejs app:

```
pm2 restart app.js
```

**pm2 command** to enable app startup when the ubuntu server reboots:

```
pm2 startup ubuntu
```

revert startup:

```
pm2 unstartup
```
