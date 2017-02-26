deepScratchApp.controller("codeDownloader",function($scope, $rootScope,$http){
  $scope.testFile = "This is a test file";
  $scope.currHeaderData = "";
  $scope.currCppData = "";



  $scope.objects = [];

  $scope.$on("updatedObjects", function(event, args){
    $scope.objects = args.objects;
  });

  $scope.updateAllFiles = function(){
    for(i in $scope.objects){
      $scope.genFiles(i);
    }
    $scope.genMain();
    $scope.genObjectCode();
  }

  $scope.genObjectCode = function(){
    var a = document.getElementById("objectCode");
    var file = new Blob([JSON.stringify($scope.objects)], {type: "txt"});
    a.href = URL.createObjectURL(file);
    a.download = "OO_DesignSave.ood";
  }

  $scope.genMain = function(){
    var mainCode = $("#mainProg").val();
    var a = document.getElementById("mainDownload");
    var file = new Blob([mainCode], {type: "txt"});
    a.href = URL.createObjectURL(file);
    a.download = "main.cpp";
  }


  $scope.genFiles = function(objectIndex){
    $scope.jsonToCode($scope.objects[objectIndex]);
    var a = document.getElementById("headerFile_"+objectIndex);
    var file = new Blob([$scope.currHeaderData], {type: "txt"});
    a.href = URL.createObjectURL(file);
    a.download = $scope.objects[objectIndex].className+".h";

    var a = document.getElementById("cppFile_"+objectIndex);
    var file = new Blob([$scope.currCppData], {type: "txt"});
    a.href = URL.createObjectURL(file);
    a.download = $scope.objects[objectIndex].className+".cpp";
  }


  $scope.jsonToCode = function(objectData){
    var accessOptions = ["public","protected","private"];
    //var headerOut = $("#header");
    //var cppOut = $("#cpp");

    var finalHeaderString = "";
    var finalCppString = "";

    var currPart = "";


    // ---------------------FORM HEADER FILE--------------------
    finalHeaderString += "class "+objectData.className;
    var inheritPart = "";

    for(i in objectData.baseClasses){
      inheritPart += objectData.baseClassInheritance[i] + " " + objectData.baseClasses[i];
      if( i < objectData.baseClasses.length -1){
        inheritPart += ", ";
      }
    }

    if(inheritPart.length > 0){
      finalHeaderString += " : "+inheritPart +"{";
    }
    // print out all class variables

    for(i in accessOptions){
      currPart = "";
      for(varIndex in objectData.vars){
        currVar = objectData.vars[varIndex];
        if(currVar.access == accessOptions[i])
          currPart += "\n\t\t"+currVar.type + " " + currVar.name +" = "+currVar.value+";";
      }

      // Print out methods
      for(methodIndex in objectData.methods){
        currMethod = objectData.methods[methodIndex];
        if(currMethod.access == accessOptions[i]){
          currPart += "\n\t\t"+currMethod.return + " " + currMethod.name +"(";

          numParams = currMethod.params.length;
          if(numParams == 0)
            currPart += ");";

          for(paramIndex in currMethod.params){
            if(paramIndex < numParams-1)
              currPart += currMethod.params[paramIndex].type + " " + currMethod.params[paramIndex].name +", ";
            else
              currPart += currMethod.params[paramIndex].type + " " + currMethod.params[paramIndex].name +");";

          }
        }
      }
      if(currPart.length > 0){
        currPart = '\n\t'+accessOptions[i]+":\t"+currPart+"\n";
      }
      finalHeaderString += currPart;
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
