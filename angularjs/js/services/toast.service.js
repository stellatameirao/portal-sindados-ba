
(function () {
  'use strict';

  angular
    .module('sindados.services')
    .factory('ToastService', ToastService);

  ToastService.$inject = ['$timeout'];

  function ToastService($timeout) {
    var DEFAULT_DURATION = 4000;
    var EXIT_ANIMATION = 300; 
    var MAX_TOASTS = 5;
    var nextId = 1;

    var titles = {
      success: 'Sucesso',
      error: 'Erro',
      warning: 'Atenção',
      info: 'Informação'
    };

    var service = {
      toasts: [],
      show: show,
      success: function (message, duration) { return show(message, 'success', duration); },
      error: function (message, duration) { return show(message, 'error', duration); },
      warning: function (message, duration) { return show(message, 'warning', duration); },
      info: function (message, duration) { return show(message, 'info', duration); },
      dismiss: dismiss,
      clear: clear
    };

    return service;

    /**
     * Exibe uma notificação.
     * @param {string} message  texto da notificação
     * @param {string} [type]   success | error | warning | info
     * @param {number} [duration] tempo em ms (0 = não fecha sozinho)
     */
    function show(message, type, duration) {
      type = titles[type] ? type : 'info';
      duration = angular.isNumber(duration) ? duration : DEFAULT_DURATION;

      var toast = {
        id: nextId++,
        type: type,
        title: titles[type],
        message: message,
        duration: duration,
        leaving: false,
        timer: null
      };

      service.toasts.push(toast);

      
      if (service.toasts.length > MAX_TOASTS) {
        dismiss(service.toasts[0].id);
      }

      if (duration > 0) {
        toast.timer = $timeout(function () {
          dismiss(toast.id);
        }, duration);
      }

      return toast.id;
    }

    
    function dismiss(id) {
      var toast = findById(id);
      if (!toast || toast.leaving) return;

      if (toast.timer) $timeout.cancel(toast.timer);
      toast.leaving = true;

      $timeout(function () {
        var index = service.toasts.indexOf(toast);
        if (index !== -1) service.toasts.splice(index, 1);
      }, EXIT_ANIMATION);
    }

    function clear() {
      service.toasts.slice().forEach(function (toast) {
        dismiss(toast.id);
      });
    }

    function findById(id) {
      for (var i = 0; i < service.toasts.length; i++) {
        if (service.toasts[i].id === id) return service.toasts[i];
      }
      return null;
    }
  }
})();
