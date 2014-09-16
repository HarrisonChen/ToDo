angular.module('models.task', [])
.factory('Task', function($resource){
  var Task = $resource('http://localhost:3000/api/v1/tasks/:id.json',
                       { id: '@id' },
                       { update: { method: 'PUT' } });

  return Task
});