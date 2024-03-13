interface INotificacaoBase {
	getMensagem(): string;
	enviarNotificacao(): void;
}

export class NotificacaoBase implements INotificacaoBase {
	private mensagem: string;
	
	constructor() {}

	setMensagem(mensagem: string): void {
		this.mensagem = mensagem;
	}

	getMensagem(): string {
		return this.mensagem;
	}

	enviarNotificacao(): void {}
}

export class Decorador extends NotificacaoBase {
	public _componente: NotificacaoBase;

	constructor(notificacao: NotificacaoBase) {
		super();
		this._componente = notificacao;
	}

	enviarNotificacao(): void {
		this._componente.enviarNotificacao();
	}
}

export class DecoradorNotificacaoFacebook extends Decorador {
	enviarNotificacao(): void {
		console.log(`[+] Enviado notificação via Facebook: ${this._componente.getMensagem()}`);
	}
}

export class DecoradorNotificacaoSlack extends Decorador {
	enviarNotificacao(): void {
		console.log(`[+] Enviado notificação via Slack: ${this._componente.getMensagem()}`);
	}
}

export class DecoradorNotificacaoSMS extends Decorador {
	enviarNotificacao(): void {
		console.log(`[+] Enviado notificação via SMS: ${this._componente.getMensagem()}`);
	}
}