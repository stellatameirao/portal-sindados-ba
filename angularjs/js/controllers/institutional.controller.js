
(function () {
  'use strict';

  angular
    .module('sindados.controllers')
    .controller('InstitutionalController', InstitutionalController);

  InstitutionalController.$inject = ['$scope', 'SEED_DATA'];

  function InstitutionalController($scope, SEED_DATA) {
    var org = SEED_DATA.org;

    $scope.tabs = angular.copy(SEED_DATA.institutionalTabs).concat([{
      id: 'contato',
      title: 'Contato',
      content: 'Fale com o sindicato pelos canais abaixo:',
      items: [
        'Telefone: ' + org.phone,
        'WhatsApp: ' + org.whatsapp,
        'E-mail: ' + org.email,
        'Endereço: ' + org.address
      ]
    }]);

    $scope.tab = { index: 0, lastSeen: $scope.tabs[0].title };

    
    $scope.onTabChange = function (tab) {
      $scope.tab.lastSeen = tab.title;
    };
  }
})();
