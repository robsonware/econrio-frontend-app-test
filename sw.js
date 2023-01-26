const cacheName = 'ECONRIOSW';
const canallSW = new BroadcastChannel('mensagens-sw');

// armazena no cache para funcionar offline
self.addEventListener('install', e => {
	e.waitUntil(caches.open(cacheName).then(cache => {
		return cache.addAll([
			'./',
			'./index.html',
			'./manifest.json',
			'./bundle.js',
			'./global.css',
			'./bundle.css',
			'./logo.png',
			'./logo-pfe.png',
			'./pusher.min.js',
			'./ckeditor/ckeditor.js',
			'./ckeditor/ckeditor.css',
			'./ckeditor/translations/pt.js',
			'./favicon-16x16.png',
			'./favicon-32x32.png',
			'./favicon-96x96.png',
			'./favicon.ico',
			'./android-icon-144x144.png',
			'./android-icon-192x192.png',
			'./android-icon-36x36.png',
			'./android-icon-48x48.png',
			'./android-icon-72x72.png',
			'./android-icon-96x96.png',
			'./apple-icon-114x114.png',
			'./apple-icon-120x120.png',
			'./apple-icon-152x152.png',
			'./apple-icon-180x180.png',
			'./apple-icon-57x57.png',
			'./apple-icon-60x60.png',
			'./apple-icon-72x72.png',
			'./apple-icon-76x76.png',
			'./apple-icon-precomposed.png',
			'./apple-icon.png',
			'./ms-icon-144x144.png',
			'./ms-icon-150x150.png',
			'./ms-icon-310x310.png',
			'./ms-icon-70x70.png'
		]);
	}));
});

/**
 * o service worker vai interceptar todas as requisições fetch e verificar 
 * se já possui o arquivo no cache caso positivo, irá retornar o arquivo do cache.
 */
self.addEventListener('fetch', async (evento) => {
	evento.respondWith(caches.open(cacheName)
		.then(cache => cache.match(evento.request, { ignoreSearch: true }))
		.then(response => response || fetch(evento.request))
	);
});

// só vai ser executado uma vez, apenas quando o sw estiver ativado.
self.addEventListener('activate', async (evento) => {
	try {
		canallSW.postMessage({mensagem: 'Service Worker inicializado...'});
		console.log(response);
	} catch (erro) {
		console.log('Erro ao ativar o SW', erro);
	}
});