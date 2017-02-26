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
