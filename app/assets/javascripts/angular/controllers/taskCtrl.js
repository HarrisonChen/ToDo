angular.module('controllers.taskCtrl', [])
.controller('TaskCtrl', ['$scope', '$routeParams', 'Task',
function($scope, $routeParams, Task){

  $scope.tasks = Task.query();
  initTask();

  function initTask(){
    $scope.activeTask = new Task();
    $scope.activeTask.title = ""; 
  }

  function popOut(activeTask){
    var index = $scope.tasks.indexOf(activeTask);
    $scope.tasks.splice(index, 1);
  }

  function pushFront(activeTask){
    $scope.tasks.unshift(activeTask);
  }

  function pushBack(activeTask){
    $scope.tasks.push(activeTask);
  }

  $scope.save = function(activeTask){
    if(activeTask.title.length != 0){
      var updated = false;

      for(var i = 0; i < $scope.tasks.length; ++i){
        if($scope.tasks[i].id == activeTask.id){

          if(activeTask.completed){
            popOut(activeTask);
            pushBack(activeTask);
          }
          else{
            popOut(activeTask);
            pushFront(activeTask);
          }

          Task.update(activeTask);
          updated = true;
          break;
        }
      }

      if(!updated){
        pushFront(activeTask);
        activeTask.$save();
      }
    }

    initTask();
  };

  $scope.edit = function(editedTask){
    $scope.activeTask = editedTask;
    popOut(activeTask);
    pushFront(activeTask);
    $scope.activeTask.completed = false;
  };

  $scope.delete = function(deletedTask){
    Task.delete(deletedTask);
    var index = $scope.tasks.indexOf(deletedTask);
    $scope.tasks.splice(index, 1);
    initTask();
  };

  $scope.toggleCheck = function(task){
    task.completed = !task.completed;
    $scope.save(task);
  };

}]);