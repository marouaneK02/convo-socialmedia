# convo

Full Stack Social Media Site with Real Time Chat App using the MERN stack and Socket.IO.


### Languages and Tools used

<img align="left" alt="ViteJS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" />
<img align="left" alt="JavaScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
<img align="left" alt="MongoDB" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg" />
<img align="left" alt="Express" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />
<img align="left" alt="React" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
<img align="left" alt="NodeJS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
<img align="left" alt="SocketIO" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original-wordmark.svg" />
<img align="left" alt="ChakraUI" width="30px" style="padding-right:10px;" src="/toolsIMG/chakraui.png" />

<br />
<br />

## Features
- Front-End Features:
  - Implemented user interface for creating and setting up a user, uploading images, creating posts, replying, liking posts, checking feed, suggested users and real time chatting using Chakra UI.
  - Used Recoil for responsive displaying of data without needing to reload the page.

- Back-End Features:
  - Implemented REST APIs to communicate between the client and the Mongo database.
  - Used Cloudinary to store user media such as profile pictures and posts.
  - Used Json Web Tokens (JWTs) for user Authentication and Authorisation
  - Used password hashing using bcrypt for database storage to ensure the user data remains secure.
  - Used Socket.IO to connect users to chat in real time.

</br>

## How to use convo locally

First, install the packages:

```shell
npm i
```

Lastly, run the development server (convo-backend MUST RUN FIRST, then convo-frontend):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the client.