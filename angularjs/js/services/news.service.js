
(function () {
  'use strict';

  angular
    .module('sindados.services')
    .factory('NewsService', NewsService);

  NewsService.$inject = ['SEED_DATA', '$filter'];

  function NewsService(SEED_DATA, $filter) {
    var news = SEED_DATA.news;

    return {
      getCategories: function () { return angular.copy(SEED_DATA.categories); },
      getCompanies: function () { return angular.copy(SEED_DATA.companies); },
      getSortOptions: function () { return angular.copy(SEED_DATA.sortOptions); },
      getCategory: getCategory,
      getCompany: getCompany,
      query: query,
      paginate: paginate,
      buildDetailTabs: buildDetailTabs
    };

    function findIn(list, value) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].value === value) return list[i];
      }
      return list[0];
    }

    function getCategory(value) {
      return findIn(SEED_DATA.categories, value);
    }

    function getCompany(value) {
      return findIn(SEED_DATA.companies, value);
    }

    /**
     * Filtra e ordena as notícias.
     * @param {{search:string, category:string, company:string, sort:string}} filters
     */
    function query(filters) {
      var term = (filters.search || '').trim().toLowerCase();

      var result = news.filter(function (item) {
        var okCategory = !filters.category || filters.category === 'all' || item.category === filters.category;
        var okCompany = !filters.company || filters.company === 'all' || item.company === filters.company;
        var okTerm = !term ||
          item.title.toLowerCase().indexOf(term) !== -1 ||
          item.summary.toLowerCase().indexOf(term) !== -1;
        return okCategory && okCompany && okTerm;
      });

      return sortBy(result, filters.sort || '-date');
    }

    function sortBy(list, sortKey) {
      var desc = sortKey.charAt(0) === '-';
      var field = desc ? sortKey.slice(1) : sortKey;

      return list.slice().sort(function (a, b) {
        var cmp = String(a[field]).localeCompare(String(b[field]), 'pt-BR');
        return desc ? -cmp : cmp;
      });
    }

    
    function paginate(list, page, pageSize) {
      var totalPages = Math.max(1, Math.ceil(list.length / pageSize));
      var current = Math.min(Math.max(1, page), totalPages);
      var start = (current - 1) * pageSize;

      return {
        items: list.slice(start, start + pageSize),
        totalItems: list.length,
        totalPages: totalPages,
        currentPage: current,
        from: list.length ? start + 1 : 0,
        to: Math.min(start + pageSize, list.length)
      };
    }

    
    function buildDetailTabs(item) {
      var details = [
        'Publicado em: ' + $filter('date')(item.date + 'T12:00:00', 'dd/MM/yyyy'),
        'Categoria: ' + getCategory(item.category).label,
        'Empresa/base: ' + getCompany(item.company).label
      ];
      if (item.place) details.push('Local: ' + item.place);

      return [
        {
          id: 'resumo',
          title: 'Resumo',
          content: item.summary + ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 'detalhes',
          title: 'Detalhes',
          content: 'Informações da publicação:',
          items: details
        },
        {
          id: 'proximos-passos',
          title: 'O que fazer',
          content: 'Próximos passos para o trabalhador:',
          items: SEED_DATA.nextSteps[item.category] || SEED_DATA.nextSteps['default']
        }
      ];
    }
  }
})();
