'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.hello = 'Hello';
    $scope.getContacts = function(){
      $http.get('http://localhost:3000/api/contacts').then(function(res){
          $scope.contactList = res.data;
      })
    }
  });
