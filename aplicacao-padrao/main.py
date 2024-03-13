from datetime import datetime as dt
from aplicacao import Aplicacao
from notificacao import (
    NotificacaoBase,
    Decorador,
    DecoradorNotificacaoSlack,
    DecoradorNotificacaoSMS,
    DecoradorNotificacaoFacebook,
)


FACEBOOK_ATIVADO = True
SLACK_ATIVADO = True
SMS_ATIVADO = True


def main():
    aplicacao = Aplicacao()

    # O que é declarado na classe Pai permanece estático em todos os objetos
    # Exemplo: A mensagem. (usando o dt.now() fica mais claro como o tempo é
    # igual para todos objetos)
    notificacao_base = Decorador(
        NotificacaoBase(f"Sua conta foi acessada as {dt.now()}")
    )

    # print(aplicacao.get_notificacoes())
    if FACEBOOK_ATIVADO:
        aplicacao.configurar_nova_notificacao(
            DecoradorNotificacaoFacebook(notificacao_base)
        )

    # print(aplicacao.get_notificacoes())
    if SLACK_ATIVADO:
        aplicacao.configurar_nova_notificacao(
            DecoradorNotificacaoSlack(notificacao_base)
        )

    # print(aplicacao.get_notificacoes())
    if SMS_ATIVADO:
        aplicacao.configurar_nova_notificacao(
            DecoradorNotificacaoSMS(notificacao_base)
        )

    # print(aplicacao.get_notificacoes())
    aplicacao.enviar_notificacoes()


if __name__ == "__main__":
    main()
