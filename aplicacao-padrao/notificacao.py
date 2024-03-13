class NotificacaoBase:
    def __init__(self, mensagem) -> None:
        self.mensagem = mensagem

    def get_mensagem(self) -> str:
        return self.mensagem

    def enviar_notificacao(self) -> None:
        pass


class Decorador(NotificacaoBase):
    def __init__(self, componenteNotificacao: NotificacaoBase) -> None:
        self._componente = componenteNotificacao

    def get_mensagem(self) -> str:
        return self._componente.get_mensagem()

    def enviar_notificacao(self) -> None:
        return self._componente.enviar_notificacao()


class DecoradorNotificacaoFacebook(Decorador):
    def enviar_notificacao(self) -> None:
        print(f"[+] Enviado notificação via Facebook: {self.get_mensagem()}")


class DecoradorNotificacaoSMS(Decorador):
    def enviar_notificacao(self) -> None:
        print(f"[+] Enviado notificação via SMS: {self.get_mensagem()}")


class DecoradorNotificacaoSlack(Decorador):
    def enviar_notificacao(self) -> None:
        print(f"[+] Enviado notificação via Slack: {self.get_mensagem()}")
