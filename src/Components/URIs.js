const localhost = 'http://localhost:8000';
const production = 'https://iisppr-backend.vercel.app';

const signupURL = `https://iisppr-backend.vercel.app/api/auth/signup`
const localSignupUrl = `https://iisppr-backend.vercel.app/api/auth/signup`


const loginUrl = `https://iisppr-backend.vercel.app/api/auth/login`
const localLoginUrl = `http://localhost:8000/api/auth/login`

const localReqUser = `http://localhost:8000/api/get/user`
const reqUser = `https://iisppr-backend.vercel.app/api/get/user`

const getTasks = `https://iisppr-backend.vercel.app/task/get-tasks`




export { localSignupUrl, signupURL, localLoginUrl, loginUrl, localReqUser, reqUser, getTasks }