const pusher = new Pusher('??????????', { cluster: 'us2' });
const canalPusher = pusher.subscribe('econrio-notificacao-canal');
const canalSW = new BroadcastChannel('mensagens-sw');

const verificarSuporte = () => {
	if (!('serviceWorker' in navigator))
		throw new Error('Navegador sem suporte a service worker.');
	if (!('PushManager' in window))
		throw new Error('Sem suporte a API Push.');
}

const registrarServiceWorker = async () => {
	const registroSW = await navigator.serviceWorker.register('sw.js', { scope: './' });
	return registroSW;
}

const solicitarPermissaoNotificacao = async () => {
	const permissao = await window.Notification.requestPermission();
	// valores da paermissão podem ser 'granted', 'default', 'denied'
	// granted: usuário permitiu
	// default: usuário ignorou e clicou no x para fechar o popup de solicitação de permissão
	// denied: usuário negou
	if (permissao !== 'granted'){
		throw new Error('Usuário não permitiu as notificações.');
	}
}

const exibirNotificacao = (titulo, corpo, callbackSW) => {
	// https://developer.mozilla.org/pt-BR/docs/Web/API/notificacoes
	
	callbackSW.showNotification(titulo, {
		body: corpo,
		icon: './favicon-96x96.png'
	});
}

const setup = async () => { 
	verificarSuporte();
	
	const registroSW = await registrarServiceWorker();
    const permissaoNotificacao =  await solicitarPermissaoNotificacao();

	canalSW.addEventListener('message', evento => {
	  // console.log('Received', evento.data);

	  exibirNotificacao('Econrio (aplicativo)', JSON.stringify(evento.data.mensagem), registroSW);
	});

	canalPusher.bind('econrio-notificacao-evento', (mensagem) => {
		exibirNotificacao('Econrio (servidor)', JSON.stringify(mensagem), registroSW);
	});
}

setup()