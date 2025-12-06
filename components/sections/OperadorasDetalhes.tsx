'use client'

import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiCheck, FiArrowRight } from 'react-icons/fi'

interface Operadora {
  nome: string
  descricao: string
  descricaoEmpresarial: string
  modalidades: {
    titulo: string
    descricao: string
    planos?: string[]
  }[]
  vantagens?: string[]
  beneficios?: string[]
}

const operadoras: Operadora[] = [
  {
    nome: 'Bradesco Saúde',
    descricao: 'O Bradesco Saúde oferece os planos certos para sua empresa. O plano de saúde Bradesco é perfeito para quem deseja um atendimento de qualidade para valorizar os colaboradores, pois entendem que qualidade de vida é, além de essencial para o dia a dia, uma forma de valorizar o bem maior da empresa. Os planos empresariais podem ser contratados por CNPJ através de pessoas jurídicas ou empresários individuais (MEI), disponibilizados para os colaboradores com vínculo empregatício ou estatutário com os contratantes.',
    descricaoEmpresarial: 'Com o melhor atendimento e os mais completos serviços, os planos do Bradesco Saúde proporcionam a proteção e a tranquilidade que você deseja. O plano de saúde Bradesco empresarial oferece uma ampla rede de consultórios, clínicas, laboratórios e hospitais, além de possibilitar o reembolso das despesas médicas e hospitalares realizadas por prestadores de sua livre escolha. São diversas modalidades de planos de saúde para que você escolha o que mais encaixa com a sua necessidade. Com o plano de saúde Bradesco você encontra ampla rede referenciada com consultórios, clínicas, hospitais e muito mais em todas as regiões do Brasil. Além disso, há a opção de reembolso com pagamento de despesas realizadas fora da área credenciada, conforme as condições contratuais.',
    modalidades: [
      {
        titulo: 'Planos Empresariais',
        descricao: 'Os planos empresariais podem ser contratados por CNPJ através de pessoas jurídicas ou empresários individuais (MEI), disponibilizados para os colaboradores com vínculo empregatício ou estatutário.',
      },
      {
        titulo: 'Coletivos por Adesão',
        descricao: 'Na modalidade coletivos por adesão, os planos podem ser contratados por pessoas jurídicas de caráter profissional, classista ou setorial. Por exemplo, sindicatos ou cooperativas para disponibilização às pessoas físicas que mantenham vínculos com estes contratantes nos termos específicos da regulamentação da ANS.',
      },
      {
        titulo: 'Planos para grupos de 3 a 199 pessoas (SPG)',
        descricao: 'São diversas modalidades de planos com atendimento em todas as regiões do Brasil. Ideal para pequenas e médias empresas.',
        planos: [
          'SPG Plano Premium',
          'SPG Plano Nacional Plus',
          'SPG Plano Nacional',
          'SPG Plano Nacional Flex',
          'SPG Plano Efetivo',
          'SPG Saúde+',
        ],
      },
      {
        titulo: 'Planos para grupos a partir de 200 pessoas (Empresarial)',
        descricao: 'Opções de planos que possuem ampla rede credenciada de hospitais, clínicas e médicos por todo o país. Ideal para grandes empresas.',
        planos: [
          'Empresarial Plano Premium',
          'Empresarial Plano Nacional Plus',
          'Empresarial Plano Nacional',
          'Empresarial Plano Ideal',
          'Empresarial Plano Nacional Flex',
          'Empresarial Plano Efetivo',
          'Empresarial Saúde+',
        ],
      },
    ],
    vantagens: [
      'Descontos de até 85% em medicamentos de marca e genéricos',
      'Descontos de até 20% em academias',
      'Descontos em diversas lojas e sites através do Clube+Saúde como Casas Bahia, Shopee, KaBum, LG, iPlace, Motorola, O Boticário, Natura, Suvinil, Movida, Localiza, McDonald\'s e muito mais!',
      'Ampla rede referenciada em todas as regiões do Brasil',
      'Opção de reembolso para despesas realizadas fora da rede credenciada',
    ],
  },
  {
    nome: 'Amil',
    descricao: 'A Amil tem o plano de saúde certo para você viver o seu melhor. São diversas opções para você escolher a que melhor se enquadra na sua necessidade. Os planos de saúde Amil possuem ampla cobertura regional ou nacional, sendo ideal para você viver sem preocupações.',
    descricaoEmpresarial: 'Com modalidade de planos para pessoa física e empresariais, com a Amil os beneficiários garantem ampla cobertura nos melhores hospitais e clínicas, descontos exclusivos em farmácias, telemedicina Amil para atendimento médico online, urgências e agendamento de consultas, além do Programa de Saúde Mental Amil.',
    modalidades: [
      {
        titulo: 'Amil Fácil: S80 SC',
        descricao: 'A modalidade Amil Fácil foi desenvolvida em cima dos conceitos de simplicidade e eficiência, oferecendo planos com coberturas regionais e um excelente custo-benefício. O Plano S80 SC é exclusivo para Santa Catarina e oferece extensa assistência para 24 municípios de Santa Catarina, rede com hospitais certificados, com coparticipação, acomodação coletivo e privativo, urgência e emergência nacional (por 12 meses), telemedicina Amil, Amil Ligue Saúde, carteirinha virtual no app Amil Clientes, preços acessíveis e disponível contratação de Assistência Viagem Internacional.',
        planos: [
          'Plano com extensa assistência para 24 municípios de Santa Catarina',
          'Rede com hospitais certificados',
          'Com coparticipação',
          'Acomodação coletivo e privativo',
          'Urgência e Emergência Nacional (por 12 meses)',
          'Telemedicina Amil',
          'Amil Ligue Saúde',
          'Carteirinha virtual no app Amil Clientes',
          'Preços acessíveis',
          'Disponível Contratação de Assistência Viagem Internacional',
        ],
      },
      {
        titulo: 'Amil S380',
        descricao: 'O plano de saúde S380 é ideal para quem deseja cobertura nacional e hospitais de referência para atendimento. Além de reembolso, possui também descontos em farmácias e telemedicina.',
        planos: [
          'Cobertura nacional',
          'Hospitais e clínicas de referência',
          'Atendimento no Hospital Mãe de Deus em Porto Alegre e SOS Cardio em Florianópolis',
          'Ambulatório de hospitais de referência em SP, PR, SC, RS, MG, BA, PE, CE, RN, MA e PB',
          'Com coparticipação total ou parcial (PME)',
          'Coparticipação customizável nos contratos acima de 100 vidas (PJ)',
          'Reembolso',
          'Telemedicina Amil',
          'Amil Ligue Saúde',
          'Descontos exclusivos em farmácias',
          'Transplantes adicionais',
          'Disponível contratação de Amil Resgate',
          'Disponível contratação de Assistência Viagem Internacional',
          'Disponível contratação de Resgate Domiciliar',
        ],
      },
      {
        titulo: 'Amil S540',
        descricao: 'Com atendimento no Moinhos de Vento no Rio Grande do Sul, o plano S540 oferece mais qualidade para quem deseja atendimento exclusivo em diversas especialidades médicas.',
        planos: [
          'Cobertura nacional',
          'Hospitais e clínicas de referência',
          'Atendimento no Hospital Moinhos de Vento em Porto Alegre e Hospital Santa Catarina em Blumenau',
          'Ambulatório de hospitais de referência em SP, PR, SC, RS, MG, BA, PE, CE, RN, MA e PB',
          'Com coparticipação total ou parcial (PME)',
          'Coparticipação customizável nos contratos acima de 100 vidas (PJ)',
          'Reembolso',
          'Telemedicina Amil',
          'Amil Ligue Saúde',
          'Descontos exclusivos em farmácias',
          'Transplantes adicionais',
          'Disponível contratação de Amil Resgate',
          'Disponível contratação de Assistência Viagem Internacional',
          'Disponível contratação de Resgate Domiciliar',
        ],
      },
      {
        titulo: 'Amil S750',
        descricao: 'Toda a qualidade dos planos Amil em um sistema de saúde totalmente inovador e flexível com abrangência regional ou nacional. Os planos oferecem opção com coparticipação e reembolso.',
        planos: [
          'Cobertura nacional',
          'Hospitais e clínicas de referência (Hospital Mãe de Deus e Moinhos de Vento em Porto Alegre)',
          'Ambulatório de hospitais de referência em SP, PR, SC, RS, MG, BA, PE, CE, RN, MA e PB',
          'Com coparticipação total ou parcial (PME)',
          'Coparticipação customizável nos contratos acima de 100 vidas (PJ)',
          '03 níveis de reembolso',
          'Telemedicina Amil',
          'Amil Ligue Saúde',
          'Descontos exclusivos em farmácias',
          'Cirurgia oftalmológica refrativa sem limite de grau',
          'Sessões de escleroterapia além do Rol da ANS',
          'Transplantes adicionais',
          'Disponível contratação de Amil Resgate',
          'Disponível contratação de Assistência Viagem Internacional',
          'Disponível contratação de Resgate Domiciliar',
        ],
      },
    ],
    beneficios: [
      'Ampla cobertura nos melhores hospitais e clínicas',
      'Descontos exclusivos em farmácias',
      'Telemedicina Amil: atendimento pelo celular, tablet ou computador para atendimento médico online, urgências e agendamento de consultas em várias especialidades',
      'Programa de Saúde Mental Amil: apoio nas unidades do Amil Espaço Saúde ou via Telemedicina de urgência para casos severos de saúde mental',
    ],
  },
  {
    nome: 'SulAmérica',
    descricao: 'A SulAmérica possui Planos de Saúde pessoais e empresariais para quem busca o melhor em qualidade de atendimento. Com ampla rede credenciada, você ainda conta com descontos e benefícios exclusivos que somente a SulAmérica pode te oferecer.',
    descricaoEmpresarial: 'A SulAmérica possui 120 anos de história, sendo o maior grupo segurador independente do Brasil. Está entre as mais sólidas e de maior credibilidade empresas da área no mercado, possuindo mais de 7 milhões de clientes em Seguros, Planos de Saúde, Previdência e Investimentos. A empresa é amplamente reconhecida no mercado pela excelência em Gestão de Saúde, sempre disponibilizando atendimentos com maior agilidade e transparência. Além disso, possui diversidade de produtos e ferramentas de tecnologia eficientes. Em 2023, os planos da SulAmérica foram eleitos como melhor plano de saúde pelo Experience Awards, superando a concorrência de diversas operadoras do Brasil.',
    modalidades: [
      {
        titulo: 'Plano de Saúde SulAmérica Individual ou Familiar',
        descricao: 'São aqueles contratados diretamente pelo beneficiário, com ou sem seu grupo familiar.',
      },
      {
        titulo: 'Plano de Saúde SulAmérica Empresarial',
        descricao: 'Indivíduo com vínculo a pessoa jurídica por relação empregatícia ou estatutária.',
      },
      {
        titulo: 'Plano de Saúde SulAmérica Coletivo por Adesão',
        descricao: 'Indivíduo com vínculo à pessoa jurídica por relação profissional, classista ou setorial.',
      },
      {
        titulo: 'Plano de Saúde SulAmérica Coletivo Empresarial por Empresário Individual',
        descricao: 'Empresário individual e indivíduos com vínculo a este por relação empregatícia e grupo familiar previsto no inciso VII do art. 5º da RN 195. Somente poderá contratar quando comprovar o exercício profissional da atividade empresarial há pelo menos seis meses. A comprovação do efetivo exercício da atividade empresarial bem como dos requisitos de elegibilidade deverá ser efetuada anualmente, no mês de aniversário do contrato.',
      },
    ],
    beneficios: [
      'Ampla rede credenciada',
      'Descontos e benefícios exclusivos',
      'Excelência em Gestão de Saúde',
      'Atendimentos com maior agilidade e transparência',
      'Diversidade de produtos e ferramentas de tecnologia eficientes',
      'Reconhecimento: Melhor plano de saúde pelo Experience Awards 2023',
      'Mais de 7 milhões de clientes',
      '120 anos de história e credibilidade no mercado',
    ],
  },
  {
    nome: 'MedSênior',
    descricao: 'Contar com plano de saúde para a melhor idade é primordial para seguir na ativa e aproveitar a vida de forma saudável. Diferente dos demais planos de saúde do mercado, a MedSênior possui um cuidado que começa desde a prevenção, com oficinas de saúde e acompanhamento médico periódico para os seus beneficiários. Com o plano de saúde da MedSênior você investe em qualidade de vida no melhor custo-benefício.',
    descricaoEmpresarial: 'A MedSênior é pensada exclusivamente para as pessoas acima de 49 anos e é um plano de saúde que possui um atendimento especializado baseado na Medicina Preventiva que tem como objetivo cuidar da saúde do paciente antes mesmo das doenças aparecerem. Dessa forma, é estimulada a participação ativa na busca de mais qualidade de vida e prevenção. Na MedSênior, a saúde de cada beneficiário é tratada com foco na qualidade de vida. Umas das principais iniciativas são as Oficinas de Saúde que garantem o acompanhamento direto e outras vantagens como higiene mental e prática de atividades físicas.',
    modalidades: [
      {
        titulo: 'Plano MedSênior Essencial',
        descricao: 'Ideal para quem deseja mais qualidade e preços mais acessíveis. O Plano Essencial é na modalidade Enfermaria e possui excelente rede credenciada. Se você busca custo-benefício, esse é o plano certo para você.',
      },
      {
        titulo: 'Plano MedSênior RS3',
        descricao: 'Possui maior rede credenciada mantendo valores acessíveis, podendo escolher também a modalidade de acomodação Enfermaria. O plano RS3 possui ampla cobertura ambulatorial e hospitalar, com os melhores médicos.',
      },
      {
        titulo: 'Plano MedSênior RS4',
        descricao: 'Ideal para quem deseja privacidade na acomodação! O plano RS4 da MedSênior é na modalidade Apartamento e possui ampla rede credenciada nos melhores hospitais e clínicas. O grande diferencial é a acomodação em apartamento para internação, assim você possui recuperação mais tranquila e privativa.',
      },
      {
        titulo: 'Plano MedSênior Black 3',
        descricao: 'É o plano perfeito para quem gosta de altos padrões e atendimento personalizado quando o assunto é cuidar da sua saúde. O plano MedSênior Black 3 é exclusivo e possui uma vasta gama de serviços médicos, procedimentos cirúrgicos complexos e rede credenciada completa de clínicas, laboratórios e hospitais.',
      },
    ],
    beneficios: [
      '35 unidades próprias de atendimento. Em Porto Alegre fica localizada na Av. Cristóvão Colombo, 831, no bairro Floresta',
      'Ampla rede credenciada',
      'Descontos em farmácias (até 50% em genéricos e até 20% em medicamentos de marca)',
      'Oficinas de Saúde',
      'Programa de Medicina Preventiva',
      'Presente em 7 estados brasileiros (RS, PR, MG, SP, RJ, ES e DF)',
      'Não possui coparticipação',
      'Resultados de exames online',
      '92% de satisfação dos beneficiários em pesquisa da ANS',
      'Descontos exclusivos nas farmácias Drogasil, Pacheco, Droga Raia, Drogaria São Paulo e Santa Lúcia (apenas na Grande Vitória) - mais de 1750 lojas espalhadas pelo Brasil',
    ],
  },
  {
    nome: 'Sulmed',
    descricao: 'Há mais de 44 anos a Sulmed ajuda a cuidar da saúde dos colaboradores das empresas gaúchas em diversos municípios do estado. A Sulmed oferece planos de saúde empresariais e atendimento qualificado por um preço justo, ideal para quem deseja o melhor custo-benefício para atendimento em saúde. Uma das vantagens dos planos é a ampla rede credenciada, estando presente também no litoral!',
    descricaoEmpresarial: 'Com os planos da Sulmed você conta com diversos benefícios para aproveitar. Além de toda a qualidade e tradição de uma das melhores operadoras do estado, os beneficiários contam com: cuidado médico personalizado; acesso 24/7 (24h todos os dias da semana); atendimentos presenciais nas redes credenciadas e Teleconsulta; médicos especializados e tratamento multidisciplinar e coordenado.',
    modalidades: [
      {
        titulo: 'Plano Sulmed Open',
        descricao: 'A partir de apenas R$ 55,07 (tabela de valores sujeita a alteração. Dados de 2024 para valores de 0 a 18 anos). Para quem deseja um cuidado permanente de forma mais simples, tendo um atendimento descomplicado e prático para os colaboradores.',
        planos: [
          'Possui cobertura Ambulatorial ou Global',
          'Engloba as principais necessidades de consultas, exames e procedimentos',
          'Beneficiários possuem atendimento de todas especialidades da rede credenciada e sem necessidade de autorização',
          'Excelente cobertura de atendimento para urgências e emergências em todo o Brasil',
        ],
      },
      {
        titulo: 'Plano Sulmed Open+',
        descricao: 'A partir de apenas R$ 121,78 (tabela de valores sujeita a alteração. Dados de 2024 para valores de 0 a 18 anos). Para quem deseja a melhor experiência de atendimento em saúde para cuidar dos colaboradores da empresa.',
        planos: [
          'Possui cobertura Global',
          'Beneficiários possuem atendimento de todas especialidades da rede credenciada e sem necessidade de autorização',
          'Engloba as principais necessidades de consultas, exames e procedimentos',
          'Excelente cobertura de atendimento para urgências e emergências em todo o Brasil',
          'Atendimento no Hospital Mãe de Deus em Porto Alegre',
        ],
      },
      {
        titulo: 'Plano Sulmed Acolle',
        descricao: 'A partir de apenas R$ 39,47 (tabela de valores sujeita a alteração. Dados de 2024 para valores de 0 a 18 anos). Através do projeto Acolle, a Sulmed permite que você tenha serviços de qualidade para seus colaboradores, mas com um preço justo e compatível com sua empresa.',
        planos: [
          'Cobertura Ambulatorial ou Global. Contempla as principais necessidades de consultas, exames e procedimentos',
          'Acesso a todas especialidades da rede credenciada a partir de um primeiro atendimento em uma unidade Sulmed',
          'Cobertura de atendimento para urgências e emergências em Porto Alegre e Região Metropolitana',
        ],
      },
    ],
    beneficios: [
      'Cuidado médico personalizado',
      'Acesso 24/7 (24h todos os dias da semana)',
      'Atendimentos presenciais nas redes credenciadas e Teleconsulta',
      'Médicos especializados e tratamento multidisciplinar e coordenado',
      'Ampla rede credenciada presente em diversas cidades do estado',
      'Presença também no litoral',
      'Mais de 44 anos de tradição e qualidade',
      'Preço justo e melhor custo-benefício',
      'Rede credenciada em: Porto Alegre, Alvorada, Cachoeirinha, Campo Bom, Canoas, Capão da Canoa, Charqueadas, Esteio, Gravataí, Gramado, Guaíba, Novo Hamburgo, Osório, Rio Grande, Santo Antônio da Patrulha, Sapiranga, Sapucaia do Sul, São Jerônimo, São Leopoldo, Tramandaí, Torres e Viamão',
    ],
  },
  {
    nome: 'Onmed',
    descricao: 'Oferecemos planos de saúde empresariais completos, proporcionando tranquilidade e cuidado aos nossos clientes. Nossos serviços abrangem os segmentos ambulatorial e hospitalar e incluem uma ampla gama de exames, desde os mais simples até os mais especializados, terapias e tratamentos ambulatoriais, cobertura abrangente para consultas médicas e opções de internações clínicas ou cirúrgicas.',
    descricaoEmpresarial: 'Todas essas vantagens são fornecidas de acordo com as diretrizes da ANS, garantindo total segurança. E o melhor de tudo: estamos disponíveis 24 horas por dia, prontos para oferecer um atendimento de alta qualidade. Nossa ampla rede credenciada abrange Porto Alegre, a Grande Porto Alegre, o Vale dos Sinos, a Serra e o litoral, assegurando que você tenha acesso aos melhores cuidados de saúde onde quer que esteja. Na Onmed, estamos comprometidos em oferecer os melhores planos de saúde tanto para você quanto para sua empresa.',
    modalidades: [
      {
        titulo: 'Plano SLIM',
        descricao: 'Um plano para aqueles que acreditam que o essencial na vida é desfrutar de saúde de alta qualidade, de forma humanizada, eficiente, simples e moderna. Com uma rede credenciada de qualidade, cobertura ampla e atendimento humanizado, a Onmed garante que você e sua família tenham acesso aos melhores serviços de saúde.',
        planos: [
          'Ampla inclusão de agregados',
          'Cobertura odontológica (opcional)',
          'Limitadores de valor por evento',
        ],
      },
      {
        titulo: 'Plano SELECT',
        descricao: 'Um plano que garante acesso completo à saúde em rede com estrutura inovadora e ampla. Feito para quem quer aproveitar a vida sem preocupações.',
        planos: [
          'Ampla inclusão de agregados',
          'Cobertura odontológica (opcional)',
          'Limitadores de valor por evento',
          'Transporte aeromédico (opcional)',
          'Sem taxa de internação',
        ],
      },
      {
        titulo: 'Plano SELECT - Sem Obstetrícia',
        descricao: 'Um plano formatado na medida para o seu perfil. Cobertura inteligente, eficiente e com o menor custo para você, sua família e seus colaboradores.',
        planos: [
          'Ampla inclusão de agregados',
          'Cobertura odontológica (opcional)',
          'Limitadores de valor por evento',
          'Sem taxa de internação',
          'Transporte aeromédico (opcional)',
        ],
      },
      {
        titulo: 'Plano COMFORT – Com Obstetrícia',
        descricao: 'Uma alternativa equilibrada para quem valoriza conforto e qualidade no cuidado com a saúde. Com ampla rede credenciada e atendimento humanizado, é ideal para quem busca bem-estar em todas as etapas da vida.',
        planos: [
          'Ampla inclusão de agregados',
          'Cobertura odontológica (opcional)',
          'Limitadores de valor por evento',
          'Maior rede de atendimento',
          'Sem taxa de internação',
          'Transporte aeromédico (opcional)',
        ],
      },
      {
        titulo: 'Plano COMFORT – Sem Obstetrícia',
        descricao: 'Solução inteligente para quem deseja um plano completo, com atendimento eficiente e infraestrutura de excelência. Perfeito para empresas e famílias que valorizam cuidado, economia e praticidade no dia a dia.',
        planos: [
          'Ampla inclusão de agregados',
          'Cobertura odontológica (opcional)',
          'Limitadores de valor por evento',
          'Maior rede de atendimento',
          'Sem taxa de internação',
          'Transporte aeromédico (opcional)',
        ],
      },
      {
        titulo: 'Plano Odonto',
        descricao: 'Na Onmed Saúde, sabemos que seu sorriso é uma parte fundamental da sua saúde e bem-estar. Apresentamos com orgulho o nosso Plano Odonto, uma solução abrangente e acessível para garantir que seu sorriso brilhe com saúde e confiança.',
        planos: [
          'Acesso a uma ampla gama de tratamentos odontológicos',
          'Consultas de rotina',
          'Procedimentos especializados',
          'Grande cobertura para manter seu sorriso saudável',
        ],
      },
    ],
    beneficios: [
      'Planos de saúde empresariais completos',
      'Cobertura ambulatorial e hospitalar',
      'Ampla gama de exames (simples e especializados)',
      'Terapias e tratamentos ambulatoriais',
      'Cobertura abrangente para consultas médicas',
      'Opções de internações clínicas ou cirúrgicas',
      'Conformidade com diretrizes da ANS',
      'Atendimento 24 horas por dia',
      'Ampla rede credenciada em Porto Alegre, Grande Porto Alegre, Vale dos Sinos, Serra e litoral',
      'Atendimento humanizado e de alta qualidade',
    ],
  },
  {
    nome: 'Doctor Clin',
    descricao: 'A Doctor Clin é uma Operadora de Planos de Saúde, registrada na ANS - Agência Nacional de Saúde sob o 34.968-2. Iniciou suas atividades em 1º de junho de 1996, na cidade de Porto Alegre (RS). Atualmente é responsável pela gestão dos planos de saúde de mais de 150 mil clientes.',
    descricaoEmpresarial: 'Possui 20 unidades ambulatoriais e um hospital próprios, ampla rede credenciada com as principais instituições de saúde de Porto Alegre, região metropolitana, Litoral Sul e Norte, com livre acesso a mais de 220 profissionais de odontologia e 700 colaboradores.',
    modalidades: [
      {
        titulo: 'Plano Bem',
        descricao: 'Um plano acessível para ficar de bem com a vida. Ter uma vida saudável ficou mais simples e prático. Conheça o Bem, o Plano de Saúde da rede própria Doctor Clin, com cobertura ambulatorial e hospitalar e excelente custo-benefício.',
        planos: [
          '20 unidades próprias, diversos exames e especialidades e acesso a mais de 400 médicos',
          'Plano de odontologia incluso',
          'Acesso direto à rede Própria e Bem para consultas médicas eletivas e exames',
          'Acesso direto a 16 postos de coleta do Laboratório Qualitá',
          'Hospitais de referência e consultas online na palma da sua mão (DoctorClin On)',
          'Pronto Atendimento nas clínicas Doctor Clin e no Hospital Doctor Clin Porto Alegre',
        ],
      },
      {
        titulo: 'Plano Flex',
        descricao: 'O plano de saúde que une inteligência, facilidade e flexibilidade. Se você busca facilidade, o Plano Doctor Clin Flex é o ideal. Com ele, você pode agendar consultas diretamente com os especialistas onde deseja ser atendido, conforme a rede credenciada.',
        planos: [
          'Pronto atendimento na rede própria Doctor Clin. Fora do horário de funcionamento e nas demais cidades, consulte rede credenciada conforme o Guia de Saúde',
          'Cobertura odontológica inclusa em planos familiares. Para as empresas, opção da versão Light, sem cobertura odontológica',
          'Livre acesso na rede Própria e Flex para consultas médicas eletivas',
          'Acesso direto a laboratórios de análises clínicas',
          'Opcional: acesso à rede Max para consultas médicas eletivas, mediante coparticipação de valor diferenciado',
          'Planos empresariais hospitalares que garantem mais conforto e privacidade, com acomodações individuais em caso de internação (Plano Privativo)',
        ],
      },
      {
        titulo: 'Plano Max',
        descricao: 'Feito para quem busca mais bem-estar e tranquilidade. Quer um plano superior com serviços exclusivos? Então, escolha o Plano Doctor Clin Max. Com ele, você tem mais liberdade e amplo acesso a médicos, consultórios, laboratórios e clínicas credenciadas em nossa rede.',
        planos: [
          'Acesso direto aos consultórios, clínicas de diagnósticos, fisioterapias, ecografias, raio-x, mamografias, entre outros',
          'Planos empresariais com ou sem odontologia, para atender às necessidades dos seus colaboradores',
          'Acesso à telemedicina (DoctorClin On) - consultas online na palma da sua mão',
          'Serviços exclusivos como Hospital Mãe de Deus e Laboratório Weinmann',
          'Opções de planos hospitalares com acomodação individual nas internações, para quem valoriza privacidade em cada detalhe (Planos Privativos)',
          'Pronto atendimento na rede própria e credenciada, garantindo liberdade de escolha sem abrir mão da qualidade',
        ],
      },
      {
        titulo: 'Plano Odonto',
        descricao: 'Um plano odontológico sob medida para a sua empresa. Cuidados completos para o sorriso da sua equipe, com flexibilidade e praticidade.',
        planos: [
          'Mais de 220 profissionais - facilidade no acesso às especialidades em nossa ampla rede de serviços credenciados',
          'Consultas, exames e procedimentos - agendamento direto no consultório, para agilizar o cuidado com o seu sorriso',
          'Unidade Móvel de Atendimento - um consultório completo e climatizado vai até a sua empresa, facilitando o cuidado com o sorriso dos seus funcionários',
          'Excelente relação custo/benefício - o cuidado que você merece, pelo valor que você espera',
          'Guia Odontológico - encontre facilmente os dentistas em nosso Guia Odontológico',
          'Cuidado perto de você - profissionais disponíveis em várias cidades do estado',
        ],
      },
    ],
    beneficios: [
      'Mais de 150 mil clientes',
      '20 unidades ambulatoriais próprias',
      '1 hospital próprio',
      'Ampla rede credenciada em Porto Alegre, região metropolitana, Litoral Sul e Norte',
      'Mais de 220 profissionais de odontologia',
      'Mais de 700 colaboradores',
      'Mais de 400 médicos na rede',
      '16 postos de coleta do Laboratório Qualitá',
      'Telemedicina (DoctorClin On)',
      'Hospitais de referência',
      'Registrada na ANS sob o 34.968-2',
      'Atuando desde 1996',
    ],
  },
]

export default function OperadorasDetalhes() {
  const [operadoraSelecionada, setOperadoraSelecionada] = useState<string | null>(null)

  const toggleOperadora = (nome: string) => {
    setOperadoraSelecionada(operadoraSelecionada === nome ? null : nome)
  }

  return (
    <section id="operadoras-detalhes" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-excellent-navy-900 mb-4">
            Conheça Nossas <span className="text-excellent-green-500">Operadoras Parceiras</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos com as principais operadoras do mercado para oferecer as melhores soluções em planos de saúde
          </p>
        </div>

        <div className="space-y-4 max-w-5xl mx-auto">
          {operadoras.map((operadora, index) => {
            const isOpen = operadoraSelecionada === operadora.nome
            const isBradesco = operadora.nome === 'Bradesco Saúde'
            const isAmil = operadora.nome === 'Amil'
            const isSulAmerica = operadora.nome === 'SulAmérica'
            const isMedSenior = operadora.nome === 'MedSênior'
            const isSulmed = operadora.nome === 'Sulmed'
            const isOnmed = operadora.nome === 'Onmed'
            const isDoctorClin = operadora.nome === 'Doctor Clin'
            const headerColor = isBradesco ? 'bg-[#CC092F]' : isAmil ? 'bg-[#461BFF]' : isSulAmerica ? 'bg-[#FF6600]' : isMedSenior ? 'bg-[#00A859]' : isSulmed ? 'bg-[#003366]' : isOnmed ? 'bg-[#0099FF]' : isDoctorClin ? 'bg-[#388E3C]' : 'bg-excellent-navy-900'
            const titleColor = isBradesco ? 'text-[#CC092F]' : isAmil ? 'text-[#461BFF]' : isSulAmerica ? 'text-[#FF6600]' : isMedSenior ? 'text-[#00A859]' : isSulmed ? 'text-[#003366]' : isOnmed ? 'text-[#0099FF]' : isDoctorClin ? 'text-[#388E3C]' : 'text-excellent-navy-900'
            const accentColor = isBradesco ? 'text-[#CC092F]' : isAmil ? 'text-[#461BFF]' : isSulAmerica ? 'text-[#FF6600]' : isMedSenior ? 'text-[#00A859]' : isSulmed ? 'text-[#003366]' : isOnmed ? 'text-[#0099FF]' : isDoctorClin ? 'text-[#388E3C]' : 'text-excellent-green-500'
            const borderHover = isBradesco ? 'hover:border-[#CC092F]' : isAmil ? 'hover:border-[#461BFF]' : isSulAmerica ? 'hover:border-[#FF6600]' : isMedSenior ? 'hover:border-[#00A859]' : isSulmed ? 'hover:border-[#003366]' : isOnmed ? 'hover:border-[#0099FF]' : isDoctorClin ? 'hover:border-[#388E3C]' : 'hover:border-excellent-green-500'
            const buttonColor = isBradesco ? 'bg-[#CC092F] hover:bg-[#B0082A]' : isAmil ? 'bg-[#461BFF] hover:bg-[#3D18E6]' : isSulAmerica ? 'bg-[#FF6600] hover:bg-[#E55A00]' : isMedSenior ? 'bg-[#00A859] hover:bg-[#008F4D]' : isSulmed ? 'bg-[#003366] hover:bg-[#002244]' : isOnmed ? 'bg-[#0099FF] hover:bg-[#0088E6]' : isDoctorClin ? 'bg-[#388E3C] hover:bg-[#2E7D32]' : 'btn-primary'
            const hasColoredHeader = isBradesco || isAmil || isSulAmerica || isMedSenior || isSulmed || isOnmed || isDoctorClin

            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200 ${borderHover} transition-all duration-300`}
              >
                {/* Header - Clickable */}
                <button
                  onClick={() => toggleOperadora(operadora.nome)}
                  className={`w-full px-8 py-6 flex items-center justify-between text-left transition-colors ${hasColoredHeader ? `${headerColor} text-white hover:opacity-90` : 'hover:bg-gray-50'}`}
                >
                  <h3 className={`text-2xl font-bold ${hasColoredHeader ? 'text-white' : 'text-excellent-navy-900'}`}>{operadora.nome}</h3>
                  {isOpen ? (
                    <FiChevronUp className={hasColoredHeader ? 'text-white' : accentColor} size={24} />
                  ) : (
                    <FiChevronDown className={hasColoredHeader ? 'text-white' : accentColor} size={24} />
                  )}
                </button>

                {/* Content - Expandable */}
                {isOpen && (
                  <div className="px-8 pb-8 border-t border-gray-200">
                    <div className="pt-6 space-y-6">
                      {/* Descrição Principal */}
                      <div>
                        <p className="text-gray-700 leading-relaxed mb-4">{operadora.descricao}</p>
                        <p className="text-gray-700 leading-relaxed">{operadora.descricaoEmpresarial}</p>
                      </div>

                      {/* Modalidades */}
                      {operadora.modalidades && operadora.modalidades.length > 0 && (
                        <div>
                          <h4 className={`text-xl font-bold ${titleColor} mb-4`}>Modalidades de Planos</h4>
                          <div className="space-y-4">
                            {operadora.modalidades.map((modalidade, idx) => (
                              <div key={idx} className="bg-gray-50 rounded-lg p-5">
                                <h5 className={`font-semibold ${titleColor} mb-2`}>{modalidade.titulo}</h5>
                                <p className="text-gray-600 mb-3">{modalidade.descricao}</p>
                                {modalidade.planos && modalidade.planos.length > 0 && (
                                  <ul className="space-y-2">
                                    {modalidade.planos.map((plano, pIdx) => (
                                      <li key={pIdx} className="flex items-start space-x-2">
                                        <FiCheck className={`${isBradesco ? 'text-[#CC092F]' : isAmil ? 'text-[#461BFF]' : isSulAmerica ? 'text-[#FF6600]' : isMedSenior ? 'text-[#00A859]' : isSulmed ? 'text-[#003366]' : isOnmed ? 'text-[#0099FF]' : isDoctorClin ? 'text-[#388E3C]' : 'text-excellent-green-500'} mt-1 flex-shrink-0`} size={18} />
                                        <span className="text-gray-700">{plano}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Vantagens */}
                      {operadora.vantagens && operadora.vantagens.length > 0 && (
                        <div>
                          <h4 className={`text-xl font-bold ${titleColor} mb-4`}>Vantagens e Benefícios</h4>
                          <ul className="space-y-2">
                            {operadora.vantagens.map((vantagem, vIdx) => (
                              <li key={vIdx} className="flex items-start space-x-2">
                                        <FiCheck className={`${isBradesco ? 'text-[#CC092F]' : isAmil ? 'text-[#461BFF]' : isSulAmerica ? 'text-[#FF6600]' : isMedSenior ? 'text-[#00A859]' : isSulmed ? 'text-[#003366]' : isOnmed ? 'text-[#0099FF]' : isDoctorClin ? 'text-[#388E3C]' : 'text-excellent-green-500'} mt-1 flex-shrink-0`} size={18} />
                                <span className="text-gray-700">{vantagem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Benefícios */}
                      {operadora.beneficios && operadora.beneficios.length > 0 && (
                        <div>
                          <h4 className={`text-xl font-bold ${titleColor} mb-4`}>Benefícios Inclusos</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {operadora.beneficios.map((beneficio, bIdx) => (
                              <div key={bIdx} className="flex items-start space-x-2">
                                        <FiCheck className={`${isBradesco ? 'text-[#CC092F]' : isAmil ? 'text-[#461BFF]' : isSulAmerica ? 'text-[#FF6600]' : isMedSenior ? 'text-[#00A859]' : isSulmed ? 'text-[#003366]' : isOnmed ? 'text-[#0099FF]' : isDoctorClin ? 'text-[#388E3C]' : 'text-excellent-green-500'} mt-1 flex-shrink-0`} size={18} />
                                <span className="text-gray-700">{beneficio}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-4 border-t border-gray-200">
                        <a
                          href="#cotacao"
                          className={`${buttonColor} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center space-x-2`}
                        >
                          <span>Solicitar Cotação {operadora.nome}</span>
                          <FiArrowRight />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA Final */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Não encontrou o que procura? Entre em contato e nossa equipe encontrará a melhor solução para você.
          </p>
          <a href="#cotacao" className="btn-secondary inline-flex items-center space-x-2">
            <span>Solicitar Cotação Personalizada</span>
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}

