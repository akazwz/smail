## Por que alguns sites recusam endereços de email temporário

Você cola um endereço temporário em um formulário de cadastro e recebe "Informe um endereço de email válido". Ou o formulário aceita e o email de confirmação nunca chega. O endereço funciona bem. Foi o site que decidiu não aceitá-lo. Veja como isso acontece, por que os sites fazem isso e o que fazer em seguida.

### Como um site reconhece um endereço temporário

Um formulário de cadastro não consegue ver quem você é, mas consegue olhar a parte que vem depois do @.

- **Listas de bloqueio de domínios.** Listas de domínios usados por serviços de email temporário são publicadas e compartilhadas, e muitos sistemas de cadastro conferem os novos endereços com elas. É o método habitual.
- **Serviços de verificação de email.** Alguns sites enviam cada novo endereço a um verificador de terceiros, que responde com um rótulo como "descartável" ou "de risco".
- **Consultas aos servidores de email.** Quais servidores recebem os emails de um domínio é uma informação pública. Um site pode bloquear todo domínio que aponte para os mesmos servidores de email de um serviço temporário conhecido.
- **Regras de padrão e de idade.** Domínios registrados há pouco tempo, ou endereços que parecem gerados por máquina, podem receber uma pontuação de risco mais alta.

Nada disso envolve ler seus emails ou saber qualquer coisa sobre você. É um julgamento sobre o domínio.

### Por que os sites fazem isso

- **Abuso de testes gratuitos e cupons.** Se um novo endereço significa mais um teste gratuito ou mais um desconto de boas-vindas, os endereços descartáveis tornam a oferta ilimitada.
- **Contas falsas e em massa.** Bots de spam e avaliações falsas dependem de endereços que não custam nada para criar.
- **Eles precisam falar com você depois.** Um serviço que envia recibos, alertas de segurança ou redefinições de senha tem um interesse real em um endereço que você vai manter.
- **Eles querem uma lista de emails.** Uma equipe de marketing não ganha nada com um endereço que ninguém lê.
- **A reputação de envio deles.** Emails enviados a endereços que ninguém abre pioram a avaliação que os provedores de email fazem do remetente, então algumas empresas filtram esses endereços já no cadastro.

A maioria desses motivos protege o site. A necessidade de falar com você depois também protege você: uma conta presa a uma caixa de entrada à qual você não consegue voltar é um problema de verdade.

### Como é um bloqueio

- Um erro no próprio formulário: "email inválido", "use um email pessoal ou corporativo", "este provedor de email não é aceito".
- O formulário aceita o endereço, mas o email de verificação nunca chega. Alguns sites simplesmente não o enviam.
- A conta é criada e, mais tarde, é restringida ou pede que você adicione outro endereço.

O segundo caso é fácil de confundir com um atraso comum. Se nada chegou depois de alguns minutos e de um reenvio, um bloqueio é a explicação mais provável. A lista em [Email OTP não chega?](/blog/otp-email-not-arriving-fixes) ajuda a descartar as outras causas primeiro.

### O que não adianta

- **Gerar outro endereço.** Todo endereço do smail.pw termina em @smail.pw. Se o domínio está bloqueado, um novo endereço no mesmo domínio também está.
- **Reenviar várias e várias vezes.** Pedidos repetidos podem acionar limites de frequência e não dizem nada de novo.
- **Sair à procura de um serviço temporário que o site ainda não listou.** Pode funcionar hoje e parar amanhã, e você estaria criando uma conta em cima de um endereço que já sabe que o site não quer.

### O que funciona

Decida o quanto a conta importa e então escolha:

- **Você só queria dar uma olhada.** Pergunte-se se o site vale mesmo um endereço. Ir embora é uma resposta válida.
- **Você quer a conta, mas não o marketing.** Use um alias de email, às vezes chamado de endereço mascarado ou "ocultar meu email". Muitos provedores de email e gerenciadores de senhas oferecem um. Ele encaminha para sua caixa de entrada real, pode ser desativado depois e é aceito com muito mais frequência pelos formulários de cadastro. Veja [email temporário vs alias de email](/blog/temporary-email-vs-email-alias).
- **Você quer ver quem compartilha seu endereço.** Muitos provedores de email entregam yourname+shop@example.com em yourname@example.com. Isso não esconde seu endereço, mas permite filtrar os emails e ver de onde vieram. Alguns formulários recusam o sinal de mais.
- **A conta importa.** Use seu endereço real. Nada que envolva dinheiro, trabalho ou a recuperação de outras contas deveria estar em uma caixa temporária, para começo de conversa.

### É errado usar um endereço temporário?

Usar um para manter sua caixa de entrada limpa é legítimo. Um site também é livre para definir suas próprias regras de cadastro, e os termos dele podem exigir um endereço pelo qual consiga falar com você. Usar endereços descartáveis para pegar o mesmo teste várias e várias vezes, ou para criar contas falsas, é abuso, e é o principal motivo de esses bloqueios existirem.

### Conclusão

Uma recusa é uma decisão sobre o domínio, não uma falha que você consiga corrigir tentando de novo. Endereços temporários servem para sites que os aceitam e para contas das quais você não vai sentir falta. Para todo o resto, um alias ou o seu próprio endereço é o caminho mais rápido.
