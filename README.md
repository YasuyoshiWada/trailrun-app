# minamieru

## Mock chat server

A simple mock chat server is available for local development.

Start it with:

```
npm run mock:chat
```

### Connecting the front-end

The React application uses the `REACT_APP_CHAT_ENDPOINT` environment variable to locate the chat server. Set it to the server's URL before running the front-end:

```
REACT_APP_CHAT_ENDPOINT=http://localhost:4000 npm start
```

Replace `http://localhost:4000` with your server address as needed.
