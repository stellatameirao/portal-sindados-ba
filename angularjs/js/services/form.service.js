
(function () {
  'use strict';

  angular
    .module('sindados.services')
    .factory('FormService', FormService);

  FormService.$inject = ['$q', '$timeout', 'SEED_DATA'];

  function FormService($q, $timeout, SEED_DATA) {
    var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    
    var MEMBERSHIP_FIELDS = [
      { key: 'name', label: 'Nome completo' },
      { key: 'email', label: 'E-mail' },
      { key: 'phone', label: 'Telefone' },
      { key: 'company', label: 'Empresa' },
      { key: 'registration', label: 'Matrícula' },
      { key: 'file', label: 'Comprovante de vínculo' },
      { key: 'consent', label: 'Autorização LGPD' }
    ];

    return {
      getReportTypes: function () { return angular.copy(SEED_DATA.reportTypes); },
      getMemberCompanies: function () {
       
        return SEED_DATA.companies.filter(function (c) {
          return c.value !== 'all' && c.value !== 'geral';
        });
      },
      isValidEmail: isValidEmail,
      membershipStatus: membershipStatus,
      submitMembership: submitMembership,
      submitReport: submitReport
    };

    function isValidEmail(value) {
      return EMAIL_REGEX.test(value || '');
    }

    function isFilled(form, key) {
      if (key === 'email') return isValidEmail(form.email);
      if (key === 'phone') return (form.phone || '').replace(/\D/g, '').length >= 10;
      if (key === 'file') return !!form.fileUploaded;
      if (key === 'consent') return form.consent === true;
      return !!(form[key] && String(form[key]).trim());
    }

    
    function membershipStatus(form) {
      var missing = MEMBERSHIP_FIELDS.filter(function (field) {
        return !isFilled(form, field.key);
      });
      var done = MEMBERSHIP_FIELDS.length - missing.length;

      return {
        percent: Math.round((done / MEMBERSHIP_FIELDS.length) * 100),
        done: done,
        total: MEMBERSHIP_FIELDS.length,
        missing: missing.map(function (f) { return f.label; })
      };
    }

    function submitMembership(form) {
      var status = membershipStatus(form);
      if (status.missing.length) {
        return $q.reject('Preencha: ' + status.missing.join(', ') + '.');
      }
      return $timeout(function () {
        return { name: form.name.split(' ')[0] };
      }, 600);
    }

    function submitReport(report) {
      if (!report.type) return $q.reject('Selecione o tipo de denúncia.');
      if ((report.message || '').trim().length < 20) {
        return $q.reject('Descreva a situação com pelo menos 20 caracteres.');
      }
      if (!report.anonymous && !isValidEmail(report.email)) {
        return $q.reject('Informe um e-mail válido ou marque a opção anônima.');
      }
      return $timeout(function () {
        var protocol = '2026-' + String(Math.floor(Math.random() * 90000) + 10000);
        return { protocol: protocol };
      }, 600);
    }
  }
})();
