angular.module('nodeBlog', [])
.controller('mainController', function($scope, $http){

  $scope.form  =  {};
  $scope.posts =  {};

  $http.get('/api/v1/posts')
  .success(function(data){
    $scope.posts = data;
    console.log(data);
  })
  .error(function(err){
    console.log("Error", err);
  });
});
