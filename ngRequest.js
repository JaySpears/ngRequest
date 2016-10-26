(function() {
  'use strict';

  var ngRequest = angular.module('ngRequest', []);

  ngRequest.directive('request', request);
  ngRequest.factory('UrlRequest', UrlRequest);

  //DIRECTIVE START
  function request() {
    var markup =
      '<form ng-submit="vm.submitUrl(vm.url)">' +
      '<legend>ngRequest<br><span>Display data for your ajax requests.</legend>' +
      '<label for="url-search">URL:</label><input name="url-search" ng-model="vm.url"></input>' +
      '<button type="submit">Submit</button>' +
      '</form>' +
      '<div>' +
      '<p class="results-header">Requested Data:</p>' +
      '<pre ng-hide="vm.error"> {{ vm.urlData | json }}</pre>' +
      '<p class="error" ng-show="vm.error" ng-bind="vm.error"></p>' +
      '<div>';

    var directive = {
      restrict: 'EA',
      template: markup,
      scope: {},
      controller: RequestController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  RequestController.$inject = ['UrlRequest'];

  function RequestController(UrlRequest) {
    var vm = this;
    vm.url = vm.url;
    vm.submitUrl = submitUrl;
    vm.urlData;
    vm.error = null;

    function submitUrl(url) {
      UrlRequest.get(url).then(function successCallback(response) {
        vm.error = null;
        vm.urlData = response.data;
      }, function errorCallback(response) {
        if (response.status === -1) {
          vm.error = 'Invalid Url';
        } else {
          vm.error = response.statusText;
        }
      });
    }

    activate();

    function activate() {}
  }
  //DIRECTIVE END


  //SERVICE START
  UrlRequest.$inject = ['$http'];

  function UrlRequest($http) {
    var method = {
      get: get
    };

    return method;

    function get(url) {
      return $http({
        method: 'GET',
        url: url
      });
    }
  }
  //SERVICE END

})();
