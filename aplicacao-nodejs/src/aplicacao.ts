import { Notificacao } from "./notificacao";

export class Aplicacao {
	private pilhaNotificacoes = [];

	getNotificacoes() {
		return this.pilhaNotificacoes;
	}

	async configurarNovaNotificacao(notificacao: Notificacao): Promise<boolean> {
		try {
			this.pilhaNotificacoes.push(notificacao);

			return true;
		} catch(error) {
			console.error(error)
			return false;
		}
	}

	async enviarNotificacoes(): Promise<void> {
		if (this.pilhaNotificacoes.length > 0) {
			for (const notificacao of this.pilhaNotificacoes) {
				await (
					(): Promise<void> =>
						new Promise(resolve => setTimeout(resolve, 500))
				)();

				notificacao.enviarNotificacao();
			}
		}
	}
}