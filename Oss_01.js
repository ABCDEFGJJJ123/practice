let addNumber = new Array(10);            //전화번호 저장 용량
let i = 0;

let readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let createUserNumber = function () 
{
  rl.question('추가 할 전화번호를 입력하시오: ', function (userInput) 
  {
    if (userInput == '종료')
    {
      console.log(addNumber[0]);
      console.log(addNumber[1]);
      console.log(addNumber[2]);
      console.log(addNumber[3]);

      return rl.close();
    }

    if (i > 9)
    {
      
      console.log(addNumber[9]);
      console.log(addNumber[10]);
      console.log(addNumber[11]);
      console.log(addNumber[12]);
      console.log("더 이상 저장할 수 없습니다.");
      
      return rl.close();
    }

    console.log(userInput, '를(을) 추가했습니다.\n');
    addNumber[i] = userInput;
    console.log("추가한 번호: ", addNumber[i], "\n");
    
    i++;

    createUserNumber();
  });
};

createUserNumber();