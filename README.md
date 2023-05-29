# Getting Started

This project is a web app for sharing YouTube videos that includes the features: Login/Resgister, Share youtube video, Realtime notification.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) version 16.x.x

## Installation & Configuration

- Clone the repository
```
git clone  https://github.com/conghbnb/Sharing-Video.git <project_name>
```
- Install dependencies on server
```
cd <project_name>
cd server
yarn
```
- Install dependencies on client
```
cd ..
cd client
yarn
```
- Change 2 `.env.sample` files to `.env`
## Running the Application
- Run server
```
cd server
yarn start
```
- Run test on server
```
cd server
yarn test
```
- Run client
```
cd client
yarn start
```
- Run test on client
```
cd client
yarn test
```
Navigate to `http://localhost:3000`

## Usage
1. Login/Register

- Access to home page
- Enter email and password then click button to login. If you do not have an account, the app will automatically register

2. View all video

- the app will automatically load more video when you scroll down
3. Share video

- Login or sign up
- Click `Share a movie` button
- Enter a youtube video url. Example: `https://www.youtube.com/watch?v=fyYLkfmsFEA`


