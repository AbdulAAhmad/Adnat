# Adnat (React Challenge)

## Install
### Backend
To setup the api server run the following from the root directory
```bash
yarn backend:setup
```
To start the api server run the following from the root directory
```bash
yarn backend:start
```
The api server should now be running on `localhost:3000`

### Frontend
To setup the React server run the following from the root directory
```bash
yarn frontend:setup
```
To start the React server run the following from the root directory
```bash
yarn frontend:start
```
The React server should now be running on `localhost:3005` 

### React .env.development file (Optional)
The .env.development was included in this repositry for the sake of convenience. It contains the following variables
```
REACT_APP_API_URL=http://127.0.0.1:3000
PORT=3005
```
`REACT_APP_API_URL` contains the default API URL. 
`PORT` specifies the port for the react server.

## Features
- Login
- Signup
- Logout
- Change password
- Edit User's name and email
- Create organisation
- Join organisation
- Edit organisation
- Leave organisation
- Add shift
- Delete shift
- Edit shift
- Calculates hours worked (including overnight)
- Calculates shift cost
- Filter shifts by employee

## Testing
Run the included tests by running the following inside the `frontend` directory
```
yarn test
```
