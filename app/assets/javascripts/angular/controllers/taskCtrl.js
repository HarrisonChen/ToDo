angular.module('controllers.taskCtrl', [])
.controller('TaskCtrl', function($scope, $routeParams, Task){

  $scope.tasks = Task.query();
  initTask();

  function initTask(){
    $scope.activeTask = new Task();
    $scope.activeTask.title = "";
  }

  $scope.save = function(activeTask){
    if(activeTask.title.length != 0){
      var updated = false;

      for(var i = 0; i < $scope.tasks.length; ++i){
        if($scope.tasks[i].id == activeTask.id){

          Task.update(activeTask);
          updated = true;
          break;
        }
      }

      if(!updated){
        $scope.tasks.unshift(activeTask);
        activeTask.$save();
      }
    }

    initTask();
  };

  $scope.edit = function(editedTask){
    $scope.activeTask = editedTask;
  }

  $scope.delete = function(deletedTask){
    Task.delete(deletedTask);
    var index = $scope.tasks.indexOf(deletedTask);
    $scope.tasks.splice(index, 1);
    initTask();
  };

  $scope.toggleCheck = function(task){
    task.completed = !task.completed
    $scope.save(task);
  };

});