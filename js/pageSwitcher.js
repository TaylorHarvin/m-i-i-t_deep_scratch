deepScratchApp.controller("pageSwitcher",function($scope, $rootScope,$http){
	$scope.pages= [
        {"home":true,"main":false,"classes":true
        }
	];

	$scope.applyChange = function(){
		$rootScope.$broadcast("pageChange",
    {
      pageStats:$scope.pages
    });
	}

    $scope.setHomePage = function(){
        $scope.pages.home = true;
        $scope.pages.main = false;
        $scope.pages.classes = false;
				$scope.applyChange();
    }
    $scope.setMainPage = function(){
        $scope.pages.home = false;
        $scope.pages.main = true;
        $scope.pages.classes = false;
				$scope.applyChange();
    }
    $scope.setClassesPage = function(){
        $scope.pages.home = false;
        $scope.pages.main = false;
        $scope.pages.classes = true;
				$scope.applyChange();
    }

});
