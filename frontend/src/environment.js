let IS_PROD = false;
const server = IS_PROD ?
    "http://localhost:8000" :

    "https://voxaro-backend.onrender.com"


export default server;