angular.module('app', [
  'ngRoute',
  'ngResource',
  'controllers.taskCtrl',
  'models.task'
])
.config([
  '$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      controller: 'HomeCtrl'
    }).when('/:status', {
      controller: 'HomeCtrl',
    }).otherwise({
      redirectTo: '/'
    });
  }
]);
