
(function () {
  'use strict';

  var uid = 0;

  angular
    .module('sindados.components')
    .directive('appAccordion', appAccordion);

  function appAccordion() {
    return {
      restrict: 'E',
      scope: {
        items: '<',
        singleOpen: '<?',
        initialOpen: '<?',
        onToggle: '&?'
      },
      template:
        '<div class="accordion">' +
        '  <div class="accordion__item" ng-repeat="item in items track by $index"' +
        '       ng-class="{\'accordion__item--open\': isOpen($index)}">' +
        '    <button type="button" class="accordion__header"' +
        '            id="{{::accordionId}}-header-{{$index}}"' +
        '            aria-controls="{{::accordionId}}-panel-{{$index}}"' +
        '            aria-expanded="{{isOpen($index)}}"' +
        '            ng-click="toggle($index)">' +
        '      <span>{{item.title}}</span>' +
        '      <span class="accordion__icon" aria-hidden="true"></span>' +
        '    </button>' +
        '    <div class="accordion__panel" role="region"' +
        '         id="{{::accordionId}}-panel-{{$index}}"' +
        '         aria-labelledby="{{::accordionId}}-header-{{$index}}"' +
        '         aria-hidden="{{!isOpen($index)}}">' +
        '      <div class="accordion__panel-inner">' +
        '        <div class="accordion__content">{{item.content}}</div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>',
      controller: AccordionController
    };
  }

  AccordionController.$inject = ['$scope'];

  function AccordionController($scope) {
    $scope.accordionId = 'accordion-' + (++uid);
    $scope.openItems = {}; 
    var singleOpen = function () {
      return $scope.singleOpen !== false;
    };

    if (angular.isNumber($scope.initialOpen)) {
      $scope.openItems[$scope.initialOpen] = true;
    }

    $scope.isOpen = function (index) {
      return !!$scope.openItems[index];
    };

    $scope.toggle = function (index) {
      var willOpen = !$scope.isOpen(index);

      if (singleOpen()) {
        $scope.openItems = {};
      }
      $scope.openItems[index] = willOpen;

      if ($scope.onToggle) {
        $scope.onToggle({ index: index, open: willOpen, item: $scope.items[index] });
      }
    };

    $scope.$watchCollection('items', function (items) {
      var length = items ? items.length : 0;
      Object.keys($scope.openItems).forEach(function (key) {
        if (Number(key) >= length) delete $scope.openItems[key];
      });
    });
  }
})();
