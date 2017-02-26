var deepScratchApp = angular.module('deepScratchApp',[]).directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    }
});


deepScratchApp.controller("objectCreator",function($scope, $rootScope,$http){


	$scope.selectedClass = 0;
	$scope.newClassName ="";

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
            "showParams":false,
            "showMethods":false,
            "showData":false,
            "editNameEnabled":false,
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
      "showMethods":false,
      "showData":false,
      "editNameEnabled":false,
			"methods":[
				{"return":"void","name":"setRadius","params":[
					{"type":"int","name":"radius","value":"5","editMode":false},
					{"type":"string","name":"units","value":"cm","editMode":false}
					]
				}
			]
		}
	];

	$scope.bCastObjects = function(){
		$rootScope.$broadcast("updatedObjects",
	 {
		 objects:$scope.objects
	 });
	}


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

		$scope.bCastObjects();
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

		$scope.bCastObjects();
	}

	$scope.addClassMethodParam = function(classIndex){


	}


	$scope.changeVar = function(classIndex, varIndex, part){
		$scope.objects[classIndex].vars[varIndex][part] = $("#editVar"+part+"_"+classIndex+"_"+varIndex).val();
		$scope.bCastObjects();
	}

	$scope.changeMethod = function(classIndex, methodIndex, part){
		$scope.objects[classIndex].methods[methodIndex][part] = $("#editMethod"+part+"_"+classIndex+"_"+methodIndex).val();
		$scope.bCastObjects();
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
		$scope.selectedClass = classIndex;
	}
	$(document).ready(function(){
		$scope.bCastObjects();
	});


	$scope.classExists = function(className){
		for(i in $scope.objects){
			if($scope.objects[i].className == className){
				return true;
			}
		}
		return false;
	}

	$scope.addNewClass = function(){
		var newClassName = $("#newClassName").val();
		if(!$scope.classExists(newClassName)){
			var newClass = {
				"className":newClassName,
				"vars":[],
        "showParams":false,
        "showMethods":false,
        "showData":false,
        "editNameEnabled":false,
				"methods":[]
			};

			$scope.objects.push(newClass);
			$("#newClassName").val("");
		}
		else{
			alert(newClassName+" already exists!");
		}
    $scope.bCastObjects();

	}

  $scope.removeClass = function(classIndex){
    var conf = confirm("Are you sure you want to remove the "+$scope.objects[classIndex].className+" class?");
    if(conf){
      $scope.objects.splice(classIndex, 1);;
    }
    $scope.bCastObjects();
  }

  $scope.toggleClassNameEdit = function(classIndex){
    if($scope.objects[classIndex].editNameEnabled){
      var newClassName = $("#newClassName_"+classIndex).val();
      $scope.objects[classIndex].className = newClassName;
    }
    $scope.objects[classIndex].editNameEnabled = !$scope.objects[classIndex].editNameEnabled;
    $scope.bCastObjects();
  }

  $scope.toggleParamEditMode = function(classIndex,methodIndex,paramIndex){
    if($scope.objects[classIndex].methods[methodIndex].params[paramIndex].editMode){
      var newType = $('#parameEditType_'+classIndex+"_"+methodIndex+"_"+paramIndex).val();
      var newName = $('#parameEditName_'+classIndex+"_"+methodIndex+"_"+paramIndex).val();
      var newValue = $('#parameEditValue_'+classIndex+"_"+methodIndex+"_"+paramIndex).val();
      $scope.objects[classIndex].methods[methodIndex].params[paramIndex].type = newType;
      $scope.objects[classIndex].methods[methodIndex].params[paramIndex].name = newName;
      $scope.objects[classIndex].methods[methodIndex].params[paramIndex].value = newValue;

    }
    $scope.objects[classIndex].methods[methodIndex].params[paramIndex].editMode = !$scope.objects[classIndex].methods[methodIndex].params[paramIndex].editMode;
    $scope.bCastObjects();
  }

});
