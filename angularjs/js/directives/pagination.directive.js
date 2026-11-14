
(function () {
  'use strict';

  angular
    .module('sindados.components')
    .directive('appPagination', appPagination);

  function appPagination() {
    return {
      restrict: 'E',
      scope: {
        totalPages: '<',
        currentPage: '<',
        maxVisible: '<?',
        onPageChange: '&'
      },
      template:
        '<nav aria-label="Paginação">' +
        '  <ul class="pagination">' +
        '    <li class="pagination__edge">' +
        '      <button type="button" class="pagination__btn" ng-click="goTo(1)"' +
        '              ng-disabled="isFirst()" aria-label="Primeira página">«</button>' +
        '    </li>' +
        '    <li>' +
        '      <button type="button" class="pagination__btn" ng-click="goTo(currentPage - 1)"' +
        '              ng-disabled="isFirst()" aria-label="Página anterior">' +
        '        ‹ <span class="pagination__label">Anterior</span>' +
        '      </button>' +
        '    </li>' +
        '    <li ng-repeat="entry in pages track by $index">' +
        '      <span class="pagination__ellipsis" ng-if="entry.ellipsis">…</span>' +
        '      <button type="button" class="pagination__btn" ng-if="!entry.ellipsis"' +
        '              ng-class="{\'pagination__btn--active\': entry.number === currentPage}"' +
        '              ng-attr-aria-current="{{entry.number === currentPage ? \'page\' : undefined}}"' +
        '              aria-label="Página {{entry.number}}"' +
        '              ng-click="goTo(entry.number)">{{entry.number}}</button>' +
        '    </li>' +
        '    <li>' +
        '      <button type="button" class="pagination__btn" ng-click="goTo(currentPage + 1)"' +
        '              ng-disabled="isLast()" aria-label="Próxima página">' +
        '        <span class="pagination__label">Próxima</span> ›' +
        '      </button>' +
        '    </li>' +
        '    <li class="pagination__edge">' +
        '      <button type="button" class="pagination__btn" ng-click="goTo(totalPages)"' +
        '              ng-disabled="isLast()" aria-label="Última página">»</button>' +
        '    </li>' +
        '  </ul>' +
        '  <p class="pagination__status">Página {{currentPage}} de {{totalPages}}</p>' +
        '</nav>',
      controller: PaginationController
    };
  }

  PaginationController.$inject = ['$scope'];

  function PaginationController($scope) {
    $scope.pages = [];

    $scope.isFirst = function () {
      return $scope.currentPage <= 1;
    };

    $scope.isLast = function () {
      return $scope.currentPage >= $scope.totalPages;
    };

    $scope.goTo = function (page) {
      if (page < 1 || page > $scope.totalPages || page === $scope.currentPage) return;
      $scope.onPageChange({ page: page });
    };

    
    $scope.$watchGroup(['totalPages', 'currentPage', 'maxVisible'], function () {
      $scope.pages = buildPages(
        Number($scope.totalPages) || 1,
        Number($scope.currentPage) || 1,
        Number($scope.maxVisible) || 5
      );
    });
  }


  function buildPages(total, current, maxVisible) {
    var pages = [];
    var i;

    if (total <= maxVisible + 2) {
      for (i = 1; i <= total; i++) pages.push({ number: i });
      return pages;
    }

    var half = Math.floor((maxVisible - 2) / 2);
    var start = Math.max(2, current - half);
    var end = Math.min(total - 1, current + half);


    if (current - half <= 2) end = Math.min(total - 1, maxVisible - 1);
    if (current + half >= total - 1) start = Math.max(2, total - maxVisible + 2);

    pages.push({ number: 1 });
    if (start > 2) pages.push({ ellipsis: true });
    for (i = start; i <= end; i++) pages.push({ number: i });
    if (end < total - 1) pages.push({ ellipsis: true });
    pages.push({ number: total });

    return pages;
  }
})();
