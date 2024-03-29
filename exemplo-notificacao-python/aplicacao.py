from notificacao import Notificacao
from time import sleep as delay


class Aplicacao:
    def __init__(self) -> None:
        self.pilha_notificacoes: list[Notificacao] = []

    def get_notificacoes(self) -> list[Notificacao]:
        return self.pilha_notificacoes

    def configurar_nova_notificacao(self, notificacao: Notificacao) -> bool:
        try:
            self.pilha_notificacoes.append(notificacao)
            return True
        except Exception:
            return False

    def enviar_notificacoes(self) -> None:
        for notificacao in self.pilha_notificacoes:
            notificacao.enviar_notificacao()
            delay(0.5)
