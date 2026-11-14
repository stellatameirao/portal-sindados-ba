
(function () {
  'use strict';

  angular
    .module('sindados.controllers')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$document', '$timeout', 'SavedService', 'ToastService'];

  function HeaderController($scope, $document, $timeout, SavedService, ToastService) {
    var sections = [
      { id: 'noticias', label: 'Notícias', icon: '📰' },
      { id: 'associe-se', label: 'Associe-se', icon: '✍️' },
      { id: 'denuncie', label: 'Denuncie!', icon: '📢' },
      { id: 'institucional', label: 'Institucional', icon: '🏛️' },
      { id: 'faq', label: 'Dúvidas', icon: '❓' }
    ];

    $scope.navLinks = sections;
    $scope.menu = { selected: null };

    $scope.menuOptions = sections.map(function (section) {
      return {
        value: section.id,
        label: section.label,
        icon: section.icon,
        action: function () {
          scrollTo(section.id);
          
          $timeout(function () { $scope.menu.selected = null; });
        }
      };
    });

    $scope.savedCount = SavedService.count;

    $scope.showSaved = function () {
      var count = SavedService.count();
      if (count) {
        ToastService.info('Você tem ' + count + ' notícia(s) salva(s) para ler depois.');
      } else {
        ToastService.info('Nenhuma notícia salva. Use o botão "Salvar" nas notícias.');
      }
    };

    function scrollTo(id) {
      var target = $document[0].getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    $timeout(function () {
      ToastService.success('Bem-vindo(a) ao portal do SINDADOS-BA!', 3500);
    }, 400);
  }
})();
