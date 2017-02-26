



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

  $scope.mainProg = "using namespace std;\nint main(int argc, char* argv[]){\n\t\n}";
	$scope.selectedClass = 0;
	$scope.newClassName ="";
  $scope.ignore = "";
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
      "baseClasses":[],
      "baseClassInheritance":[],
      "showAddMethod":false,
			"vars":[
				{"type":"int","name":"width","value":"5","editMode":false,"access":"public"}
			],
			"showParams":false,
            "showMethods":false,
            "showData":false,
            "editNameEnabled":false,
			"methods":[
				{"access":"public","return":"void","name":"setWidth","body":"width=5;return;","editMode":false,"showParam":false,"params":[
					{"type":"int","name":"width","value":"5","editMode":false}
					]
				}
			]
		},

		{"className":"Circle",
      "baseClasses":["Shape"],
      "baseClassInheritance":["public"],
      "showAddMethod":false,
			"vars":[
				{"type":"int","name":"width","value":"5","access":"public"}
			],
      "showMethods":false,
      "showData":false,
      "editNameEnabled":false,
			"methods":[
				{"access":"public","return":"void","name":"setRadius","showParam":false,"params":[
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
   console.log('Saved!');
	}


	$scope.setShowParams = function(classIndex,methodIndex){
    $scope.objects[classIndex].showAddMethod = $scope.objects[classIndex].methods[methodIndex].showParams;
		$scope.objects[classIndex].methods[methodIndex].showParams = !$scope.objects[classIndex].methods[methodIndex].showParams;
	}

    $scope.setShowMethods = function(classIndex){
        $scope.objects[classIndex].showAddMethod = !$scope.objects[classIndex].showMethods;
        $scope.objects[classIndex].showMethods = !$scope.objects[classIndex].showMethods;
    }

    $scope.setShowData = function(classIndex){
        $scope.objects[classIndex].showData = !$scope.objects[classIndex].showData;
    }

	$scope.addClassVar = function(classIndex){
		var newVarAccess = $("#newVarAccess_"+classIndex);
		var newVarType = $("#newVarType_"+classIndex);
		var newVarName = $("#newVarName_"+classIndex);
		var newVarValue = $("#newVarValue_"+classIndex);

		$scope.objects[classIndex].vars.push({"type":newVarType.val(),"name":newVarName.val(),"value":newVarValue.val(),"access":newVarAccess.val()});
		newVarAccess.val('');
		newVarType.val('');
		newVarName.val('');
		newVarValue.val('');

		$scope.bCastObjects();
	}

	$scope.addClassMethod = function(classIndex){
		var newMethodReturn = $("#newMethodReturn_"+classIndex);
		var newMethodName = $("#newMethodName_"+classIndex);
		//var newMethodParams = $("#newMethodParams_"+classIndex);
    var newMethodBody = $("#newMethodBody_"+classIndex);
    var newMethodAccess = $("#newMethodAccess_"+classIndex);

		$scope.objects[classIndex].methods.push({"access":newMethodAccess.val(),"return":newMethodReturn.val(),"name":newMethodName.val(),"editMode":false,"showParam":false,"params":[],"body":newMethodBody.val()});

		newMethodName.val('');
		newMethodReturn.val('');
		//newMethodParams.val('');
    newMethodBody.val('');

		$scope.bCastObjects();
	}

	$scope.addClassMethodParam = function(classIndex,methodIndex){
    var newParamType = $("#newParamType_"+classIndex+"_"+methodIndex).val();
    $("#newParamType_"+classIndex+"_"+methodIndex).val("");
    var newParamName = $("#newParamName_"+classIndex+"_"+methodIndex).val();
    $("#newParamName_"+classIndex+"_"+methodIndex).val("");
    var newParamValue = $("#newParamValue_"+classIndex+"_"+methodIndex).val();
    $("#newParamValue_"+classIndex+"_"+methodIndex).val("");
    var newParam = {"type":newParamType,"name":newParamName,"value":newParamValue,"editMode":false};
    $scope.objects[classIndex].methods[methodIndex].params.push(newParam);
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
				"baseClasses":[],
        "baseClassInheritance":[],
        "showAddMethod":false,
				"vars":[],
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
      $scope.objects[classIndex].showAddMethod = true;
    }
    else{
      $scope.objects[classIndex].showAddMethod = false;
    }
    $scope.objects[classIndex].methods[methodIndex].params[paramIndex].editMode = !$scope.objects[classIndex].methods[methodIndex].params[paramIndex].editMode;
    $scope.bCastObjects();
  }

  $scope.includeClassInMain = function(classIndex) {
    var newText = $scope.objects[classIndex].className + " my"+$scope.objects[classIndex].className +" = "+$scope.objects[classIndex].className+"();";
    var txtArea = document.getElementById('mainProg');
    var start = txtArea.selectionStart
    var end = txtArea.selectionEnd
    var text = txtArea.value
    var before = text.substring(0, start)
    var after  = text.substring(end, text.length)
    txtArea.value = (before + newText + after);
    txtArea.selectionStart = txtArea.selectionEnd = start + newText.length
    txtArea.focus()
  }

  $scope.inputFile = "";
  $scope.procSessionFile = function() {
    //Retrieve the first (and only!) File from the FileList object
    var f = document.getElementById("savedSitePos").files[0];

    if (f) {
      var r = new FileReader();
      r.onload = function(e) {
	      var contents = e.target.result;
        $scope.objects = jQuery.parseJSON(contents);
        $scope.$apply();
      }
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }

  $scope.updateInheritance = function(newBaseClassIndex){
    var access = $("#inherit_"+newBaseClassIndex +" option:selected").val();
    alert(access);
    var otherClassName = $scope.objects[newBaseClassIndex].className;
    var baseIndexInSelected = $scope.objects[$scope.selectedClass].baseClasses.indexOf(otherClassName);

    if(baseIndexInSelected >= 0){
      if(access != "NONE"){
        $scope.objects[$scope.selectedClass].baseClassInheritance[baseIndexInSelected] = access;
      }
      else{
        $scope.objects[$scope.selectedClass].baseClasses.splice(baseIndexInSelected,1);
        $scope.objects[$scope.selectedClass].baseClassInheritance.splice(baseIndexInSelected,1);
      }
    }
    else{
      if(access != "NONE"){
        $scope.objects[$scope.selectedClass].baseClassInheritance.push(access);
        $scope.objects[$scope.selectedClass].baseClasses.push(otherClassName);
      }
    }
  }

});
