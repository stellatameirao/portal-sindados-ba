
const seed = {
  
  org: {
    shortName: 'SINDADOS-BA',
    fullName: 'Sindicato dos Trabalhadores e Trabalhadoras em Empresas e Órgãos Públicos de Processamento de Dados, ' +
      'Serviços de Informática, Tecnologia da Informação e Comunicação do Estado da Bahia',
    phone: '(71) 3032-0229',
    whatsapp: '(71) 99223-0395',
    email: 'sindadosba88@gmail.com',
    address: 'Rua Frederico Simões, 98, Ed. Advanced Trade, Sala 1111 — Caminho das Árvores, Salvador-BA, CEP 41820-774'
  },

  categories: [
    { value: 'all', label: 'Todas as categorias', icon: '🗂️' },
    { value: 'noticias', label: 'Notícias', icon: '📰' },
    { value: 'assembleias', label: 'Assembleias', icon: '📣' },
    { value: 'acordos', label: 'Acordos coletivos', icon: '🤝' },
    { value: 'juridico', label: 'Jurídico', icon: '⚖️' },
    { value: 'eleicoes', label: 'Eleições', icon: '🗳️' },
    { value: 'nacionais', label: 'Notícias nacionais', icon: '🇧🇷' }
  ],

  companies: [
    { value: 'all', label: 'Todas as empresas', icon: '🏢' },
    { value: 'geral', label: 'Geral (toda a categoria)', icon: '👥' },
    { value: 'bbts', label: 'BBTS', icon: '🏢' },
    { value: 'dataprev', label: 'Dataprev', icon: '🏢' },
    { value: 'serpro', label: 'Serpro', icon: '🏢' },
    { value: 'prodeb', label: 'Prodeb', icon: '🏢' },
    { value: 'cogel', label: 'Cogel', icon: '🏢' },
    { value: 'unisys', label: 'Unisys', icon: '🏢' },
    { value: 'tivit', label: 'TIVIT', icon: '🏢' },
    { value: 'pixeon', label: 'Pixeon', icon: '🏢' },
    { value: 'particulares', label: 'Empresas particulares', icon: '🏢' }
  ],

  sortOptions: [
    { value: '-date', label: 'Mais recentes', icon: '🕒' },
    { value: 'date', label: 'Mais antigas', icon: '📜' },
    { value: 'title', label: 'Título (A-Z)', icon: '🔤' }
  ],

  
  news: [
    { id: 1, date: '2026-11-11', category: 'noticias', company: 'geral',
      title: 'Nota da CUT pela proteção de mulheres, jovens e pessoas negras na política',
      summary: 'O sindicato divulga e apoia a nota da central sindical em defesa da participação segura de mulheres, jovens e pessoas negras na vida política.' },
    { id: 2, date: '2026-11-10', category: 'assembleias', company: 'bbts', place: 'Sede do sindicato e transmissão online',
      title: 'SINDADOS-BA convoca Assembleia Deliberativa dos trabalhadores da BBTS',
      summary: 'Trabalhadores da BBTS são convocados para deliberar sobre a proposta apresentada pela empresa na negociação coletiva.' },
    { id: 3, date: '2026-11-06', category: 'assembleias', company: 'tivit', place: 'Online',
      title: 'Trabalhadores da TIVIT são convocados para assembleia sobre reajuste salarial',
      summary: 'A pauta inclui reajuste salarial, manutenção de direitos e representação sindical da categoria.' },
    { id: 4, date: '2026-10-30', category: 'eleicoes', company: 'pixeon',
      title: 'Resultado da eleição da OLT Pixeon 2026/2028',
      summary: 'Confira o resultado da eleição da Organização por Local de Trabalho (OLT) da Pixeon para o mandato 2026/2028.' },
    { id: 5, date: '2026-10-20', category: 'eleicoes', company: 'pixeon',
      title: 'Eleição da OLT Pixeon 2026/2028: calendário e votação',
      summary: 'Veja as datas de inscrição de chapas, votação e apuração da eleição da OLT.' },
    { id: 6, date: '2026-10-15', category: 'acordos', company: 'dataprev',
      title: 'Campanha salarial Dataprev: pauta de reivindicações é entregue',
      summary: 'A pauta aprovada em assembleia foi protocolada junto à empresa e o calendário de negociação será divulgado em breve.' },
    { id: 7, date: '2026-10-08', category: 'acordos', company: 'serpro',
      title: 'Serpro: rodada de negociação do ACT avança em cláusulas sociais',
      summary: 'Representantes dos trabalhadores relatam avanços em cláusulas sociais; os pontos econômicos seguem em discussão.' },
    { id: 8, date: '2026-09-29', category: 'noticias', company: 'prodeb',
      title: 'Prodeb: sindicato cobra recomposição do quadro de pessoal',
      summary: 'O sindicato solicitou reunião com a direção da empresa para tratar da sobrecarga de trabalho nas equipes.' },
    { id: 9, date: '2026-09-18', category: 'juridico', company: 'geral', place: 'Sede do sindicato',
      title: 'Plantão jurídico para associados às quintas-feiras',
      summary: 'Associados podem agendar atendimento com a assessoria jurídica para tirar dúvidas trabalhistas.' },
    { id: 10, date: '2026-09-10', category: 'assembleias', company: 'cogel', place: 'Auditório da empresa',
      title: 'Cogel: assembleia aprova proposta de PLR',
      summary: 'Os trabalhadores aprovaram a proposta de Participação nos Lucros e Resultados após duas rodadas de negociação.' },
    { id: 11, date: '2026-08-28', category: 'juridico', company: 'unisys',
      title: 'Unisys: orientações sobre banco de horas',
      summary: 'A assessoria jurídica esclarece como funciona a compensação de horas prevista no acordo coletivo.' },
    { id: 12, date: '2026-08-12', category: 'nacionais', company: 'geral',
      title: 'Teletrabalho: o que os trabalhadores de TI precisam saber',
      summary: 'Um resumo dos principais pontos sobre jornada, equipamentos e direito à desconexão no trabalho remoto.' },
    { id: 13, date: '2026-08-05', category: 'noticias', company: 'geral',
      title: 'Novos convênios de saúde e educação para associados',
      summary: 'Associados passam a contar com novas parcerias com descontos em saúde, educação e lazer.' },
    { id: 14, date: '2026-07-27', category: 'juridico', company: 'particulares',
      title: 'Convocação de substituídos em processo trabalhista — SKY Service',
      summary: 'Trabalhadores substituídos no processo devem procurar o sindicato com documentos para atualização cadastral.' },
    { id: 15, date: '2026-07-15', category: 'acordos', company: 'bbts',
      title: 'BBTS: acordo coletivo 2026/2027 é assinado',
      summary: 'O acordo garante reajuste, manutenção dos benefícios e novas regras para o trabalho remoto.' },
    { id: 16, date: '2026-06-30', category: 'noticias', company: 'dataprev',
      title: 'Dataprev: sindicato acompanha implantação do novo plano de cargos',
      summary: 'Uma comissão de trabalhadores vai acompanhar o enquadramento e tirar dúvidas da categoria.' },
    { id: 17, date: '2026-06-18', category: 'noticias', company: 'geral', place: 'Online',
      title: 'Curso de formação sindical: inscrições abertas',
      summary: 'Curso gratuito sobre organização no local de trabalho, negociação coletiva e direitos trabalhistas.' },
    { id: 18, date: '2025-10-29', category: 'nacionais', company: 'geral',
      title: 'Quatro milhões de pessoas terão de fazer prova de vida no INSS',
      summary: 'Aposentados e pensionistas devem ficar atentos ao prazo para não ter o benefício suspenso.' }
  ],

  nextSteps: {
    assembleias: ['Confirme sua presença com o delegado sindical', 'Leve documento com foto', 'Acompanhe a transmissão pelas redes do sindicato'],
    acordos: ['Leia a íntegra do acordo na área "Acordos"', 'Tire dúvidas com o delegado sindical', 'Participe das próximas assembleias'],
    juridico: ['Verifique se o seu nome consta na lista', 'Agende atendimento com a assessoria jurídica', 'Separe contracheques e documentos pessoais'],
    eleicoes: ['Confira o calendário eleitoral', 'Verifique se você está apto a votar', 'Vote no dia e horário definidos'],
    default: ['Compartilhe com os colegas de trabalho', 'Associe-se para fortalecer a categoria', 'Acompanhe o sindicato nas redes sociais']
  },

  faq: [
    { title: 'Quem pode se associar ao SINDADOS-BA?',
      content: 'Trabalhadores e trabalhadoras de empresas e órgãos públicos ou privados de processamento de dados, informática, tecnologia da informação e comunicação na Bahia.' },
    { title: 'Como faço para me associar?',
      content: 'Preencha a ficha de filiação nesta página e anexe um comprovante de vínculo (contracheque ou crachá). A equipe do sindicato entrará em contato para confirmar.' },
    { title: 'Quais são os benefícios de ser associado?',
      content: 'Assessoria jurídica, participação nas decisões das assembleias, cursos de formação e acesso aos convênios com descontos em saúde, educação e lazer.' },
    { title: 'Como funciona o atendimento jurídico?',
      content: 'O atendimento é feito mediante agendamento pelos canais de contato. Leve documentos pessoais e, se possível, contracheques do período da dúvida.' },
    { title: 'A denúncia pelo canal "Denuncie!" é sigilosa?',
      content: 'Sim. Você pode enviar de forma anônima. Se informar seu e-mail, ele será usado apenas para retorno sobre a apuração.' },
    { title: 'Como o sindicato trata meus dados pessoais?',
      content: 'Os dados são usados somente para fins sindicais, conforme a LGPD. Dúvidas podem ser enviadas ao encarregado de dados (DPO).' }
  ],

  institutionalTabs: [
    { id: 'sobre', title: 'Sobre',
      content: 'O SINDADOS-BA representa os trabalhadores e trabalhadoras de processamento de dados, informática e TIC da Bahia, em empresas públicas e privadas.',
      items: ['Negociação de acordos coletivos', 'Assessoria jurídica aos associados', 'Formação sindical', 'Convênios e parcerias'] },
    { id: 'diretoria', title: 'Diretoria',
      content: 'A diretoria é eleita pela categoria e organizada em secretarias:',
      items: ['Presidência', 'Secretaria-Geral', 'Secretaria de Finanças', 'Secretaria de Assuntos Jurídicos', 'Secretaria de Comunicação', 'Secretaria de Formação Sindical'] },
    { id: 'convenios', title: 'Convênios',
      content: 'Parceiros com condições especiais para associados (consulte as regras de cada convênio):',
      items: ['Vitalmed', 'Colégio Acadêmico', 'Colégio Nossa Senhora', 'Uptime', 'Ita Sushi', 'Trevi', 'Terraço Natura', 'Restaurante Malagheta'] },
    { id: 'transparencia', title: 'Transparência',
      content: 'Prestação de contas, estatuto e atas ficam disponíveis para consulta dos associados.',
      items: ['Estatuto social', 'Balancetes', 'Atas de assembleias', 'Política de privacidade'] }
  ],

  reportTypes: [
    { value: 'assedio-moral', label: 'Assédio moral', icon: '⚠️' },
    { value: 'assedio-sexual', label: 'Assédio sexual', icon: '🚫' },
    { value: 'acordo', label: 'Descumprimento de acordo', icon: '📄' },
    { value: 'condicoes', label: 'Condições de trabalho', icon: '🏭' },
    { value: 'outro', label: 'Outro', icon: '💬' }
  ]
}

export default seed
