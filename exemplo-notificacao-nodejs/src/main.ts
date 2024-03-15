import { Aplicacao } from "./aplicacao";
import { Decorador, DecoradorNotificacaoFacebook, DecoradorNotificacaoSMS, DecoradorNotificacaoSlack, Notificacao } from "./notificacao";

const NOTIFICACOES = {
	facebook: true,
	slack: true,
	sms: true,
};

async function main() {

	const aplicacao = new Aplicacao();
	const notificacao = new Decorador(
		new Notificacao("Aviso", `Sua conta foi acessada em ${new Date().toLocaleString('pt-br').replace(",", " às")}`)
	);

	if (NOTIFICACOES.facebook) {
		await aplicacao.configurarNovaNotificacao(
			new DecoradorNotificacaoFacebook(notificacao)
		)
	}

	if (NOTIFICACOES.slack) {
		await aplicacao.configurarNovaNotificacao(
			new DecoradorNotificacaoSlack(notificacao)
		)
	}

	if (NOTIFICACOES.sms) {
		await aplicacao.configurarNovaNotificacao(
			new DecoradorNotificacaoSMS(notificacao)
		)
	}

	await aplicacao.enviarNotificacoes();
}

main();