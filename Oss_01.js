let addNumber = new Array(10);            //전화번호 저장 용량
let i = 0;
let arrNum = 0;                      //update
let arrNum2 = 0;                           //delete

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
      createNumber();
    }
    else if(userInput == 3)
    {
      updateNumber();
    }
    else if (userInput == 4)
    {
      delNumber();
    }
    else if(userInput == "종료" || userInput == 9)
    {
      console.log("종료됩니다.");
      return rl.close();
    }

    else
    {
      console.log("다시 입력해주세요.\n");
      crudQuestion();
    }
    
  });
};

let createNumber = function ()  //번호 추가
{
  rl.question('추가할 전화번호를 입력해주세요. \n메뉴로 돌아가시려면 \'종료\'를 입력해주세요.\n', function (userInput) 
  {
    if (userInput == "종료")
    {
      //console.log("0번 째 번호: ", addNumber[0]);
      return crudQuestion();
    }

    if (i > 9)
    {
      
      console.log(i, "번째 번호", addNumber[i]);
      
      console.log("저장공간이 꽉 찼습니다. 추가로 저장하시려면 기존 전화번호를 삭제해야됩니다.");
      console.log("삭제하시겠습니까?\n 삭제를 원하시면 '네' 원하지 않으면 '아니요'를 입력해주세요.");
      delNumber();

      //return rl.close();
    }
    
    if (i < 10)
    {
    console.log(i, " 번째에 ", userInput, '를(을) 추가했습니다.\n');
    addNumber[i] = userInput;
    console.log("추가한 번호: ", addNumber[i]);
    i++;
    createNumber();
    }
    
    //i++;    
  });
};

let updateNumber = function()  //번호 수정
{
  console.log("번호를 수정하시겠습니까? '네' 혹은 '아니요'를 입력해주세요. ");

  rl.question("", function(userInput)
  {

    if (userInput == '네')
    {

      rl.question("몇 번째 번호를 수정하시겠습니까?", function(userInput)
      {

        if (userInput >= addNumber.length || userInput < 0)
        {

          console.log("다시 입력해주세요.\n");
          updateNumber();
        }

        else if (!(userInput >= addNumber.length || userInput < 0) && (addNumber[userInput] == undefined))
          {
            //arrNum = userInput;
            console.log("현재 ", userInput, "번 째에는 저장된 번호가 없습니다. 번호를 추가하시겠습니까? '네' 혹은 '아니요'를 입력해주세요.\n");

            rl.question("", function(userInput)
            {

              if (userInput == '네')
              {
                crtNum();
              }

              else if (userInput == '아니요')
              {
                crudQuestion();
              }

              else{
                console.log("다시 입력해주세요.");
                updateNumber();
              }

            });

          }

        else if (!(userInput >= addNumber.length || userInput < 0))
        {
          arrNum = userInput;
          console.log("arrNum: ", arrNum);

          addNumber.splice(userInput, 1, undefined);

          rl.question("기존 번호가 삭제되었습니다. 새 전화번호를 입력해주세요.\n", function(userInput)
          {
            addNumber[arrNum] = userInput;
            console.log(arrNum, "번째 번호를 ", addNumber[arrNum], "로 수정했습니다. \n");
            console.log("현재 번호 정보: ", addNumber[arrNum]);

            crudQuestion();

          });
          
          
        }

        
      });

    }

    else if(userInput == '아니요')
    {
      crudQuestion();
    }

    else{
      console.log("다시 입력해주세요.");
      updateNumber();
    }

  });

};




let delNumber = function() //번호 삭제
{
  console.log("정말 삭제하기를 원하십니까? '네' 혹은 '아니요'를 입력해주세요. ");

  rl.question("", function(userInput)
  {
    if (userInput == "네")
    {
      rl.question("삭제한 자리에 새 번호를 추가하시겠습니까? '네' 혹은 '아니요'를 입력해주세요.\n", function(userInput)
      {
        if (userInput == '네')
        {
          rl.question("몇 번째 번호를 삭제하시겠습니까?\n", function(userInput)
          {
            if(userInput >= addNumber.length || userInput < 0)
            {
              console.log("다시 입력해주세요.");
              delNumber();
            }

            else if (!(userInput >= addNumber.length || userInput < 0))
            {
              arrNum2 = userInput;
              console.log(userInput, "번째 번호 : ", addNumber[userInput], "을(를) 삭제했습니다.");
              addNumber.splice(userInput, 1, undefined);
              crtNum();
            }
            
          });
        }

        else if(userInput == '아니요')
        {
          crudQuestion();
        }

        else{
          console.log("다시 입력해주세요.\n");
          delNumber();
        }
      });

    }
    

    else if (userInput == "아니요")
    {
      crudQuestion();
    }

    else{
      console.log("다시 입력해주세요.");
      delNumber();
    }
  }); //dq = deleteQuestion
};

let crtNum = function()
{
  rl.question("추가할 번호를 입력해주세요.", function(userInput)
  {
    addNumber[arrNum2] = userInput;
    console.log(arrNum2, "번째에 ", addNumber[arrNum2], "를 추가했습니다.");
    console.log("현재 번호 정보: ", addNumber);

    crudQuestion();
  });
}

crudQuestion();
//createUserNumber();

