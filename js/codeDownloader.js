deepScratchApp.controller("codeDownloader",function($scope, $rootScope,$http){
  $scope.testFile = "This is a test file";
  $scope.currHeaderData = "";
  $scope.currCppData = "";


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
		}
/*
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




  $scope.genFiles = function(){
    $scope.jsonToCode($scope.objects[0]);
    var a = document.getElementById("headerFile");
    var file = new Blob([$scope.currHeaderData], {type: "txt"});
    a.href = URL.createObjectURL(file);
    a.download = $scope.objects[0].className+".h";

    var a = document.getElementById("cppFile");
    var file = new Blob([$scope.currCppData], {type: "txt"});
    a.href = URL.createObjectURL(file);
    a.download = $scope.objects[0].className+".cpp";
  }


  $scope.jsonToCode = function(objectData){
    //var headerOut = $("#header");
    //var cppOut = $("#cpp");

    var finalHeaderString = "";
    var finalCppString = "";





    // ---------------------FORM HEADER FILE--------------------
    finalHeaderString += "class "+objectData.className+"{";
    // print out all class variables
    for(varIndex in objectData.vars){
      currVar = objectData.vars[varIndex];
      finalHeaderString += "\n\t"+currVar.type + " " + currVar.name +";";
    }

    // Print out methods
    for(methodIndex in objectData.methods){
      currMethod = objectData.methods[methodIndex];
      finalHeaderString += "\n\t"+currMethod.return + " " + currMethod.name +"(";

      numParams = currMethod.params.length;
      if(numParams == 0)
        finalHeaderString += ");";

      for(paramIndex in currMethod.params){
        if(paramIndex < numParams-1)
          finalHeaderString += currMethod.params[paramIndex].type + " " + currMethod.params[paramIndex].name +", ";
        else
          finalHeaderString += currMethod.params[paramIndex].type + " " + currMethod.params[paramIndex].name +");";

      }
    }


    finalHeaderString += "\n};";
    //headerOut.val(finalHeaderString);
    $scope.currHeaderData = finalHeaderString;

    // ---------------------FORM CPP FILE--------------------
    finalCppString += '#include"'+objectData.className+'.h"\n';

    // Print out methods
    for(methodIndex in objectData.methods){
      currMethod = objectData.methods[methodIndex];
      finalCppString += "\n"+currMethod.return + " "+objectData.className +"::"+ currMethod.name +"(";

      numParams = currMethod.params.length;

      if(numParams == 0)
        finalCppString += ")";

      for(paramIndex in currMethod.params){
        if(paramIndex < numParams-1)
          finalCppString += currMethod.params[paramIndex].type + " " + currMethod.params[paramIndex].name +", ";
        else
          finalCppString += currMethod.params[paramIndex].type + " " + currMethod.params[paramIndex].name +")";
      }
      finalCppString += "{\n"+currMethod.body+"\n}";
    }


    finalCppString += "\n";
    //cppOut.val(finalCppString);


    $scope.currCppData = finalCppString;


  }



});
