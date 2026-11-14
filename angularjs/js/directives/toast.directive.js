
(function () {
  'use strict';

  angular
    .module('sindados.components')
    .directive('appToastContainer', appToastContainer);

  function appToastContainer() {
    return {
      restrict: 'E',
      scope: {},
      template:
        '<div class="toast-container" aria-live="polite" aria-atomic="false">' +
        '  <div class="toast" role="status"' +
        '       ng-repeat="toast in toasts track by toast.id"' +
        '       ng-class="[\'toast--\' + toast.type, {\'toast--leaving\': toast.leaving}]">' +
        '    <span class="toast__icon" aria-hidden="true">{{ icons[toast.type] }}</span>' +
        '    <div class="toast__body">' +
        '      <p class="toast__title">{{toast.title}}</p>' +
        '      <p class="toast__message">{{toast.message}}</p>' +
        '    </div>' +
        '    <button type="button" class="toast__close" aria-label="Fechar notificação"' +
        '            ng-click="dismiss(toast.id)">&times;</button>' +
        '    <span class="toast__timer" ng-if="toast.duration > 0"' +
        '          ng-style="{ \'animation-duration\': toast.duration + \'ms\' }"></span>' +
        '  </div>' +
        '</div>',
      controller: ToastContainerController
    };
  }

  ToastContainerController.$inject = ['$scope', 'ToastService'];

  function ToastContainerController($scope, ToastService) {
    
    $scope.toasts = ToastService.toasts;
    $scope.icons = { success: '✓', error: '✕', warning: '!', info: 'i' };

    $scope.dismiss = function (id) {
      ToastService.dismiss(id);
    };
  }
})();
