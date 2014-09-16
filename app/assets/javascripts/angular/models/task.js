angular.module('models.task', [])
.factory('Task', ['$resource', function($resource){
  var Task = $resource('/api/v1/tasks/:id.json',
                       { id: '@id' },
                       { update: { method: 'PUT' } });

  return Task
}]);