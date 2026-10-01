// ─────────────────────────────────────────────────────────────
// Tudo o que você vai querer editar no site fica aqui.
// ─────────────────────────────────────────────────────────────

export const contato = {
  whatsapp: "5549999416011", // DDI + DDD + número, sem espaços
  whatsappLegivel: "(49) 99941-6011",
  email: "viniciusrigo136@outlook.com",
  instagram: "", // ex.: "vr.iaesites" — deixe vazio para esconder
}

export function linkWhatsApp(mensagem = "Olá! Vi seu site e quero conversar sobre um site para o meu negócio.") {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export type Projeto = {
  id: string
  nome: string
  setor: string
  tipo: string
  resumo: string
  entregas: string[]
  capa: string
  numero: string
  observacao?: string
  /** Sistemas: mostra cada tela separada no visualizador, em vez de uma página contínua */
  telasSeparadas?: boolean
}

export const projetos: Projeto[] = [
  {
    id: "ecocharge",
    numero: "01",
    nome: "Elbratec EcoCharge",
    setor: "Indústria · Carregadores para veículos elétricos",
    tipo: "Site com catálogo de produtos",
    resumo:
      "Site completo de um fabricante de carregadores AC e DC. Nove páginas que levam o visitante do primeiro contato até o cadastro de revendedor, com catálogo técnico para baixar.",
    entregas: ["9 páginas", "Catálogo de produtos", "Página de revendedores", "Formulários", "Catálogo em PDF"],
    capa: "portfolio/27-ecocharge-home.webp",
  },
  {
    id: "gimo",
    numero: "02",
    nome: "Gimo Eletropostos",
    setor: "Franquias · Mobilidade elétrica",
    tipo: "Landing page de captação",
    resumo:
      "Página única para vender franquias de eletroposto. Vídeo de fundo, comparação de modelos de 80 a 480 kW, apresentação do software e formulário que já qualifica o interessado.",
    entregas: ["Hero com vídeo", "Comparador de modelos", "Formulário de franqueado", "Perguntas frequentes"],
    capa: "portfolio/01-gimo-completo.webp",
  },
  {
    id: "elbratec",
    numero: "03",
    nome: "Grupo Elbratec",
    setor: "Energia solar · Mobilidade elétrica",
    tipo: "Site institucional",
    resumo:
      "O site do grupo que reúne energia solar e recarga elétrica. Apresenta as divisões, os segmentos atendidos e encaminha cada visitante para a solução certa.",
    entregas: ["Institucional", "Divisões do grupo", "Segmentos atendidos", "Página de contato"],
    capa: "portfolio/11-elbratec-completo.webp",
  },
  {
    id: "balen",
    numero: "04",
    nome: "Barbearia Balen",
    setor: "Serviços locais · União do Oeste, SC",
    tipo: "Site com agendamento",
    resumo:
      "Site escuro e direto para uma barbearia. Serviços com preço e duração, apresentação do barbeiro e agendamento online com nome, WhatsApp, serviço, data e horário.",
    entregas: ["Agendamento online", "Tabela de serviços", "Mapa e horários", "Área administrativa"],
    capa: "portfolio/20-balen-completo.webp",
  },
  {
    id: "pontobom",
    numero: "05",
    nome: "PontoBom SmartStore",
    setor: "Assistência técnica",
    tipo: "Sistema de gestão com login",
    resumo:
      "Sistema completo para assistência técnica de celulares: ordens de serviço, orçamentos, vendas com garantia, contas a receber, clientes, estoque e um atendente com IA para o WhatsApp.",
    entregas: ["Ordens de serviço", "Orçamentos e vendas", "Contas a receber", "Clientes e estoque", "Atendente IA"],
    capa: "portfolio/68-pontobom-contas-receber.webp",
    observacao: "Nomes, contatos e valores foram ocultados nas imagens para proteger os dados do cliente.",
    telasSeparadas: true,
  },
]

export const servicos = [
  {
    titulo: "Landing page",
    texto: "Uma página feita para uma única ação: chamar no WhatsApp, pedir orçamento, se cadastrar. Ideal para campanhas e lançamentos.",
    tag: "Captação",
  },
  {
    titulo: "Site institucional",
    texto: "Várias páginas para apresentar a empresa, os serviços e a equipe — com textos que explicam o que você faz em linguagem de cliente.",
    tag: "Presença",
  },
  {
    titulo: "Catálogo de produtos",
    texto: "Produtos organizados por linha, com ficha técnica, fotos e botão de contato. Sem carrinho, sem complicação.",
    tag: "Vendas",
  },
  {
    titulo: "Agendamento online",
    texto: "Seu cliente escolhe serviço, dia e horário sem precisar te chamar. Bom para barbearias, clínicas, estúdios e consultórios.",
    tag: "Serviços",
  },
  {
    titulo: "Sistemas sob medida",
    texto: "Ordens de serviço, cadastros, painéis com login. Quando planilha e caderno já não dão conta do dia a dia.",
    tag: "Gestão",
  },
  {
    titulo: "Artes para divulgar",
    texto: "Cada site sai com um pacote de imagens prontas para o Instagram, para você mostrar o lançamento nas redes.",
    tag: "Redes",
  },
]

export const etapas = [
  {
    titulo: "Conversa",
    texto: "Você me conta pelo WhatsApp o que faz, quem é seu cliente e o que espera do site. Sem formulário enorme.",
  },
  {
    titulo: "Proposta e estrutura",
    texto: "Mando as páginas, as seções e o valor por escrito. Só começo depois que você aprovar.",
  },
  {
    titulo: "Design e desenvolvimento",
    texto: "Aqui entra a IA: ela acelera código, rascunhos e variações. As decisões de layout, texto e acabamento são minhas — e revisadas com você.",
  },
  {
    titulo: "No ar",
    texto: "Publico no seu domínio, conecto WhatsApp, e-mail e Google, e acompanho os primeiros ajustes.",
  },
]

export const pacotes = [
  {
    nome: "Landing page",
    para: "Para quem quer começar a receber contatos rápido.",
    itens: [
      "1 página longa, dividida em seções",
      "Botão e formulário para o WhatsApp",
      "Pronta para celular",
      "Configuração de domínio",
      "Artes para anunciar no Instagram",
    ],
    destaque: false,
  },
  {
    nome: "Site institucional",
    para: "Para empresas que precisam explicar o que fazem e passar confiança.",
    itens: [
      "Várias páginas (empresa, serviços, contato…)",
      "Textos escritos junto com você",
      "Catálogo ou portfólio, se precisar",
      "Google Meu Negócio e Search Console",
      "Formulários e integração com WhatsApp",
      "Artes para anunciar no Instagram",
    ],
    destaque: true,
  },
  {
    nome: "Sistema sob medida",
    para: "Para quem precisa de login, cadastros e painel próprio.",
    itens: [
      "Levantamento do processo atual",
      "Login e níveis de acesso",
      "Cadastros, relatórios e painel",
      "Hospedagem e banco de dados",
      "Suporte na implantação",
    ],
    destaque: false,
  },
]

export const perguntas = [
  {
    p: "Site feito com IA não fica com cara de IA?",
    r: "Fica, quando a IA decide tudo sozinha. No meu processo ela é ferramenta: acelera a parte repetitiva do código e me dá variações. A estrutura, o texto, as cores e cada detalhe visual são escolhidos para o seu negócio — dá para ver nos projetos acima que nenhum se parece com o outro.",
  },
  {
    p: "Quanto tempo leva?",
    r: "Depende do tamanho. Uma landing page costuma ser bem mais rápida que um site com várias páginas ou um sistema. O prazo vai escrito na proposta, antes de começar.",
  },
  {
    p: "Preciso já ter domínio e hospedagem?",
    r: "Não. Eu te ajudo a registrar o domínio (.com.br ou .com) no seu nome e cuido da publicação. O domínio fica sempre seu.",
  },
  {
    p: "Vou conseguir mudar textos e fotos depois?",
    r: "Sim. Pequenos ajustes eu faço pelo WhatsApp, e se você quiser editar sozinho combinamos isso na proposta.",
  },
  {
    p: "Meu site vai aparecer no Google?",
    r: "Ele sai configurado para isso: títulos, descrições, velocidade e cadastro no Google Search Console. Aparecer bem nas buscas também depende de tempo e de conteúdo, e eu te explico o que ajuda.",
  },
  {
    p: "Atende fora de Santa Catarina?",
    r: "Sim. Todo o processo funciona por WhatsApp e videochamada, então atendo qualquer cidade do Brasil.",
  },
]
