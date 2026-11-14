
(function () {
  'use strict';

  angular
    .module('sindados.services')
    .service('UploadService', UploadService);

  UploadService.$inject = ['$q', '$interval'];

  function UploadService($q, $interval) {
    var currentTimer = null;

    /**
     * @param {string} fileName
     * @param {{shouldFail?: boolean}} [options]
     * @returns {Promise} notifica o progresso via .then(ok, erro, progresso)
     */
    this.upload = function (fileName, options) {
      options = options || {};
      this.cancel();

      var deferred = $q.defer();
      var progress = 0;
      var failAt = 40 + Math.floor(Math.random() * 40); 

      currentTimer = $interval(function () {
        progress = Math.min(100, progress + Math.floor(Math.random() * 9) + 3);

        if (options.shouldFail && progress >= failAt) {
          stopTimer();
          deferred.reject({ fileName: fileName, progress: failAt, reason: 'Conexão interrompida' });
          return;
        }

        deferred.notify(progress);

        if (progress >= 100) {
          stopTimer();
          deferred.resolve({ fileName: fileName });
        }
      }, 150);

      return deferred.promise;
    };

    this.cancel = function () {
      stopTimer();
    };

    function stopTimer() {
      if (currentTimer) {
        $interval.cancel(currentTimer);
        currentTimer = null;
      }
    }
  }
})();
