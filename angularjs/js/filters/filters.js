
(function () {
  'use strict';

  angular
    .module('sindados.filters')
    .filter('relativeDate', relativeDateFilter)
    .filter('dateBR', dateBRFilter)
    .filter('percentage', percentageFilter)
    .filter('capitalize', capitalizeFilter)
    .filter('truncate', truncateFilter)
    .filter('plural', pluralFilter);

  var DAY = 24 * 60 * 60 * 1000;

  function parseDate(value) {
    
    return new Date(value + 'T12:00:00');
  }

  
  function relativeDateFilter() {
    return function (value) {
      if (!value) return '';
      var today = new Date();
      today.setHours(12, 0, 0, 0);
      var days = Math.round((today - parseDate(value)) / DAY);
      if (days <= 0) return 'hoje';
      if (days === 1) return 'ontem';
      if (days < 30) return 'há ' + days + ' dias';
      var months = Math.floor(days / 30);
      if (months < 12) return months === 1 ? 'há 1 mês' : 'há ' + months + ' meses';
      var years = Math.floor(months / 12);
      return years === 1 ? 'há 1 ano' : 'há ' + years + ' anos';
    };
  }

  
  function dateBRFilter() {
    return function (value) {
      if (!value) return '';
      return parseDate(value).toLocaleDateString('pt-BR');
    };
  }

  
  function percentageFilter() {
    return function (value, decimals) {
      var number = Math.min(100, Math.max(0, Number(value) || 0));
      return number.toFixed(decimals || 0) + '%';
    };
  }

  
  function capitalizeFilter() {
    return function (text) {
      if (!text) return '';
      text = String(text);
      return text.charAt(0).toUpperCase() + text.slice(1);
    };
  }

  
  function truncateFilter() {
    return function (text, limit) {
      if (!text) return '';
      limit = limit || 30;
      return text.length > limit ? text.slice(0, limit - 1) + '…' : text;
    };
  }

  
  function pluralFilter() {
    return function (count, singular, plural) {
      count = Number(count) || 0;
      return count + ' ' + (count === 1 ? singular : plural);
    };
  }
})();
