// ─────────────────────────────────────────────────────────────
// Tudo o que você vai querer editar no site fica aqui.
// ─────────────────────────────────────────────────────────────

export const contato = {
  whatsapp: "5549999416011", // DDI + DDD + número, sem espaços
  whatsappLegivel: "(49) 99941-6011",
  email: "viniciusrigo136@outlook.com",
  instagram: "", // ex.: "vr.iaesites" — deixe vazio para esconder
}

export function linkWhatsApp(mensagem = "Olá! Vi seu site e quero conversar sobre um projeto para o meu negócio.") {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export type Projeto = {
  id: string
  nome: string
  setor: string
  tipo: string
  /** Uma frase curta: o que o projeto precisava resolver */
  objetivo: string
  /** O que foi criado para resolver */
  solucao: string
  /** Principais recursos (aparecem como etiquetas) */
  entregas: string[]
  capa: string
  numero: string
  /** Cor de destaque do cartão do projeto (puxada da identidade do cliente) */
  cor: string
  observacao?: string
  /** Sistemas: mostra cada tela separada no visualizador, em vez de uma página contínua */
  telasSeparadas?: boolean
}

export const projetos: Projeto[] = [
  {
    id: "ecocharge",
    cor: "#3ddc84",
    numero: "01",
    nome: "Elbratec EcoCharge",
    setor: "Indústria · Carregadores para veículos elétricos",
    tipo: "Site com catálogo de produtos",
    objetivo: "Apresentar uma linha técnica de carregadores AC e DC e abrir um canal para novos revendedores.",
    solucao:
      "Um site de nove páginas que leva o visitante do primeiro contato até o cadastro de revendedor, com catálogo técnico para baixar.",
    entregas: ["9 páginas", "Catálogo de produtos", "Página de revendedores", "Formulários", "Catálogo em PDF"],
    capa: "portfolio/27-ecocharge-home.webp",
  },
  {
    id: "gimo",
    cor: "#22c8e0",
    numero: "02",
    nome: "Gimo Eletropostos",
    setor: "Franquias · Mobilidade elétrica",
    tipo: "Landing page de captação",
    objetivo: "Transformar o interesse em franquias de eletroposto em leads qualificados.",
    solucao:
      "Uma página única que apresenta o negócio, compara os modelos de 80 a 480 kW, mostra o software e termina num formulário que já qualifica o interessado.",
    entregas: ["Vídeo de apresentação", "Comparação de modelos", "Software", "Formulário de qualificação"],
    capa: "portfolio/01-gimo-completo.webp",
  },
  {
    id: "elbratec",
    cor: "#e9b872",
    numero: "03",
    nome: "Grupo Elbratec",
    setor: "Energia solar · Mobilidade elétrica",
    tipo: "Site institucional",
    objetivo: "Reunir energia solar e recarga elétrica numa só presença digital, sem confundir quem chega.",
    solucao:
      "Um site institucional que apresenta as divisões do grupo e os segmentos atendidos, e encaminha cada visitante para a solução certa.",
    entregas: ["Institucional", "Divisões do grupo", "Segmentos atendidos", "Página de contato"],
    capa: "portfolio/11-elbratec-completo.webp",
  },
  {
    id: "balen",
    cor: "#ff8a3d",
    numero: "04",
    nome: "Barbearia Balen",
    setor: "Serviços locais · União do Oeste, SC",
    tipo: "Site com agendamento",
    objetivo: "Deixar o cliente marcar horário sozinho, sem depender de troca de mensagens.",
    solucao:
      "Um site escuro e direto, com serviços, preço e duração, apresentação do barbeiro e agendamento online com data e horário.",
    entregas: ["Agendamento online", "Tabela de serviços", "Mapa e horários", "Área administrativa"],
    capa: "portfolio/20-balen-completo.webp",
  },
  {
    id: "pontobom",
    cor: "#ffd21f",
    numero: "05",
    nome: "PontoBom SmartStore",
    setor: "Assistência técnica",
    tipo: "Sistema de gestão com login",
    objetivo: "Centralizar ordens de serviço, vendas, financeiro e estoque de uma assistência técnica em um só lugar.",
    solucao:
      "Um sistema com login para ordens de serviço, orçamentos, vendas com garantia, contas a receber, clientes e estoque — com um atendente com IA para o WhatsApp.",
    entregas: ["Ordens de serviço", "Orçamentos e vendas", "Contas a receber", "Clientes e estoque", "Atendente com IA"],
    capa: "portfolio/pontobom-capa.webp",
    observacao: "Nomes, contatos e valores foram ocultados nas imagens para proteger os dados do cliente.",
    telasSeparadas: true,
  },
  {
    id: "chapgest",
    cor: "#7c8cff",
    numero: "06",
    nome: "ChapGest 360",
    setor: "Funilaria e pintura automotiva · JC Chapeação, União do Oeste, SC",
    tipo: "Sistema de gestão com login",
    objetivo:
      "Tirar a oficina do caderno e do WhatsApp solto: orçamento com fotos em minutos, pelo celular, e o cliente sabendo em que etapa está o carro sem precisar ligar.",
    solucao:
      "Um sistema feito primeiro para o celular. O chapeador monta o orçamento com fotos, manda pelo WhatsApp e o cliente aprova por um link. Aprovado, vira ordem de serviço com etapas, pagamentos, PDF em A4 e uma página onde o cliente acompanha o carro.",
    entregas: [
      "Orçamento com fotos",
      "Aprovação pelo link",
      "Ordens de serviço por etapa",
      "Acompanhamento do cliente",
      "Seguradora e franquia",
      "PDF A4 e PIX",
      "Indicadores",
      "Modo claro e escuro",
    ],
    capa: "portfolio/chapgest-capa.webp",
    observacao: "Nomes, telefones, placas, chave PIX e valores foram ocultados nas imagens para proteger os dados do cliente.",
    telasSeparadas: true,
  },
  {
    id: "mecgest",
    cor: "#3b82f6",
    numero: "07",
    nome: "MecGest 360",
    setor: "Oficina mecânica · Mecânica Piana",
    tipo: "Sistema de gestão com login",
    objetivo:
      "Organizar a oficina do recebimento do carro à entrega: orçamento pelo WhatsApp, serviço acompanhado por etapa e o cliente lembrado na hora de voltar.",
    solucao:
      "Um sistema em que o mecânico recebe o carro com placa, km e fotos, monta o orçamento e manda pelo WhatsApp com link e PDF. Cada serviço anda por etapas até a entrega, e a tela “Chamar de volta” avisa quais clientes devem retornar, por tempo ou por km. Financeiro, estoque e indicadores ficam no mesmo lugar, com login próprio para cada funcionário.",
    entregas: [
      "Recebimento com fotos",
      "Orçamento pelo WhatsApp",
      "Serviços por etapa",
      "Chamar de volta",
      "Financeiro e estoque",
      "Indicadores",
      "Login por funcionário",
      "Modo claro e escuro",
    ],
    capa: "portfolio/81-mecgest-inicio.webp",
    observacao: "Nomes, placas, telefones, e-mail e documentos foram trocados nas imagens para proteger os dados dos clientes.",
    telasSeparadas: true,
  },
  {
    id: "chiodi",
    cor: "#a855f7",
    numero: "08",
    nome: "The Chiodi Barber",
    setor: "Serviços locais · Coronel Freitas, SC",
    tipo: "Landing page",
    objetivo: "Mostrar que a barbearia fica aberta 24 horas e atende a domicílio, e levar o cliente direto para o WhatsApp.",
    solucao:
      "Uma página única com a cara da barbearia: relógio ao vivo avisando que está aberta, passo a passo do atendimento em casa, lista de serviços que já abre o WhatsApp com o pedido escrito, apresentação do barbeiro, fotos do espaço e mapa com rota.",
    entregas: ["Aberto agora, ao vivo", "Atendimento a domicílio", "Serviços direto no WhatsApp", "Fotos do espaço", "Mapa e rota"],
    capa: "portfolio/97-chiodi-completo.webp",
  },
]

export const diferenciais = [
  {
    titulo: "Design feito para o seu negócio",
    texto: "Nada de modelo pronto com o seu logo por cima. Estrutura, texto e visual partem do que você vende e de quem compra.",
  },
  {
    titulo: "Você fala com quem desenvolve",
    texto: "Sem atendente, sem ticket, sem repasse. Do primeiro contato à publicação, a conversa é comigo.",
  },
  {
    titulo: "Pronto para celular, Google e WhatsApp",
    texto: "Rápido no celular, configurado para aparecer nas buscas e com o contato a um toque de distância.",
  },
  {
    titulo: "Entregue no seu domínio",
    texto: "O site é publicado no seu endereço e o domínio fica registrado no seu nome. É seu de verdade.",
  },
]

/** Clientes atendidos. Para mostrar o logo no lugar do nome, coloque o arquivo em public/clientes/ e preencha `logo`. */
export const clientes: { nome: string; logo?: string }[] = [
  { nome: "Gimo Eletropostos" },
  { nome: "Elbratec EcoCharge" },
  { nome: "Grupo Elbratec" },
  { nome: "PontoBom" },
  { nome: "Barbearia Balen" },
  { nome: "JC Chapeação" },
  { nome: "Mecânica Piana" },
  { nome: "The Chiodi Barber" },
]

/**
 * Depoimentos reais de clientes. A área só aparece no site quando houver pelo menos um.
 * Exemplo:
 * { texto: "O que o cliente disse…", nome: "Nome Sobrenome", empresa: "Empresa" },
 */
export const depoimentos: { texto: string; nome: string; empresa: string }[] = []

export const servicos = [
  {
    titulo: "Landing pages",
    texto: "Uma página feita para uma única ação: chamar no WhatsApp, pedir orçamento, se cadastrar. Ideal para campanhas e lançamentos.",
    tag: "Captação",
  },
  {
    titulo: "Sites institucionais",
    texto: "Várias páginas para apresentar a empresa, os serviços e a equipe — com textos que explicam o que você faz em linguagem de cliente.",
    tag: "Presença",
  },
  {
    titulo: "Catálogos",
    texto: "Produtos organizados por linha, com ficha técnica, fotos e botão de contato. Sem carrinho, sem complicação.",
    tag: "Vendas",
  },
  {
    titulo: "Agendamento",
    texto: "Seu cliente escolhe serviço, dia e horário sem precisar te chamar. Bom para barbearias, clínicas, estúdios e consultórios.",
    tag: "Serviços",
  },
  {
    titulo: "Sistemas sob medida",
    texto: "Ordens de serviço, cadastros, painéis com login. Quando planilha e caderno já não dão conta do dia a dia.",
    tag: "Gestão",
  },
  {
    titulo: "Materiais digitais",
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
    titulo: "Estrutura e proposta",
    texto: "Mando as páginas, as seções, o prazo e o valor por escrito. Só começo depois que você aprovar.",
  },
  {
    titulo: "Design e desenvolvimento",
    texto: "Desenho e programo cada parte, revisando com você. Ferramentas de IA aceleram as partes repetitivas — as decisões são minhas.",
  },
  {
    titulo: "Publicação e ajustes",
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
    cta: "Quero uma landing page",
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
    cta: "Quero um site para minha empresa",
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
    cta: "Quero desenvolver um sistema",
    destaque: false,
  },
]

export const perguntas = [
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
    p: "Você usa IA? O site não fica com cara de modelo pronto?",
    r: "Uso ferramentas de IA para acelerar partes repetitivas do código, como qualquer estúdio atual. A estrutura, o texto, as cores e cada detalhe visual são decididos para o seu negócio — dá para ver nos projetos acima que nenhum se parece com o outro.",
  },
  {
    p: "Atende fora de Santa Catarina?",
    r: "Sim. Todo o processo funciona por WhatsApp e videochamada, então atendo qualquer cidade do Brasil.",
  },
]
