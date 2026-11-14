
(function () {
  'use strict';

  angular
    .module('sindados.services')
    .factory('SavedService', SavedService);

  function SavedService() {
    var ids = [];

    return {
      isSaved: function (id) {
        return ids.indexOf(id) !== -1;
      },
      
      toggle: function (id) {
        var index = ids.indexOf(id);
        if (index === -1) {
          ids.push(id);
          return true;
        }
        ids.splice(index, 1);
        return false;
      },
      count: function () {
        return ids.length;
      }
    };
  }
})();
