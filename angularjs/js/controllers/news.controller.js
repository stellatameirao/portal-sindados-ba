
(function () {
  'use strict';

  angular
    .module('sindados.controllers')
    .controller('NewsController', NewsController);

  NewsController.$inject = ['$scope', '$window', 'NewsService', 'SavedService', 'ToastService'];

  function NewsController($scope, $window, NewsService, SavedService, ToastService) {
    var DEFAULT_FILTERS = { search: '', category: 'all', company: 'all', sort: '-date' };

    
    $scope.categories = NewsService.getCategories();
    $scope.companies = NewsService.getCompanies();
    $scope.sortOptions = NewsService.getSortOptions();
    $scope.pageSizes = [4, 6, 8];

    $scope.filters = angular.copy(DEFAULT_FILTERS);
    $scope.pager = { page: 1, size: 4 };
    $scope.result = null;     
    $scope.selected = null;   
    $scope.detail = { tabs: [], tabIndex: 0 }; 

    
    $scope.onFilterChange = function () {
      $scope.pager.page = 1;
      refresh();
    };

    
    $scope.onCategorySelect = function (option) {
      $scope.filters.category = option.value;
      $scope.onFilterChange();
      ToastService.info('Categoria: ' + option.label + '.', 2500);
    };

    $scope.onCompanySelect = function (option) {
      $scope.filters.company = option.value;
      $scope.onFilterChange();
      ToastService.info('Empresa: ' + option.label + '.', 2500);
    };

    $scope.onSortSelect = function (option) {
      $scope.filters.sort = option.value;
      $scope.onFilterChange();
    };

    
    $scope.changePage = function (page) {
      $scope.pager.page = page;
      refresh();
    };

    $scope.hasActiveFilters = function () {
      return !angular.equals($scope.filters, DEFAULT_FILTERS);
    };

    $scope.clearFilters = function () {
      $scope.filters = angular.copy(DEFAULT_FILTERS);
      $scope.onFilterChange();
      ToastService.info('Filtros limpos.', 2500);
    };

    $scope.select = function (item) {
      $scope.selected = item;
      $scope.detail.tabs = NewsService.buildDetailTabs(item);
      $scope.detail.tabIndex = 0;
    };

    $scope.isSaved = function (item) {
      return item && SavedService.isSaved(item.id);
    };

    $scope.toggleSaved = function (item) {
      var saved = SavedService.toggle(item.id);
      if (saved) ToastService.success('Notícia salva para ler depois.');
      else ToastService.warning('Notícia removida dos salvos.');
    };

    $scope.share = function (item) {
      var link = $window.location.href.split('#')[0] + '#noticia-' + item.id;
      var clipboard = $window.navigator.clipboard;

      if (clipboard && clipboard.writeText) {
        clipboard.writeText(link).then(function () {
          $scope.$applyAsync(function () { ToastService.success('Link copiado para a área de transferência.'); });
        }, function () {
          $scope.$applyAsync(function () { ToastService.error('Não foi possível copiar o link.'); });
        });
      } else {
        ToastService.error('Seu navegador não permite copiar automaticamente.');
      }
    };

    $scope.categoryOf = function (item) {
      return NewsService.getCategory(item.category);
    };

    $scope.companyOf = function (item) {
      return NewsService.getCompany(item.company);
    };

    
    function refresh() {
      var list = NewsService.query($scope.filters);
      $scope.result = NewsService.paginate(list, $scope.pager.page, $scope.pager.size);
      $scope.pager.page = $scope.result.currentPage;
    }

    
    refresh();
    if ($scope.result.items.length) {
      $scope.select($scope.result.items[0]);
    }
  }
})();
