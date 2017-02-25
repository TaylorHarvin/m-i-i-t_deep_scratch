var deepScratchApp = angular.module('deepScratchApp',[]);


deepScratchApp.controller("objectCreator",function($scope, $rootScope,$http){


	$scope.selectedClass = 0;

	$scope.objects = [
        // new template has empty data for everything
        // or empty strings and false for everything
        /*
		{"className":"temp_name",
            "vars":[
				{"type":"","name":"","value":"","editMode":false}
			],
			"showParams":false,
            "showMethods":false,
            "showData":false,
			"methods":[
				{"return":"","name":"","editMode":false,"params":[
					{"type":"","name":"","value":"","editMode":false}
					]
				}
			],
            "body":""
		}*/


		{"className":"Shape",
			"vars":[
				{"type":"int","name":"width","value":"5","editMode":false}
			],
			"showParams":false,
            "showMethods":false,
            "showData":false,
			"methods":[
				{"return":"void","name":"setWidth","body":"width=5;return;","editMode":false,"params":[
					{"type":"int","name":"width","value":"5","editMode":false}
					]
				}
			]
		},

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
		}
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
		var newMethodParams = $("#newMethodParams_"+classIndex);
        var newMethodBody = $("#newMethodBody_"+classIndex);

		$scope.objects[classIndex].methods.push({"return":newMethodReturn.val(),"name":newMethodName.val(),"params":newMethodParams.val(),"body":newMethodBody.val()});
		newMethodName.val('');
		newMethodReturn.val('');
		newMethodParams.val('');
        newMethodBody.val('');
	}

	$scope.addClassMethodParam = function(classIndex){


	}


	$scope.changeVar = function(classIndex, varIndex, part){
		$scope.objects[classIndex].vars[varIndex][part] = $("#editVar"+part+"_"+classIndex+"_"+varIndex).val();
	}

	$scope.changeMethod = function(classIndex, methodIndex, part){
		$scope.objects[classIndex].methods[methodIndex][part] = $("#editMethod"+part+"_"+classIndex+"_"+methodIndex).val();
	}

	$scope.setVarEditMode = function(classIndex, varIndex){
		$scope.objects[classIndex].vars[varIndex].editMode = !$scope.objects[classIndex].vars[varIndex].editMode;
		//console.log($scope.objects[classIndex].vars[varIndex].editMode);
	}

	$scope.setMethodEditMode = function(classIndex, methodIndex){
		$scope.objects[classIndex].methods[methodIndex].editMode = !$scope.objects[classIndex].methods[methodIndex].editMode;
		//console.log($scope.objects[classIndex].vars[varIndex].editMode);
	}
	// Process a tab as a tab in the content editor
  $scope.handleTab = function(event, txArea,txtAreaId){
    var e = event.which || event.keyCode; // The event value code
    var lineHeight = parseInt($('#'+txtAreaId).css('lineHeight'),10);  // the px height of the font
    //var numLines = parseInt(parseInt(txArea.scrollHeight,10)/lineHeight,10);
    var numLines = parseInt(txArea.value.split('\n').length,10);  // The number of lines in the current content part

    txArea.style.height = ((lineHeight + 20)*numLines) + "px";

    // Replace the tab with separate tab characters -- override default tab
    if(e == 9 && event.type != "keyup"){
      var v = txArea.value, s=txArea.selectionStart,e=txArea.selectionEnd;
      txArea.value=v.substring(0,s) +'\t'+ v.substring(e);
      txArea.selectionStart = txArea.selectionEnd=s+1;
      event.preventDefault();
      return false;
    }
  }

	$scope.focusOnClass = function(classIndex){

	}

});
