const URL = window.location.href;
var swLocation = '/twitor/sw.js';

if(navigator.serviceWorker){  //si existe
    if(URL.includes('localhost')){
        swLocation = '/sw.js';
    }
    navigator.serviceWorker.register(swLocation)
        .then( resp => console.log("registrado",resp))
        .catch(err => console.log("error",err));
    console.log("app service worker")
}
