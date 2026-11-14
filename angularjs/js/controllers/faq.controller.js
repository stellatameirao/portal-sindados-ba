
(function () {
  'use strict';

  angular
    .module('sindados.controllers')
    .controller('FaqController', FaqController);

  FaqController.$inject = ['$scope', '$filter', 'SEED_DATA', 'ToastService'];

  function FaqController($scope, $filter, SEED_DATA, ToastService) {
    var allQuestions = angular.copy(SEED_DATA.faq);

    $scope.faq = { search: '', items: allQuestions, lastOpened: null };


    $scope.onFaqSearch = function () {
      $scope.faq.items = $filter('filter')(allQuestions, $scope.faq.search);
    };


    $scope.onFaqToggle = function (item, open) {
      if (open) $scope.faq.lastOpened = item.title;
    };

    $scope.sendFeedback = function (helpful) {
      if (helpful) ToastService.success('Obrigado pelo retorno!');
      else ToastService.info('Fale com a gente pelo WhatsApp ' + SEED_DATA.org.whatsapp + '.');
    };
  }
})();
