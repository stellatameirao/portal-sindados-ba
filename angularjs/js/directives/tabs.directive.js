
(function () {
  'use strict';

  var uid = 0;

  angular
    .module('sindados.components')
    .directive('appTabs', appTabs);

  function appTabs() {
    return {
      restrict: 'E',
      scope: {
        tabs: '<',
        activeIndex: '=?',
        onChange: '&?'
      },
      template:
        '<div class="tabs">' +
        '  <div class="tabs__list" role="tablist" ng-keydown="onKeydown($event)">' +
        '    <button type="button" class="tabs__tab" role="tab"' +
        '            ng-repeat="tab in tabs track by $index"' +
        '            id="{{::tabsId}}-tab-{{$index}}"' +
        '            aria-controls="{{::tabsId}}-panel-{{$index}}"' +
        '            aria-selected="{{$index === activeIndex}}"' +
        '            tabindex="{{$index === activeIndex ? 0 : -1}}"' +
        '            ng-class="{\'tabs__tab--active\': $index === activeIndex}"' +
        '            ng-click="select($index)">{{tab.title}}</button>' +
        '  </div>' +
        '  <div ng-repeat="tab in tabs track by $index">' +
        '    <div class="tabs__panel" role="tabpanel" ng-if="$index === activeIndex"' +
        '         id="{{::tabsId}}-panel-{{$index}}"' +
        '         aria-labelledby="{{::tabsId}}-tab-{{$index}}">' +
        '      <p class="tabs__content">{{tab.content}}</p>' +
        '      <ul class="tabs__items" ng-if="tab.items.length">' +
        '        <li ng-repeat="line in tab.items track by $index">{{line}}</li>' +
        '      </ul>' +
        '    </div>' +
        '  </div>' +
        '</div>',
      controller: TabsController
    };
  }

  TabsController.$inject = ['$scope', '$element', '$timeout'];

  function TabsController($scope, $element, $timeout) {
    $scope.tabsId = 'tabs-' + (++uid);

    if (!angular.isNumber($scope.activeIndex)) {
      $scope.activeIndex = 0;
    }

    $scope.activeTab = function () {
      return $scope.tabs ? $scope.tabs[$scope.activeIndex] : null;
    };

    $scope.select = function (index) {
      if (!$scope.tabs || index < 0 || index >= $scope.tabs.length) return;
      if (index === $scope.activeIndex) return;

      $scope.activeIndex = index;
      if ($scope.onChange) {
        $scope.onChange({ tab: $scope.tabs[index], index: index });
      }
    };

    
    $scope.onKeydown = function (event) {
      if (!$scope.tabs || !$scope.tabs.length) return;
      var last = $scope.tabs.length - 1;
      var next = null;

      switch (event.key) {
        case 'ArrowRight': next = $scope.activeIndex >= last ? 0 : $scope.activeIndex + 1; break;
        case 'ArrowLeft': next = $scope.activeIndex <= 0 ? last : $scope.activeIndex - 1; break;
        case 'Home': next = 0; break;
        case 'End': next = last; break;
        default: return;
      }

      event.preventDefault();
      $scope.select(next);
      $timeout(function () {
        var buttons = $element[0].querySelectorAll('.tabs__tab');
        if (buttons[next]) buttons[next].focus();
      });
    };

  
    $scope.$watchCollection('tabs', function (tabs) {
      if (!tabs || $scope.activeIndex >= tabs.length) {
        $scope.activeIndex = 0;
      }
    });
  }
})();
