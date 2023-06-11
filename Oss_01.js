var i = 0;
let arrNum = 0;                      //update
let arrNum2 = 0;                           //delete

const page = Array(10);

let fir = -1;
let sec = -1;
let p = 1;    //현재 페이지

let dFir = 0;
let dSec = 0;

// 3차원 배열 페이지[(내용의 존재여부, 목록[내용의 존재 여부, 내용])*10)*10]
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
  rl.question('다음 중 고르시오.\n 1. 번호 추가, 2.번호 검색, 9.종료 \n', function (userInput) 
  {
    if (userInput == 1)
    {
      createNumber();
    }
    else if(userInput == 2)
    {
      readNumber(p);
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

let updateNumber = function(p){  //번호 수정
  rl.question("몇 번째 번호를 수정하시겠습니까?", function(userInput){
    if (userInput > 10 || userInput < 0){   //잘못된 입력값
      console.log("다시 입력해주세요.\  n");
      updateNumber(p);
    }else if (page[p-1][userInput][0] == 0) // p페이지의 userInput번째의 내용의 존재여부 확인.
    {
      //arrNum = userInput;
      rl.question("현재 ", userInput, "번 째에는 저장된 번호가 없습니다. 번호를 추가하시겠습니까? '네' 혹은 '아니요'를 입력해주세요.\n", function(userInput)
      {
        if (userInput == '네')
        {
          createNumber();
        }
        else if (userInput == '아니요') //번호 추가 여부
        {
          readNumber(p);
        }
        else{
          console.log("다시 입력해주세요.");
          updateNumber(p);
        }
      });
    }
    else if (page[p-1][userInput][0] == 1)
    {
      arrNum = userInput;
      console.log(userInput, '번째에는 ', page[p-1][userInput][1],"이(가) 존재합니다.");
      rl.question("수정하려면 번호를 입력하세요.\n취소하려면 '종료'를 입력해주세요.\n", function(userInput)
      {
        if (userInput == '종료'){
          return readNumber(p);
        }else {
          page[p-1][arrNum][1] = userInput;
          console.log(arrNum, "번째 번호를 ", page[p-1][arrNum][1], "로 수정했습니다. \n");

          readNumber(p);
        }

      });
      
    }else {
      console.log('잘못된 번호입니다.\n다시입력해 주세요.');
      return updateNumber(p);
    }
  });
}

let delNumber = function(p) //번호 삭제
{
  rl.question("몇 번째 번호를 삭제하시겠습니까?\n", function(userInput)
  {
    if(userInput > 10 || userInput < 0)
    {
      console.log("다시 입력해주세요.");
      delNumber(p);
    }else if (page[p-1][userInput][0] == 0) {
      console.log('내용이 존재하지 않습니다.\n다시입력해주세요.');
      return readNumber(p);
    }

    else if (userInput <= 10 && userInput >= 1)
    {
      arrNum2 = userInput;
      console.log(userInput, "번째 번호 : ", page[p-1][userInput][1], "을(를) 삭제했습니다.");
      page[p-1][userInput][0] = 0;
      page[p-1][userInput][1] = undefined;

      dFir = p-1;
      dSec = Number(userInput);
      rearrange(dFir,dSec);
      return readNumber(p);
    }

    else if (userInput == "아니요") //삭제여부
    {
      crudQuestion();
    }

    else{
      console.log("다시 입력해주세요.");
      delNumber();
    }
  }); //dq = deleteQuestion
};

let rearrange = function(dFir, dSec){       //재정렬 함수
  let end = 0;
  let eee = 0;
  if (dSec < 10){
    if (page[dFir][dSec+1][0] == 1){
      while(end == 0){
        while(dSec < 10 && page[dFir][dSec+1][0] == 1){
          if (dSec < 10){
            if (page[dFir][dSec+1][0] == 1){
              page[dFir][dSec][1] = page[dFir][dSec+1][1];
              page[dFir][dSec+1][1] = undefined;
              page[dFir][dSec][0] = 1;
              page[dFir][dSec+1][0] = 0;
              dSec += 1;
            }
          }else if (page[dFir][dSec+1][0] == 0) {
            end = 1;
            break;
          }
        }
        if (end == 1)break;
        if (dSec >= 10){
          if (page[dFir+1][1][0] == 1){
            page[dFir][dSec][1] = page[dFir+1][1][1];
            page[dFir+1][1][1] = undefined;
            page[dFir][dSec][0] = 1;
            page[dFir+1][1][0] = 0;
            dFir += 1;
            dSec = 1;
          }else if (page[dFir+1][1][0] == 0) {
            end = 1;
            break
          };
        }
        eee += 1;
        if (eee == 10) {
          console.log('ERROR');
          break;
        }
      }
    }

  }else if(dSec = 10) {
    if (dSec >= 10){
      console.log('체크1');
      if (page[dFir+1][1][0] == 1){
        console.log('체크2');
        page[dFir][dSec][1] = page[dFir+1][1][1];
        page[dFir+1][1][1] = undefined;
        page[dFir][dSec][0] = 1;
        page[dFir+1][1][0] = 0;
        dFir += 1;
        dSec = 1;
        console.log('체크3');
      }else if (page[dFir+1][1][0] == 0) {
        console.log('체크4');
        end = 1;
      };
    }
    if (dSec < 10){
      if (page[dFir][dSec+1][0] == 1){
        console.log('체크5');
        while(end == 0){
          while(dSec < 10 && page[dFir][dSec+1][0] == 1){
            if (dSec < 10){
              if (page[dFir][dSec+1][0] == 1){
                page[dFir][dSec][1] = page[dFir][dSec+1][1];
                page[dFir][dSec+1][1] = undefined;
                page[dFir][dSec][0] = 1;
                page[dFir][dSec+1][0] = 0;
                dSec += 1;
              }
            }else if (page[dFir][dSec+1][0] == 0) {
              end = 1;
              break;
            }
          }
          if (end == 1)break;
          if (dSec >= 10){
            if (page[dFir+1][1][0] == 1){
              page[dFir][dSec][1] = page[dFir+1][1][1];
              page[dFir+1][1][1] = undefined;
              page[dFir][dSec][0] = 1;
              page[dFir+1][1][0] = 0;
              dFir += 1;
              dSec = 1;
            }else if (page[dFir+1][1][0] == 0) {
              end = 1;
              break
            };
          }
          eee += 1;
          if (eee == 10) {
            console.log('ERROR');
            break;
          }
        }
      }
    }

  }
}
// 번호 검색 기능
let readNumber = function(p){
  console.log('[',p,'페이지.]');
  for (var i = 1; i<11; i++){
    if (page[p-1][i][0] == 1){
      console.log(i, page[p-1][i][1]);
    }else if (page[p-1][i][0] == 0)console.log(i, '내용이 없습니다.');
  }
  rl.question('1. 이전 페이지\n2. 다음 페이지\n3. 번호 수정\n4. 번호 삭제\n5. 종료\n', function(userInput){
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
    }else if (userInput == 3){
      return updateNumber(p);
    }else if (userInput == 4){
      return delNumber(p);
    }else if (userInput == 5) {
      return crudQuestion();
    }else {
      console.log('다시입력해주세요.');
      readNumber(p);
    }
  })
}

crudQuestion();
//createUserNumber();