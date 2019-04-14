(function () {
    'use strict';

    const numOfPeopleInput = document.getElementById('numOfPeople');
    const numOfPeopleButton = document.getElementById('decideNumOfPeople');
    const numInputArea = document.getElementById('numInput-area');
    const nameInputArea = document.getElementById('nameInput-area');
    const resultArea = document.getElementById('result-area');



    numOfPeopleButton.onclick = () => {

        let numOfPeople = numOfPeopleInput.value;
        //入力チェック（未完成）
        if (Number.isInteger(numOfPeople)) {
            let intAlert = document.createElement('p');
            intAlert.innerText = '整数を入力してください';
            nameInputArea.appendChild(intAlert);
            return;
            //繰り返されるバグ
        } else if (numOfPeople < 0) {
            let negaAlert = document.createElement('p');
            negaAlert.innerText = '1人以上を入力してください';
            nameInputArea.appendChild(negaAlert);
            return;
        }


        console.log(numOfPeople);

        createNameInputArea(numOfPeople).onclick = () => {

            //名前入力重複チェックつけたい！
            crateSheet(numOfPeople);

            //シャッフル誘導テキスト
            let shuffle = document.createElement('p');
            shuffle.innerText = '決定ボタンを押すとシャッフル出来ます';
            resultArea.appendChild(shuffle);

        };



    }




    function createNameInputArea(number) {
        /**
        * 入力された人数分の名前入力欄を生成する関数
        * @param {number} number 出席人数
        * @return {string} 名前決定ボタン要素
        */

        //人数分の入力欄を生成
        for (let i = 0; i < number; i++) {
            //n人目
            let num = document.createElement('p');
            num.innerText = (i + 1) + '人目';
            nameInputArea.appendChild(num);

            //入力欄を生成
            let inputName = document.createElement('input');
            inputName.setAttribute('type', 'text');
            inputName.setAttribute('id', 'name' + i);
            nameInputArea.appendChild(inputName);
        }

        //名前決定ボタン<button id="decideNumOfPeople">決定</button>
        let nameOfPeopleButton = document.createElement(`button`);
        nameOfPeopleButton.setAttribute('id', 'decideNameOfPeaple');
        nameOfPeopleButton.innerHTML = "決定";
        nameInputArea.appendChild(nameOfPeopleButton);

        //人数入力エリア削除
        removeAllChildren(numInputArea);


        return nameOfPeopleButton;

    }

    /**
               * テーブルを生成して配席する関数
               * @param {number} number 人数
               */
    function crateSheet(number) {
        //初期化
        removeAllChildren(resultArea);



        //名前を受け取って配列にぶちこむ
        const nameId = new Array(number);//配列：名前要素
        const name = new Array(number);//配列：名前
        console.log('シャッフル前');
        for (let i = 0; i < number; i++) {
            nameId[i] = document.getElementById('name' + i);
            name[i] = nameId[i].value;
            console.log(name[i]);
        }

        //名前配列をランダムに並び替える
        console.log('シャッフル後');
        for (let i = name.length - 1; i >= 0; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = name[i];
            name[i] = name[r];
            name[r] = tmp;

            console.log(name[i]);
        }

        //奇数人数の場合は空席を最後に挿入
        if (name.length % 2 !== 0) {
            name.push('空席');
            console.log(name[number]);
        }


        //テーブル生成
        let table = document.createElement('table');
        table.setAttribute('border', 1)
        resultArea.appendChild(table);

//2列生成し1列あたりに人数の半分配席
        
        if (number % 2 === 0) {
            let tableRow1 = document.createElement('tr');
            table.appendChild(tableRow1);
            for (let i = 0; i <= (number / 2)-0.5; ++i) {
                let td = document.createElement('td');
                td.innerText = name[i];
                tableRow1.appendChild(td)
            }
            let tableRow2 = document.createElement('tr');
            table.appendChild(tableRow2);
            for (let i = number / 2; i < number; ++i) {
                let td = document.createElement('td');
                td.innerText = name[i];
                tableRow2.appendChild(td)
            }
        } else {
            let tableRow1 = document.createElement('tr');
            table.appendChild(tableRow1);
            for (let i = 0; i <= (number / 2); ++i) {
                let td = document.createElement('td');
                td.innerText = name[i];
                tableRow1.appendChild(td)
            }
            let tableRow2 = document.createElement('tr');
            table.appendChild(tableRow2);
            for (let i = (number / 2) + 0.5; i <= number; ++i) {
                let td = document.createElement('td');
                td.innerText = name[i];
                tableRow2.appendChild(td)
            }
        }



    }

    /**
           * 指定した要素の子どもを全て削除する
           * @param {HTMLElement} element HTMLの要素
           */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

    }

})()
