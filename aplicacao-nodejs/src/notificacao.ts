interface InterfaceNotificacao {
	// Métodos
	setTipo(tipo: string): void;
	setMensagem(mensagem: string): void;
	getTipo(): string;
	getMensagem(): string;
}

export class Notificacao implements InterfaceNotificacao {
	tipo: string;
	mensagem: string;

	constructor(tipo: string, mensagem: string) {
		this.tipo = tipo;
		this.mensagem = mensagem;
	}

	setTipo(tipo: string): void {
		this.tipo = tipo;
	}

	setMensagem(mensagem: string): void {
		this.mensagem = mensagem;
	}

	getTipo(): string {
		return this.tipo;
	}

	getMensagem(): string {
		return this.mensagem;
	}
}

export class Decorador implements InterfaceNotificacao {
	mensagem: string;
	tipo: string;
	
	protected _wrappe: Notificacao;

	constructor(notificacao: Notificacao) {
		this._wrappe = notificacao;
	}

	setTipo(tipo: string): void {
		this._wrappe.setTipo(tipo)
	}

	setMensagem(mensagem: string): void {
		this._wrappe.setMensagem(mensagem)
	}

	getTipo(): string {
		return this._wrappe.getTipo()
	}

	getMensagem(): string {
		return this._wrappe.getMensagem()
	}
}

export class DecoradorNotificacaoFacebook extends Decorador {
	enviarNotificacao(): void {
		console.log(`[+] Enviado notificação via Facebook: [${this.getTipo()}] ${this.getMensagem()}`);
	}
}

export class DecoradorNotificacaoSlack extends Decorador {
	enviarNotificacao(): void {
		console.log(`[+] Enviado notificação via Slack: [${this.getTipo()}] ${this.getMensagem()}`);
	}
}

export class DecoradorNotificacaoSMS extends Decorador {
	enviarNotificacao(): void {
		console.log(`[+] Enviado notificação via SMS: [${this.getTipo()}] ${this.getMensagem()}`);
	}
}