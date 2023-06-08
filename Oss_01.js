let addNumber = new Array(10);            //전화번호 저장 용량
let i = 0;

let readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let crudQuestion = function () 
{
  rl.question('다음 중 고르시오.\n 1. 번호 추가, 2.번호 검색, 3. 번호 수정, 4. 번호 삭제, 9.종료 \n', function (userInput) 
  {
    if (userInput == 1)
    {
      createUserNumber();
    }
    else if (userInput == 4)
    {
      deleteUserNumber();
    }
    else if(userInput == "종료" || userInput == 9)
    {
      return rl.close();
    }

    else
    {
      console.log("다시 입력해주세요.\n");
      crudQuestion();
    }
    
  });
};

let createUserNumber = function () 
{
  rl.question('추가할 전화번호를 입력해주세요. \n', function (userInput) 
  {
    if (userInput == "종료")
    {
      //console.log("0번 째 번호: ", addNumber[0]);
      
      return rl.close();
    }

    if (i > 9)
    {
      
      console.log(i, "번째 번호", addNumber[i]);
      
      console.log("저장공간이 꽉 찼습니다. 추가로 저장하시려면 기존 전화번호를 삭제해야됩니다.");
      console.log("삭제하시겠습니까?\n 삭제를 원하시면 '네' 원하지 않으면 '아니요'를 입력해주세요.");
      deleteUserNumber();

      //return rl.close();
    }
    
    if (i < 10)
    {
    console.log(i, " 번째에 ", userInput, '를(을) 추가했습니다.\n');
    addNumber[i] = userInput;
    console.log("추가한 번호: ", addNumber[i]);
    i++;
    createUserNumber();
    }
    
    //i++;    
  });
};

let deleteUserNumber = function()
{
  console.log("정말 삭제하기를 원하십니까? '네' 혹은 '아니요'를 입력해주세요. ");

  rl.question("", function(userInput)
  {
    if (userInput == "네")
    {
      rl.question("몇 번째 번호를 삭제하시겠습니까?\n", function(userInput)
      {
        if (userInput)
        {
          console.log(userInput, "번째 번호 : ", addNumber[userInput], "을(를) 삭제했습니다.");
          addNumber.splice(userInput, 1, undefined);
          console.log(addNumber);
        }

        crudQuestion();
      });
    }

    else if (userInput == "아니요")
    {
      crudQuestion();
    }

    else{
      console.log("다시 입력해주세요.");
      deleteUserNumber();
    }
  }); //dq = deleteQuestion

  
  // rl.dq2("몇 번째 번호를 삭제하시겠습니까?\n", function(userInput)
  // {
  //   if (userInput)
  //   {
  //     console.log(userInput, "번째 번호 : ", addNumber[userInput], "을(를) 삭제했습니다.");
  //     addNumber.splice(userInput, 1, undefined);
  //   }
  // }); //dq = deleteQuestion
};

crudQuestion();
//createUserNumber();

