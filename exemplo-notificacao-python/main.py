from datetime import datetime as dt
from aplicacao import Aplicacao
from notificacao import (
    Notificacao,
    Decorador,
    DecoradorNotificacaoSlack,
    DecoradorNotificacaoSMS,
    DecoradorNotificacaoFacebook,
)

def get_data_e_hora_acesso() -> str:
    data, hora = dt.now().strftime('%d/%m/%Y %H:%M:%S').split()
    return f"{data} às {hora}"


FACEBOOK_ATIVADO = True
SLACK_ATIVADO = True
SMS_ATIVADO = True


def main():
    aplicacao = Aplicacao()

    # O que é declarado na classe Pai permanece estático em todos os objetos
    # Exemplo: A mensagem. (usando o dt.now() fica mais claro como o tempo é
    # igual para todos objetos)
    notificacao = Decorador(
        Notificacao("Aviso", f"Sua conta foi acessada em {get_data_e_hora_acesso()}")
    )

    # print(aplicacao.get_notificacoes())
    if FACEBOOK_ATIVADO:
        aplicacao.configurar_nova_notificacao(
            DecoradorNotificacaoFacebook(notificacao)
        )

    # print(aplicacao.get_notificacoes())
    if SLACK_ATIVADO:
        aplicacao.configurar_nova_notificacao(
            DecoradorNotificacaoSlack(notificacao)
        )

    # print(aplicacao.get_notificacoes())
    if SMS_ATIVADO:
        aplicacao.configurar_nova_notificacao(
            DecoradorNotificacaoSMS(notificacao)
        )

    # print(aplicacao.get_notificacoes())
    aplicacao.enviar_notificacoes()


if __name__ == "__main__":
    main()
