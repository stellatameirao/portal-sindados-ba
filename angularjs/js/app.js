
(function () {
  'use strict';

  
  angular.module('sindados.services', []);
  angular.module('sindados.filters', []);
  angular.module('sindados.components', []);
  angular.module('sindados.controllers', ['sindados.services']);

  
  angular
    .module('sindados', [
      'sindados.services',
      'sindados.filters',
      'sindados.components',
      'sindados.controllers'
    ])
    .constant('APP_CONFIG', {
      name: 'SINDADOS-BA',
      version: '1.0.0'
    })
    .config(['$compileProvider', function ($compileProvider) {
      
      $compileProvider.debugInfoEnabled(false);
    }])
    .run(['$rootScope', 'APP_CONFIG', 'SEED_DATA', function ($rootScope, APP_CONFIG, SEED_DATA) {
      
      $rootScope.appConfig = APP_CONFIG;
      $rootScope.org = SEED_DATA.org;
      $rootScope.currentYear = new Date().getFullYear();
    }]);
})();
