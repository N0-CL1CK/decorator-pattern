from datetime import datetime as dt

NOTIFICACAO_FACEBOOK = "Facebook"
NOTIFICACAO_SLACK = "Slack"
NOTIFICACAO_SMS = "SMS"


NOTIFICACOES_HABILITADAS = {
    NOTIFICACAO_FACEBOOK: True,
    NOTIFICACAO_SLACK: True,
    NOTIFICACAO_SMS: True,
}


def DecoradorNotificacao(notificacao: str):
    def Decorator(func):
        def Wrapper(*args, **kwargs):
            if NOTIFICACOES_HABILITADAS.get(notificacao):
                print(f"[+] Enviado notificação via {notificacao}: {args[0]}")
            return func(*args, **kwargs)
        return Wrapper
    return Decorator


for notificacao in list(NOTIFICACOES_HABILITADAS.keys()):
    @DecoradorNotificacao(notificacao)
    def enviar_notificacao(mensagem: str) -> None:
        pass

    enviar_notificacao(f"Sua conta foi acessada em {dt.now()}")