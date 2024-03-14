class InterfaceNotificacao:
    def __init__(self, tipo, mensagem) -> None:
        pass

    def set_tipo(self, tipo: str) -> None:
        pass

    def set_mensagem(self, mensagem: str) -> None:
        pass

    def get_tipo(self) -> str:
        pass

    def get_mensagem(self) -> str:
        pass


class Notificacao(InterfaceNotificacao):
    def __init__(self, tipo, mensagem) -> None:
        self.tipo = tipo
        self.mensagem = mensagem

    def set_tipo(self, tipo: str) -> None:
        self.set_tipo(tipo)

    def set_mensagem(self, mensagem: str) -> None:
        self.set_mensagem(mensagem)

    def get_tipo(self) -> str:
        return self.tipo

    def get_mensagem(self) -> str:
        return self.mensagem


class Decorador(InterfaceNotificacao):
    def __init__(self, componenteNotificacao: InterfaceNotificacao) -> None:
        self.__componente = componenteNotificacao

    def set_tipo(self, tipo: str) -> None:
        self.__componente.set_tipo(tipo)

    def set_mensagem(self, mensagem: str) -> None:
        self.__componente.set_mensagem(mensagem)

    def get_tipo(self) -> str:
        return self.__componente.get_tipo()

    def get_mensagem(self) -> str:
        return self.__componente.get_mensagem()


class DecoradorNotificacaoFacebook(Decorador):
    def enviar_notificacao(self) -> None:
        print(f"[+] Enviado notificação via Facebook: [{super().get_tipo()}] {super().get_mensagem()}")


class DecoradorNotificacaoSMS(Decorador):
    def enviar_notificacao(self) -> None:
        print(f"[+] Enviado notificação via SMS: [{super().get_tipo()}] {super().get_mensagem()}")


class DecoradorNotificacaoSlack(Decorador):
    def enviar_notificacao(self) -> None:
        print(f"[+] Enviado notificação via Slack: [{super().get_tipo()}] {super().get_mensagem()}")
