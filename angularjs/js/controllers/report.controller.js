
(function () {
  'use strict';

  angular
    .module('sindados.controllers')
    .controller('ReportController', ReportController);

  ReportController.$inject = ['$scope', 'FormService', 'NewsService', 'ToastService'];

  function ReportController($scope, FormService, NewsService, ToastService) {
    $scope.maxLength = 500;
    $scope.reportTypes = FormService.getReportTypes();
    $scope.companies = NewsService.getCompanies().filter(function (c) {
      return c.value !== 'all' && c.value !== 'geral';
    });
    $scope.report = emptyReport();
    $scope.sending = false;
    $scope.lastProtocol = null;

    
    $scope.onAnonymousChange = function () {
      if ($scope.report.anonymous) {
        $scope.report.email = '';
        ToastService.info('Sua identidade não será registrada.', 2500);
      }
    };

    $scope.remaining = function () {
      return $scope.maxLength - ($scope.report.message || '').length;
    };

    $scope.submit = function () {
      $scope.sending = true;

      FormService.submitReport($scope.report).then(
        function (result) {
          $scope.lastProtocol = result.protocol;
          ToastService.success('Denúncia registrada. Protocolo nº ' + result.protocol + '.', 7000);
          $scope.report = emptyReport();
        },
        function (message) {
          ToastService.warning(message, 5000);
        }
      ).finally(function () {
        $scope.sending = false;
      });
    };

    function emptyReport() {
      return { type: null, company: null, message: '', anonymous: true, email: '' };
    }
  }
})();
