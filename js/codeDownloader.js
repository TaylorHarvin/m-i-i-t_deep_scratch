deepScratchApp.controller("codeDownloader",function($scope, $rootScope,$http){
  $scope.testFile = "This is a test file";
  $scope.currHeaderData = "";
  $scope.currCppData = "";


  $scope.objects = [
    {"className":"Shape",
      "vars":[
        {"type":"int","name":"width","value":"5"}
      ],
      "showParams":false,
      "methods":[
        {"return":"void","name":"setWidth","params":[
          {"type":"int","name":"width","value":"5"}
          ],
          "content":""
        }
      ]
    },
    {"className":"Circle",
      "vars":[
        {"type":"float","name":"rad_ius","value":"2"},
        {"type":"float","name":"diameter","value":"4"},
        {"type":"float","name":"area","value":"50"},
        {"type":"float","name":"circumference","value":"5"},
        {"type":"string","name":"id","value":"Circle1"},
        {"type":"string","name":"color","value":"blue"},
      ],
      "showParams":false,
      "methods":[
        {"return":"void","name":"setRadius","params":[
               {"type":"float","name":"radius","value":"0"}
          ],
          "content":"\tradius = newRad;"
        },
        {"return":"float","name":"calcArea","params":[],
          "content":"\tarea = 3.12*pow(radius,2);\n"+
              "\tif(area > 5.0)\n"+
              '\t\tcolor = "blue";\n'+
              "\telse\n"+
              '\t\tcolor = "green"\n' +
              "\treturn area;"
        }
      ]
    }
  ];




  $scope.genFiles = function(){
    $scope.jsonToCode($scope.objects[1]);
    var a = document.getElementById("headerFile");
    var file = new Blob([$scope.currHeaderData], {type: "txt"});
    a.href = URL.createObjectURL(file);
    a.download = $scope.objects[1].className+".h";

    var a = document.getElementById("cppFile");
    var file = new Blob([$scope.currCppData], {type: "txt"});
    a.href = URL.createObjectURL(file);
    a.download = $scope.objects[1].className+".cpp";
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


    finalHeaderString += "\n}";
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
      finalCppString += "{\n"+currMethod.content+"\n}";
    }


    finalCppString += "\n";
    //cppOut.val(finalCppString);


    $scope.currCppData = finalCppString;


  }



});
