
(function () {
  'use strict';

  angular
    .module('sindados.components')
    .directive('appFileChange', appFileChange);

  appFileChange.$inject = ['$parse'];

  function appFileChange($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var callback = $parse(attrs.appFileChange);

        function onChange(event) {
          scope.$apply(function () {
            callback(scope, { files: event.target.files });
          });
        }

        element.on('change', onChange);
        scope.$on('$destroy', function () {
          element.off('change', onChange);
        });
      }
    };
  }
})();
