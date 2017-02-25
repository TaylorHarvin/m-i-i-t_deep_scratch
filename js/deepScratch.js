var deepScratchApp = angular.module('deepScratchApp',[]);


deepScratchApp.controller("objectCreator",function($scope, $rootScope,$http){



	$scope.objects = [
		{"className":"Shape",
			"vars":[
				{"type":"int","name":"width","value":"5","editMode":false}
			],
			"showParams":false,
      "showMethods":false,
      "showData":false,
			"methods":[
				{"return":"void","name":"setWidth","editMode":false,"params":[
					{"type":"int","name":"width","value":"5","editMode":false}
					]
				}
			]
		}/*,

		{"className":"Circle",
			"vars":[
				{"type":"int","name":"width","value":"5"}
			],
			"showParams":false,
			"methods":[
				{"return":"void","name":"setRadius","params":[
					{"type":"int","name":"radius","value":"5"},
					{"type":"string","name":"units","value":"cm"}
					]
				}
			]
		}*/
	];

	$scope.setShowParams = function(classIndex){
		$scope.objects[classIndex].showParams = !$scope.objects[classIndex].showParams;
	}

    $scope.setShowMethods = function(classIndex){
        $scope.objects[classIndex].showMethods = !$scope.objects[classIndex].showMethods;
    }

    $scope.setShowData = function(classIndex){
        $scope.objects[classIndex].showData = !$scope.objects[classIndex].showData;
    }

	$scope.addClassVar = function(classIndex){
		var newVarType = $("#newVarType_"+classIndex);
		var newVarName = $("#newVarName_"+classIndex);
		var newVarValue = $("#newVarValue_"+classIndex);

		$scope.objects[classIndex].vars.push({"type":newVarType.val(),"name":newVarName.val(),"value":newVarValue.val()});
		newVarType.val('');
		newVarName.val('');
		newVarValue.val('');
	}

	$scope.addClassMethod = function(classIndex){
		var newMethodReturn = $("#newMethodReturn_"+classIndex);
		var newMethodName = $("#newMethodName_"+classIndex);
		var newMethodParams = $("newMethodParams_"+classIndex);

		$scope.objects[classIndex].methods.push({"return":newMethodReturn.val(),"name":newMethodName.val(),"params":newMethodParams.val()});
		newMethodName.val('');
		newMethodReturn.val('');
		newMethodParams.val('');
	}

	$scope.addClassMethodParam = function(classIndex){

	}


	$scope.changeVar = function(classIndex, varIndex, part){
		//$scope.objects[classIndex].vars[varIndex][part] = newValue;
		//alert($("#editVar"+part+"_"+classIndex+"_"+varIndex).val());
		$scope.objects[classIndex].vars[varIndex][part] = $("#editVar"+part+"_"+classIndex+"_"+varIndex).val();
	}

	$scope.changeMethod = function(classIndex, methodIndex, part){
		//$scope.objects[classIndex].vars[varIndex][part] = newValue;
		//alert($("#editVar"+part+"_"+classIndex+"_"+varIndex).val());
		$scope.objects[classIndex].methods[methodIndex][part] = $("#editMethod"+part+"_"+classIndex+"_"+methodIndex).val();
		alert("#editMethod"+part+"_"+classIndex+"_"+methodIndex);
	}

	$scope.setVarEditMode = function(classIndex, varIndex){
		$scope.objects[classIndex].vars[varIndex].editMode = !$scope.objects[classIndex].vars[varIndex].editMode;
		//console.log($scope.objects[classIndex].vars[varIndex].editMode);
	}

	$scope.setMethodEditMode = function(classIndex, methodIndex){
		$scope.objects[classIndex].methods[methodIndex].editMode = !$scope.objects[classIndex].methods[methodIndex].editMode;
		//console.log($scope.objects[classIndex].vars[varIndex].editMode);
	}

});
