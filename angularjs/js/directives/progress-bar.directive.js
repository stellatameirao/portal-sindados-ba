
(function () {
  'use strict';

  angular
    .module('sindados.components')
    .directive('appProgressBar', appProgressBar);

  function appProgressBar() {
    return {
      restrict: 'E',
      scope: {
        value: '<',
        label: '@?',
        showValue: '<?',
        variant: '@?',
        striped: '<?'
      },
      template:
        '<div class="progress" ng-class="[\'progress--\' + currentVariant, {\'progress--striped\': striped}]">' +
        '  <div class="progress__top" ng-if="label || showValue !== false">' +
        '    <span class="progress__label">{{label}}</span>' +
        '    <span class="progress__value" ng-if="showValue !== false">{{percent | percentage}}</span>' +
        '  </div>' +
        '  <div class="progress__track" role="progressbar"' +
        '       aria-valuemin="0" aria-valuemax="100" aria-valuenow="{{percent | number:0}}"' +
        '       aria-label="{{label || \'Progresso\'}}">' +
        '    <div class="progress__fill" ng-style="{ width: percent + \'%\' }"></div>' +
        '  </div>' +
        '</div>',
      controller: ProgressBarController
    };
  }

  ProgressBarController.$inject = ['$scope'];

  function ProgressBarController($scope) {
    $scope.percent = 0;
    $scope.currentVariant = 'primary';

    $scope.$watchGroup(['value', 'variant'], function () {
      var number = Number($scope.value);
      $scope.percent = isNaN(number) ? 0 : Math.min(100, Math.max(0, number));
      $scope.currentVariant = resolveVariant($scope.variant, $scope.percent);
    });
  }

  function resolveVariant(variant, percent) {
    if (variant === 'auto') {
      if (percent >= 80) return 'error';
      if (percent >= 50) return 'warning';
      return 'success';
    }
    return variant || 'primary';
  }
})();
