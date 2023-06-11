let addNumber = new Array(10);            //전화번호 저장 용량
var i = 0;
let arrNum = 0;                      //update
let arrNum2 = 0;                           //delete

const page = Array(10);

let fir = -1;
let sec = -1;
let p = 1;

for (var i =0; i < 10; i++){
  page[i] = new Array(11);
  page[i][0] = 0;
  for (var j = 0; j < 10; j++) {
    page[i][j+1] = new Array(2);
    page[i][j+1][0] = 0;
  }
}
page[0][0] = 1;

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
    else if(userInput == 2)
    {
      readNumber(p)
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

let createNumber = function () {
  if (page[9][10][1] == 0){  //가득 찼을때 나오는 문구.
    console.log("저장공간이 꽉 찼습니다. 추가로 저장하시려면 기존 전화번호를 삭제해야됩니다.");
    rl.question("삭제하시겠습니까?\n 삭제를 원하시면 '네' 원하지 않으면 '아니요'를 입력해주세요.\n", function (full) {
      if (full == '네'){
        return delNumber();
      }else if(full == '아니요'){
        console.log('메뉴로 돌아갑니다.');
        return crudQuestion();
      }
    });
  }
  let end = 0;
  rl.question('추가할 전화번호를 입력해주세요. \n메뉴로 돌아가시려면 \'종료\'를 입력해주세요.\n', function (userInput) {
    if (userInput == '종료') {
      return crudQuestion();
    }else{
      if (page[0][1][0] == 0) { // 첫 페이지 첫번째 내용의 여부가 0 이면 1로 만들어줌.
        page[0][1][0] = 1;
        fir = 0;
        sec = 1;
      }else{
          for (var i = 10; i > 0; i--){
            if (page[i-1][0] == 1) {
              for (var j = 11; j > 1; j--){
                if (page[i-1][j-1][0] == 1){
                  fir = i-1;
                  sec = j;
                  if (sec > 10){
                    sec = 1;
                    fir += 1;
                    page[fir][0] = 1;
                  }
                  end = 1;
                  break;
                  }
                }
              }if (end == 1){
                break;
              }
          }
      }
      if (fir != -1){
        page[fir][sec][1] = String(userInput);
        page[fir][sec][0] = 1;
        console.log(userInput, '이(가) ',fir+1,'페이지 ', sec,'번째에 추가되었습니다.');
      }else{
        console.log('ERROR');
      }
      return createNumber();
    }
  })
}

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

let readNumber = function(p){
  console.log('[',p,'페이지.]');
  for (var i = 1; i<11; i++){
    if (page[p-1][i][0] == 1){
      console.log(i, page[p-1][i][1]);
    }else if (page[p-1][i][0] == 0)console.log(i, '내용이 없습니다.');
  }
  rl.question('이전 페이지 : 1\n다음 페이지 : 2\n메뉴로 돌아가기 : 3\n', function(userInput){
    if (userInput == 1){
      if (p <= 1) {
        console.log('이전 페이지가 없습니다.');
        return readNumber(p);
      }else {
        p -= 1;
        console.log('[',p,'페이지.]');
        for (var i = 1; i<11; i++){
          if (page[p-1][i][0] == 1){
            console.log(i, page[p-1][i][1]);
          }else if (page[p-1][i][0] == 0)console.log(i, '내용이 없습니다.');
        }
        return readNumber(p);
    }
    }else if(userInput == 2){
      if (p >= 10) {
        console.log('다음 페이지가 없습니다.');
        return readNumber(p);
      }else {
        p += 1;
        console.log('[',p,'페이지.]');
        for (var i = 1; i<11; i++){
          if (page[p-1][i][0] == 1){
            console.log(i, page[p-1][i][1]);
          }else if (page[p-1][i][0] == 0)console.log(i, '내용이 없습니다.');
        }
        return readNumber(p);
      }
    }else if (userInput == '3'){
      return crudQuestion();
    }else {
      console.log('다시입력해주세요.');
    }
  })
}

crudQuestion();
//createUserNumber();

