
(function () {
  'use strict';

  angular
    .module('sindados.controllers')
    .controller('MembershipController', MembershipController);

  MembershipController.$inject = ['$scope', 'FormService', 'UploadService', 'ToastService'];

  function MembershipController($scope, FormService, UploadService, ToastService) {
    var MAX_FILE_MB = 5;

    $scope.companies = FormService.getMemberCompanies();
    $scope.form = emptyForm();
    $scope.upload = { progress: 0, status: 'idle' }; 
    $scope.sending = false;
    $scope.status = FormService.membershipStatus($scope.form);
    $scope.touched = {};

  
    $scope.$watch('form', function (form) {
      $scope.status = FormService.membershipStatus(form);
    }, true);

    $scope.isValidEmail = FormService.isValidEmail;

    $scope.formVariant = function () {
      return $scope.status.percent === 100 ? 'success' : 'primary';
    };

    $scope.uploadVariant = function () {
      if ($scope.upload.status === 'error') return 'error';
      if ($scope.upload.status === 'done') return 'success';
      return 'primary';
    };

    $scope.uploadLabel = function () {
      return {
        idle: 'Nenhum arquivo enviado',
        uploading: 'Enviando ' + $scope.form.fileName + '...',
        done: 'Comprovante enviado',
        error: 'Falha no envio — tente novamente'
      }[$scope.upload.status];
    };

    
    $scope.onFileSelected = function (files) {
      var file = files && files[0];
      if (!file) return;

      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        ToastService.error('Arquivo maior que ' + MAX_FILE_MB + ' MB.');
        return;
      }

      $scope.form.fileName = file.name;
      $scope.form.fileUploaded = false;
      $scope.upload = { progress: 0, status: 'uploading' };

      UploadService.upload(file.name).then(
        function () {
          $scope.upload.status = 'done';
          $scope.upload.progress = 100;
          $scope.form.fileUploaded = true;
          ToastService.success('Comprovante "' + file.name + '" enviado.');
        },
        function (error) {
          $scope.upload.status = 'error';
          ToastService.error('Erro ao enviar o comprovante: ' + error.reason + '.');
        },
        function (progress) {
          $scope.upload.progress = progress;
        }
      );
    };

    $scope.submit = function () {
      $scope.touched = { name: true, email: true, phone: true, registration: true };
      $scope.sending = true;

      FormService.submitMembership($scope.form).then(
        function (result) {
          ToastService.success('Obrigado, ' + result.name + '! Sua ficha foi enviada. Entraremos em contato.', 6000);
          reset();
        },
        function (message) {
          ToastService.error(message, 6000);
        }
      ).finally(function () {
        $scope.sending = false;
      });
    };

    $scope.reset = function () {
      reset();
      ToastService.info('Ficha limpa.');
    };

    function reset() {
      UploadService.cancel();
      $scope.form = emptyForm();
      $scope.upload = { progress: 0, status: 'idle' };
      $scope.touched = {};
      var input = document.getElementById('membership-file');
      if (input) input.value = '';
    }

    function emptyForm() {
      return {
        name: '',
        email: '',
        phone: '',
        company: null,
        registration: '',
        fileName: '',
        fileUploaded: false,
        consent: false
      };
    }

    $scope.$on('$destroy', UploadService.cancel);
  }
})();
