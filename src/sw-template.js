
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js' //mportar Workbox desde la URL especificada.
);

workbox.loadModule('workbox-background-sync')

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST); //Usa el método workbox.precaching.precacheAndRoute para precargar y rutar los archivos listados 

const {registerRoute} = workbox.routing; // función para definir rutas específicas y estrategias de caché para esas rutas.
const {CacheFirst, NetworkFirst, NetworkOnly} = workbox.strategies; //  Estrategias para recoger los recursos
const {BackgroundSyncPlugin} = workbox.backgroundSync;

const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events'
]

//Registro de rutas
registerRoute(
    ({request, url}) => {

        // console.log({request,url})
        if(cacheNetworkFirst.includes(url.pathname)) return true;

        return false;
    },
    new NetworkFirst() //Revisar en cache antes que en internet
)

// //Renovación token offline
// registerRoute(
//     new RegExp('http://localhost:4000/api/auth/renew'),
//     new NetworkFirst() //Revisar en cache antes que en internet
// )

// //Eventos offline
// registerRoute(
//     new RegExp('http://localhost:4000/api/events'),
//     new NetworkFirst() //Revisar en cache antes que en internet
// )

const cacaheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
]


registerRoute(
    ({request, url}) => {

        // console.log({request,url})
        if(cacaheFirstNetwork.includes(url.href)) return true;

        return false;
    },
    new CacheFirst() //Revisar en cache antes que en internet
)


//Posteos offline
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'DELETE'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'PUT'
)