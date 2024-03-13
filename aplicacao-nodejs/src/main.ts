import { Aplicacao } from "./aplicacao";
import { Decorador, DecoradorNotificacaoFacebook, DecoradorNotificacaoSMS, DecoradorNotificacaoSlack, NotificacaoBase } from "./notificacao";

const NOTIFICACOES = {
	facebook: true,
	slack: true,
	sms: true,
};

async function main() {

	const aplicacao = new Aplicacao();
	const notificacaoBase = new Decorador(
		new NotificacaoBase()
	);

	notificacaoBase.setMensagem(`Sua conta foi acessada em ${new Date().toLocaleString('pt-br')}`);

	if (NOTIFICACOES.facebook) {
		const success = await aplicacao.configurarNovaNotificacao(
			new DecoradorNotificacaoFacebook(notificacaoBase)
		)
	}

	if (NOTIFICACOES.slack) {
		await aplicacao.configurarNovaNotificacao(
			new DecoradorNotificacaoSlack(notificacaoBase)
		)
	}

	if (NOTIFICACOES.sms) {
		await aplicacao.configurarNovaNotificacao(
			new DecoradorNotificacaoSMS(notificacaoBase)
		)
	}

	await aplicacao.enviarNotificacoes();
}

main();