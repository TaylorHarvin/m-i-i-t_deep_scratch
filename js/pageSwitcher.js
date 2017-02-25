var pageSwitcherApp = angular.module('pageSwitcher',[]);


pageSwitcher.controller("pageSwitcher",function($scope, $rootScope,$http){
	$scope.pages= [
        {"home":true,"main":false,"classes":true
        } 
	];

    $scope.setHomePage = function(){
        $scope.pages.home = true;
        $scope.pages.main = false;
        $scope.pages.classes = false;
    }
    $scope.setMainPage = function(){
        $scope.pages.home = false;
        $scope.pages.main = true;
        $scope.pages.classes = false;
    }
    $scope.setClassesPage = function(){
        $scope.pages.home = false;
        $scope.pages.main = false;
        $scope.pages.classes = true;
    }

});
