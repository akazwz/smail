import type { ParentProps } from "solid-js";

import { type Dictionary, DictionaryContext } from "../dictionary.ts";

export const dictionary: Dictionary = {
	home: {
		title: "Email temporário grátis sem cadastro para OTP | smail.pw",
		description:
			"Gere na hora um email temporário grátis (temp mail) no smail.pw. Caixa de entrada descartável para códigos OTP, cadastros rápidos e menos spam.",
		keywords:
			"email temporario, email temporário, email descartavel, temp mail, sem cadastro, codigo otp, smail.pw",
		heroTitle: "Sua caixa de email temporário em um clique.",
		heroDescription:
			"Gere em segundos um endereço de email temporário para cadastros e códigos OTP. O endereço nunca muda, a menos que você o troque.",
		copy: "Copiar",
		copied: "Copiado",
		deleteAddress: "Excluir endereço",
		replaceAddress: "Substituir endereço",
		replaceConfirmTitle: "Substituir este endereço?",
		deleteConfirmTitle: "Excluir este endereço?",
		confirmBody:
			"Você não poderá mais abrir {address} nem a caixa de entrada desse endereço. Esta ação não pode ser desfeita.",
		generating: "Gerando...",
		noAddressTitle: "Você ainda não tem um email descartável",
		noAddressDescription:
			"Gere um endereço temporário para cadastros e verificações pontuais.",
		generateAddress: "Gerar endereço",
		actionFailed: "Não deu certo. Tente novamente.",
		inboxTitle: "Últimos emails",
		emptyInboxTitle: "Sua caixa de entrada está pronta",
		emptyInboxDescription:
			"Ainda não há emails. As mensagens aparecerão aqui instantaneamente.",
		refreshInbox: "Atualizar",
		refreshingInbox: "Atualizando...",
		liveOn: "Recebendo em tempo real",
		liveOff: "Desconectado, reconectando",
		safetyHint:
			"Não use este endereço para banco, trabalho ou códigos de contas críticas. Ele é mantido a longo prazo por padrão, mas sem garantia.",
		badge: "Endereço fixo · Sem cadastro",
		modal: {
			title: "Pré-visualização da mensagem",
			from: "De",
			time: "Hora",
			loading: "Carregando...",
			empty: "Sem conteúdo",
		},
		narrative: {
			title: "Por que usar o email temporário do smail.pw",
			description:
				"O smail.pw é um gerador gratuito de email temporário (temp mail) para cadastros de baixo risco, verificação por OTP e downloads pontuais. Crie uma caixa de entrada descartável em segundos e mantenha o mesmo endereço até trocá-lo.",
			points: [
				"Ideal para cadastros com email temporário e para receber códigos de verificação",
				"Sem cadastro nem senha: acesso rápido ao seu temp mail",
				"Os novos emails aparecem sozinhos, sem precisar ficar atualizando",
				"Para banco, trabalho e contas ligadas à sua identidade, use um email permanente",
			],
		},
		jsonLdDescription:
			"O smail.pw oferece caixas de email temporário grátis (temp mail) para cadastro e verificação por OTP, com um endereço que continua o mesmo até você trocá-lo.",
	},
	layout: {
		siteSubtitle: "caixa temporária",
		about: "Sobre",
		faq: "FAQ",
		blog: "Blog",
		contact: "Contato",
		privacy: "Política de privacidade",
		terms: "Termos de uso",
		language: "Idioma",
		copyright: "Caixa limpa, identidade limpa.",
	},
	common: {
		close: "Fechar",
		cancel: "Cancelar",
	},
	guides: {
		title: "Guias populares de email temporário",
		items: [
			{
				label: "Email temporário sem cadastro",
				path: "/temporary-email-no-registration",
			},
			{
				label: "Email descartável para verificação",
				path: "/disposable-email-for-verification",
			},
			{
				label: "Email temporário para cadastro",
				path: "/temporary-email-for-registration",
			},
			{
				label: "Email temporário online",
				path: "/online-temporary-email",
			},
		],
	},
	contact: {
		metaTitle: "Contato | smail.pw",
		metaDescription:
			"Fale com o smail.pw: deixe uma mensagem com uma dúvida, um feedback ou uma proposta de parceria.",
		title: "Fale com o suporte",
		description:
			"Deixe uma mensagem abaixo. Dúvidas, feedback e propostas de parceria são bem-vindos.",
		formTitle: "Deixe uma mensagem",
		messageLabel: "Mensagem",
		messagePlaceholder: "O que aconteceu ou o que você gostaria de nos dizer?",
		contactLabel: "Como falar com você (opcional)",
		contactHint: "Um endereço de email, só se você quiser resposta",
		send: "Enviar mensagem",
		sending: "Enviando...",
		sent: "Obrigado, recebemos sua mensagem.",
		tooMany:
			"Muitas mensagens foram enviadas da sua rede. Tente novamente mais tarde.",
		failed: "Não foi possível enviar a mensagem. Tente novamente em instantes.",
		faqHint:
			"Antes de entrar em contato, confira a página de perguntas frequentes: sua resposta pode já estar lá.",
		faqCta: "Ver FAQ",
		homeCta: "Voltar ao início",
	},
	blog: {
		title: "Blog de email temporário: guias e soluções | smail.pw",
		description:
			"Guias de email temporário, boas práticas e solução de problemas para verificação e uso de caixas de entrada descartáveis.",
		header: "Blog do smail.pw",
		subheader: "Guias e solução de problemas para quem usa email temporário",
		readArticle: "Ler artigo",
		prevPage: "Anterior",
		nextPage: "Próxima",
		backToBlog: "Voltar ao blog",
		relatedPosts: "Artigos relacionados",
		postTitleSuffix: " | Blog do smail.pw",
		pageSummary: "Página {page} de {total} · {size} artigos por página",
		readingTime: "{minutes} min de leitura",
		posts: [
			{
				slug: "is-temporary-email-safe",
				title:
					"Email temporário é seguro? O que ele protege e o que não protege",
				description:
					"O que um endereço temporário protege, o que não protege e como o smail.pw trata o acesso à caixa de entrada, o armazenamento e a exibição dos emails.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "why-websites-block-temporary-email",
				title: "Por que alguns sites recusam endereços de email temporário",
				description:
					"Como os formulários de cadastro detectam endereços descartáveis, por que os sites os bloqueiam e o que realmente funciona quando seu endereço temporário é recusado.",
				publishedAt: "2026-10-08",
				readingMinutes: 5,
			},
			{
				slug: "how-email-ends-up-on-spam-lists",
				title:
					"Como seu endereço de email vai parar em listas de spam (e como evitar)",
				description:
					"De onde spammers e equipes de marketing tiram seu endereço, quais hábitos o expõem e uma regra simples para saber qual endereço informar em cada site.",
				publishedAt: "2026-10-08",
				readingMinutes: 4,
			},
			{
				slug: "temporary-email-best-practices",
				title: "Boas práticas de email temporário para cadastros mais seguros",
				description:
					"Boas práticas de email temporário para reduzir o spam, não perder o acesso às suas contas e proteger sua caixa de entrada principal.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "temporary-email-vs-email-alias",
				title: "Email temporário vs alias de email: qual usar?",
				description:
					"Compare caixas de entrada temporárias e aliases de email em privacidade, recuperação e segurança da conta a longo prazo.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
			{
				slug: "otp-email-not-arriving-fixes",
				title: "Email OTP não chega? 8 soluções rápidas que costumam funcionar",
				description:
					"Resolva atrasos de emails de verificação com uma lista prática: reenvios, bloqueios do remetente e atualização da caixa de entrada.",
				publishedAt: "2026-02-12",
				readingMinutes: 2,
			},
		],
	},
	md: {
		meta: {
			about: {
				title: "Sobre o smail.pw | Email temporário",
				description:
					"Saiba como funciona o email temporário do smail.pw, quando usar um temp mail e os limites importantes de uma caixa de entrada descartável.",
			},
			faq: {
				title: "Perguntas frequentes | smail.pw",
				description:
					"Dúvidas sobre o email temporário do smail.pw: como começar, por quanto tempo endereços e mensagens ficam guardados, problemas com OTP e limites.",
			},
			privacy: {
				title: "Política de privacidade | smail.pw",
				description:
					"Veja quais dados o smail.pw pode tratar, por quanto tempo os dados temporários são mantidos e como cuidamos da privacidade.",
			},
			terms: {
				title: "Termos de uso | smail.pw",
				description:
					"Confira os termos de uso do smail.pw: uso aceitável, isenções de responsabilidade e limitações do serviço.",
			},
			"temporary-email-no-registration": {
				title: "Email temporário sem cadastro | smail.pw",
				description:
					"Use um email temporário sem cadastro, sem senha e sem dados pessoais. Gere uma caixa de entrada temporária na hora e receba emails em segundos.",
			},
			"disposable-email-for-verification": {
				title: "Email descartável para verificação e OTP | smail.pw",
				description:
					"Receba códigos OTP e emails de verificação em uma caixa de entrada descartável e mantenha seu email pessoal privado e sem spam.",
			},
			"temporary-email-for-registration": {
				title: "Email temporário para cadastro | smail.pw",
				description:
					"Use um email temporário para cadastros, testes gratuitos e inscrições pontuais sem expor seu email de uso permanente.",
			},
			"online-temporary-email": {
				title: "Email temporário online imediato | smail.pw",
				description:
					"Tenha na hora uma caixa de email temporário online para links de verificação, códigos OTP e recebimento pontual de emails.",
			},
			"can-temporary-email-send": {
				title: "Email temporário pode enviar mensagens? | smail.pw",
				description:
					"Entenda se um email temporário pode enviar mensagens, por que muitos são só para recebimento e quando usar um email permanente.",
			},
			"smail-vs-smailpro": {
				title: "smail.pw vs smailpro / smail pro | Esclarecimento de marca",
				description:
					"Esclarecimento oficial: o smail.pw é um serviço independente de email temporário e não é afiliado ao smailpro nem a produtos de nome parecido.",
			},
		},
		breadcrumbHome: "Início",
		cta: {
			title: "Comece a usar sua caixa temporária agora",
			description:
				"Crie um endereço descartável em um clique e depois abra, logo abaixo, os guias mais comuns sobre cadastro e OTP.",
			action: "Gerar email temporário",
		},
	},
};

export default function Provider(props: ParentProps) {
	return (
		<DictionaryContext value={dictionary}>{props.children}</DictionaryContext>
	);
}
