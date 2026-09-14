// Conteúdo editável da landing page MedSênior.
// Fontes: public2/29.07.26 Tabela medsênior Porto Alegre(atual).pdf e
//         public2/apresentacao-institucional-medsenior-2026 (2.pdf
// Regra da operadora: NUNCA incluir valores em R$ aqui.

import { WHATSAPP_NUMBER } from './whatsapp'

export const CONTATO = {
  whatsapp: WHATSAPP_NUMBER,
  whatsappFormatado: '(51) 99556-7277',
  email: 'atendimento@excellentsaude.com.br',
  endereco: 'Av. Praia de Belas, 1212 – Sala 424 – Menino Deus – Porto Alegre/RS – CEP 90110-000',
  susep: '202083498',
  instagram: 'https://www.instagram.com/excellentsaude/',
  site: 'https://excellentsaude.com.br',
  // Preencher quando o comercial informar. Enquanto vazio, o rodapé usa o registro SUSEP.
  razaoSocial: '',
  cnpj: '',
} as const

// Texto obrigatório exigido pela MedSênior no rodapé de sites de corretores.
export function TEXTO_RESPONSABILIDADE(): string {
  const identificacao =
    CONTATO.razaoSocial && CONTATO.cnpj
      ? `${CONTATO.razaoSocial} — CNPJ ${CONTATO.cnpj}`
      : `Excellent Saúde — Registro SUSEP ${CONTATO.susep}`
  return `O conteúdo deste site é de responsabilidade da ${identificacao} e não possui vínculo com a operadora de saúde.`
}

export const OPERADORA = {
  nome: 'MedSênior',
  ans: '33.561-4',
  redeUrl: 'https://medsenior.com.br/lp/',
  fundacao: 2010,
} as const

export const NUMEROS = [
  { valor: '2010', rotulo: 'Operadora fundada em' },
  { valor: '8', rotulo: 'estados com atendimento' },
  { valor: '45', rotulo: 'unidades próprias' },
  { valor: '+150', rotulo: 'hospitais na rede credenciada*' },
  { valor: '260 mil', rotulo: 'beneficiários' },
  { valor: '5x', rotulo: 'eleito o melhor plano de saúde**' },
] as const

export const NOTAS_NUMEROS = [
  '*Credenciados ao plano Black 5 – ANS 502.795/25-1.',
  '**200 Maiores e Melhores Empresas do ES – IEL.',
] as const

export const DIFERENCIAIS = [
  {
    icone: 'leaf',
    titulo: 'Programa Bem Envelhecer',
    texto: 'Medicina preventiva com acompanhamento integral e personalizado da sua saúde, desde o primeiro dia de plano.',
  },
  {
    icone: 'monitor',
    titulo: 'Central de Inteligência e Monitoramento',
    texto: 'Um enfermeiro gestor do cuidado acompanha seu caso e direciona você para a especialidade certa. Atendimento de segunda a sexta, das 8h às 20h.',
  },
  {
    icone: 'video',
    titulo: 'Pronto Atendimento Virtual 24h',
    texto: 'Teleconsulta por vídeo com triagem de enfermagem e médico que emite receitas e pedidos de exame. Todos os dias, sem sair de casa.',
  },
  {
    icone: 'users',
    titulo: 'Oficinas de Saúde',
    texto: 'Arte Terapia, Educa a Dor, Cabeça Boa, NutriSaber, Tecnologia e Autonomia e Independência, com equipe multidisciplinar.',
  },
  {
    icone: 'building',
    titulo: 'Unidades próprias',
    texto: 'Unidade MedSênior em Porto Alegre e estrutura própria em capitais de 8 estados, com pronto atendimento e especialidades.',
  },
  {
    icone: 'gift',
    titulo: 'Clube de Vantagens',
    texto: 'Descontos e benefícios exclusivos para beneficiários, como mais um cuidado do seu plano de saúde.',
  },
] as const

export type Plano = {
  id: string
  nome: string
  registroAns: string
  acomodacao: 'Enfermaria' | 'Apartamento'
  abrangencia: string
  abrangenciaDetalhe: string
  segmentacao: string
  coparticipacao: boolean
  destaque?: string
  descricao: string
  beneficios: string[]
}

export const PLANOS: Plano[] = [
  {
    id: 'adesao-enfermaria-poa',
    nome: 'MedSênior Adesão Enfermaria – POA',
    registroAns: '504.124/25-4',
    acomodacao: 'Enfermaria',
    abrangencia: 'Municipal',
    abrangenciaDetalhe: 'Porto Alegre',
    segmentacao: 'Ambulatorial + Hospitalar (sem obstetrícia)',
    coparticipacao: false,
    descricao: 'O caminho mais acessível para entrar na MedSênior com toda a estrutura de cuidado da operadora.',
    beneficios: [
      'Acomodação em enfermaria',
      'Consultas, exames e internações',
      'Unidade própria em Porto Alegre',
      'Programa Bem Envelhecer incluso',
    ],
  },
  {
    id: 'adesao-apartamento-poa',
    nome: 'MedSênior Adesão Apartamento – POA',
    registroAns: '504.123/25-6',
    acomodacao: 'Apartamento',
    abrangencia: 'Municipal',
    abrangenciaDetalhe: 'Porto Alegre',
    segmentacao: 'Ambulatorial + Hospitalar (sem obstetrícia)',
    coparticipacao: false,
    destaque: 'Mais escolhido',
    descricao: 'Privacidade e conforto em internações, com o mesmo cuidado integral da MedSênior em Porto Alegre.',
    beneficios: [
      'Acomodação em apartamento',
      'Consultas, exames e internações',
      'Unidade própria em Porto Alegre',
      'Programa Bem Envelhecer incluso',
    ],
  },
  {
    id: 'black-adesao-5-poa',
    nome: 'Black Adesão 5 – POA',
    registroAns: '504.127/25-9',
    acomodacao: 'Apartamento',
    abrangencia: 'Grupo de municípios',
    abrangenciaDetalhe: 'Capitais e regiões de RS, SP, RJ, MG, ES, PR, DF e PE',
    segmentacao: 'Ambulatorial + Hospitalar (sem obstetrícia)',
    coparticipacao: false,
    descricao: 'Para quem viaja ou tem família em outros estados: rede ampliada com hospitais de referência em 8 estados.',
    beneficios: [
      'Acomodação em apartamento',
      'Rede ampliada em 8 estados',
      'Hospitais de referência credenciados',
      'Procedimentos de alta complexidade',
    ],
  },
  {
    id: 'infinite-adesao-poa',
    nome: 'Infinite Adesão – POA',
    registroAns: '504.222/25-4',
    acomodacao: 'Apartamento',
    abrangencia: 'Grupo de municípios',
    abrangenciaDetalhe: 'Capitais e regiões de RS, SP, RJ, MG, ES, PR, DF e PE',
    segmentacao: 'Ambulatorial + Hospitalar (sem obstetrícia)',
    coparticipacao: false,
    destaque: 'Mais completo',
    descricao: 'O plano mais completo da MedSênior: rede premium, máximo conforto e atendimento altamente personalizado.',
    beneficios: [
      'Acomodação em apartamento',
      'Rede hospitalar premium em 8 estados',
      'Atendimento altamente personalizado',
      'Máximo conforto e exclusividade',
    ],
  },
]

export const FAIXAS_ETARIAS = ['44 a 48 anos', '49 a 53 anos', '54 a 58 anos', '59 anos ou mais'] as const

export const ELEGIBILIDADE = {
  assena: {
    sigla: 'ASSENA',
    titulo: 'Servidores públicos',
    subtitulo: 'Estaduais e federais',
    documentos: ['Holerite atualizado', 'Nomeação de cargo público', 'Ficha associativa'],
    observacao: 'Taxa associativa simbólica.',
  },
  arpl: {
    sigla: 'ARPL',
    titulo: 'Profissionais liberais com diploma',
    subtitulo: 'Associação Representativa de Profissionais Liberais',
    documentos: ['Diploma', 'Ficha associativa', 'Carteira do conselho profissional'],
    profissoes: [
      'Administrador', 'Advogado', 'Agrônomo', 'Analista de Sistemas', 'Arquiteto', 'Assistente Social',
      'Atuário', 'Bacharel em Ciência da Computação', 'Bacharel em Comércio Exterior',
      'Bacharel em Comunicação Social', 'Bacharel em Gastronomia', 'Bacharel em Gestão Financeira',
      'Bacharel em Hotelaria', 'Bacharel em Recursos Humanos', 'Biólogo', 'Biomédico', 'Contabilista',
      'Corretor de Imóveis', 'Corretor de Seguros', 'Dentista', 'Designer (Gráfico, Moda e Interiores)',
      'Despachante', 'Economista', 'Educador Físico', 'Enfermeiro', 'Engenheiro', 'Farmacêutico',
      'Físico', 'Fisioterapeuta', 'Fonoaudiólogo', 'Jornalista', 'Marqueteiro', 'Matemático', 'Médico',
      'Nutricionista', 'Pedagogo', 'Professor', 'Psicólogo', 'Publicitário',
      'Tecnólogo da Informação', 'Veterinário',
    ],
  },
  dependentes: [
    'Cônjuge ou companheiro(a)',
    'Pai e mãe',
    'Padrasto e madrasta',
    'Sogro e sogra',
    'Avô e avó',
    'Bisavô e bisavá',
    'Tio e tia',
  ],
  documentosTitular: [
    'Documento de elegibilidade (funcional ou da entidade de classe)',
    'RG e CPF',
    'Comprovante de residência (água, luz ou telefone)',
    'Cartão SUS',
    'Selfie segurando o documento de identificação',
  ],
} as const

export const PASSOS = [
  {
    titulo: 'Fale com um consultor',
    texto: 'Chame no WhatsApp. Em poucos minutos você recebe a cotação por faixa etária e tira todas as dúvidas, sem compromisso.',
  },
  {
    titulo: 'Envie os documentos',
    texto: 'RG, CPF, comprovante de residência, cartão SUS, selfie com documento e comprovante de elegibilidade. A entrevista médica da MedSênior é feita online.',
  },
  {
    titulo: 'Escolha a vigência e use',
    texto: 'Vigências nos dias 1, 5, 10 ou 15. Depois é só receber a carteirinha e começar a cuidar da saúde.',
  },
] as const

export const CARENCIAS = [
  { procedimento: 'Urgência, emergência e acidente pessoal', semPlano: '24 horas', comPlano: '24 horas' },
  { procedimento: 'Consultas médicas', semPlano: '30 dias', comPlano: '24 horas' },
  { procedimento: 'Exames simples (raio-x, laboratório, eletrocardiograma)', semPlano: '30 dias', comPlano: '24 horas' },
  { procedimento: 'Exames e procedimentos complexos I', semPlano: '90 dias', comPlano: '24 horas' },
  { procedimento: 'Exames e procedimentos complexos II', semPlano: '120 dias', comPlano: '24 horas' },
  { procedimento: 'Exames especiais (ressonância, tomografia, quimioterapia)', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Fisioterapia', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Alta complexidade', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Saúde mental ambulatorial', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Internações clínicas, cirúrgicas e UTI', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Internações psiquiátricas', semPlano: '180 dias', comPlano: '24 horas' },
  { procedimento: 'Doenças ou lesões preexistentes (CPT)', semPlano: '24 meses', comPlano: '24 meses' },
] as const

export const NOTA_CARENCIAS =
  'Redução de carência para quem tem no mínimo 6 meses em plano anterior de qualquer operadora com registro ativo na ANS (exceto planos exclusivamente ambulatoriais). Documentação: cópia da carteirinha com data de início e comprovante das 3 últimas mensalidades pagas ou carta de permanência. Entrevista médica obrigatória para todos os beneficiários. Prevalecem as condições do contrato de adesão.'

export const AREA_COMERCIALIZACAO = {
  municipal: {
    planos: 'Adesão Enfermaria e Adesão Apartamento',
    area: 'Porto Alegre – RS',
  },
  nacional: {
    planos: 'Black Adesão 5 e Infinite Adesão',
    area: [
      'RS: Porto Alegre',
      'SP: São Paulo, Campinas, Guarulhos, Osasco, Santo André, São Bernardo do Campo, São Caetano do Sul, Indaiatuba',
      'RJ: Rio de Janeiro, Niterói, Duque de Caxias',
      'MG: Belo Horizonte, Betim, Contagem',
      'ES: Vitória, Vila Velha, Serra, Cariacica',
      'PR: Curitiba, São José dos Pinhais, Campo Largo',
      'DF: Brasília',
      'PE: Recife',
    ],
  },
} as const

export const FAQ = [
  {
    pergunta: 'A partir de qual idade posso contratar?',
    resposta: 'Os planos MedSênior por adesão em Porto Alegre são para pessoas a partir de 44 anos. Não há idade máxima para entrar.',
  },
  {
    pergunta: 'Os planos têm coparticipação?',
    resposta: 'Não. Todos os quatro planos apresentados nesta página são sem coparticipação: você não paga por consulta ou exame realizado.',
  },
  {
    pergunta: 'Quanto custa o plano?',
    resposta: 'O valor depende do plano e da faixa etária (44 a 48, 49 a 53, 54 a 58 e 59 anos ou mais). Chame no WhatsApp e receba a cotação atualizada em minutos, sem compromisso.',
  },
  {
    pergunta: 'Como funciona a carência?',
    resposta: 'Urgência e emergência em 24 horas; consultas e exames simples em 30 dias; internações em 180 dias. Quem já tem plano há pelo menos 6 meses pode reduzir quase todas as carências para 24 horas.',
  },
  {
    pergunta: 'Quando acontece o reajuste?',
    resposta: 'O reajuste anual dos planos por adesão acontece em janeiro, além da mudança de faixa etária prevista em contrato.',
  },
  {
    pergunta: 'Quais documentos preciso enviar?',
    resposta: 'RG, CPF, comprovante de residência, cartão SUS, selfie segurando o documento e o comprovante de elegibilidade (holerite e nomeação para servidores; diploma e carteira do conselho para profissionais liberais).',
  },
  {
    pergunta: 'Posso incluir dependentes?',
    resposta: 'Sim: cônjuge ou companheiro(a), pais, padrasto e madrasta, sogros, avós, bisavós e tios, todos com a partir de 44 anos e com entrevista médica.',
  },
  {
    pergunta: 'Onde posso usar o plano?',
    resposta: 'Os planos Adesão Enfermaria e Apartamento atendem em Porto Alegre. Black Adesão 5 e Infinite Adesão têm rede em capitais e regiões de RS, SP, RJ, MG, ES, PR, DF e PE. Urgência e emergência são cobertas conforme a regulamentação da ANS.',
  },
] as const

export const RAZOES_EXCELLENT = [
  {
    titulo: 'Sem custo adicional',
    texto: 'A consultoria da Excellent não muda o valor do plano. Você paga o mesmo que pagaria direto na operadora, com um especialista ao seu lado.',
  },
  {
    titulo: 'Consultor local, em Porto Alegre',
    texto: 'Atendimento humano, por WhatsApp ou presencial, com quem conhece a rede e as regras da MedSênior no RS.',
  },
  {
    titulo: 'Corretora registrada na SUSEP',
    texto: `Registro SUSEP ${CONTATO.susep}. Atuamos com ética, transparência e foco no bem-estar dos nossos clientes.`,
  },
  {
    titulo: 'Acompanhamento depois da adesão',
    texto: 'Carteirinha, reajustes, inclusão de dependentes, dúvidas sobre rede: seguimos com você durante toda a vigência.',
  },
] as const
