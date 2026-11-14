
(function () {
  'use strict';

  angular
    .module('sindados.components')
    .directive('appDropdown', appDropdown);

  appDropdown.$inject = ['$document'];

  function appDropdown($document) {
    return {
      restrict: 'E',
      scope: {
        options: '<',
        selected: '=?',
        placeholder: '@?',
        ariaLabelText: '@?',
        compact: '<?',
        onSelect: '&?'
      },
      template:
        '<div class="dropdown" ng-class="{\'dropdown--open\': isOpen, \'dropdown--compact\': compact}">' +
        '  <button type="button" class="dropdown__toggle"' +
        '          aria-haspopup="listbox" aria-expanded="{{isOpen}}"' +
        '          aria-label="{{ariaLabelText}}"' +
        '          ng-click="toggle()">' +
        '    <span class="dropdown__toggle-text">' +
        '      <span ng-if="selectedOption().icon">{{selectedOption().icon}}&nbsp;</span>' +
        '      {{ selectedOption().label || placeholder || "Selecione..." }}' +
        '    </span>' +
        '    <span class="dropdown__caret" aria-hidden="true"></span>' +
        '  </button>' +
        '  <ul class="dropdown__menu" role="listbox" ng-if="isOpen">' +
        '    <li ng-repeat="option in options track by option.value" role="presentation">' +
        '      <button type="button" class="dropdown__option" role="option"' +
        '              aria-selected="{{option.value === selected}}"' +
        '              ng-class="{\'dropdown__option--selected\': option.value === selected}"' +
        '              ng-click="choose(option)">' +
        '        <span ng-if="option.icon" aria-hidden="true">{{option.icon}}</span>' +
        '        <span>{{option.label}}</span>' +
        '        <span class="dropdown__check" ng-if="option.value === selected" aria-hidden="true">✓</span>' +
        '      </button>' +
        '    </li>' +
        '  </ul>' +
        '</div>',
      controller: DropdownController,
      link: function (scope, element) {
        
        function onDocumentClick(event) {
          if (scope.isOpen && !element[0].contains(event.target)) {
            scope.$apply(scope.close);
          }
        }

        
        function onKeydown(event) {
          if (scope.isOpen && event.key === 'Escape') {
            scope.$apply(scope.close);
            var toggle = element[0].querySelector('.dropdown__toggle');
            if (toggle) toggle.focus();
          }
        }

        $document.on('click', onDocumentClick);
        $document.on('keydown', onKeydown);

        
        scope.$on('$destroy', function () {
          $document.off('click', onDocumentClick);
          $document.off('keydown', onKeydown);
        });
      }
    };
  }

  DropdownController.$inject = ['$scope'];

  function DropdownController($scope) {
    $scope.isOpen = false;

    $scope.toggle = function () {
      $scope.isOpen = !$scope.isOpen;
    };

    $scope.close = function () {
      $scope.isOpen = false;
    };

    $scope.selectedOption = function () {
      var list = $scope.options || [];
      for (var i = 0; i < list.length; i++) {
        if (list[i].value === $scope.selected) return list[i];
      }
      return {};
    };

    $scope.choose = function (option) {
      $scope.selected = option.value;
      $scope.close();

      if (angular.isFunction(option.action)) {
        option.action(option);
      }
      if ($scope.onSelect) {
        $scope.onSelect({ option: option });
      }
    };
  }
})();
