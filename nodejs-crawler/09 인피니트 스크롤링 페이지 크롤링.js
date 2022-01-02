 //4-1 ~ 4-3
/*
# 인피니트 스크롤링
무한히 스크롤을 내릴 수 있으며 스크롤 끝에 도달했을 때 서버에서 데이터를 계속 로드해 오는 페이지

    [ 크롤링 할 때 어려운점 ]
    스크롤을 내려야만 다음 컨텐츠를 가져오기 때문에 어렵다.


# Postman
서버로 요청을 보내어 답정을 테스트할 때 쓰이는 테스트 도구.
이번 강의에서는 크롤링할 웹 페이지가 간단한지 판변할 때 쓰인다.
Postman의 Preview로 하면을 확인하면 크롤러가 보게되는 화면을 볼 수 있다.


[ 이번 강의에서 해결할 문제 ]
    unsplash.com
    => 브라우저로 요청했을 때는 문제없던 페이지가 Postman으로 요청하니 이미지와 컨텐츠를 전혀 가져오지 못한다.
    => SPA에서 자주 볼수 있는 문제이다.
    => Webpack으로 class 명들이 암호화 되어 있다. 이런 경우 class명이 자주 바뀌기도 하므로 체크해줘야 한다.

*/

const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

fs.readdir('imgs', (err)=>{
    if(err){
        console.error('imgs 폴더가 없어 imgs 폴더를 생성합니다.');
        fs.mkdirSync('imgs');
    }
});

const crawler = async ()=>{
    try{
        const browser = await puppeteer.launch({headless : false});
        const page = await browser.newPage();
        await page.goto('https://unsplash.com');
        let result = [];

        while(result.length <= 30){
            let srcs = await page.evaluate(()=>{
                //0. 스크롤을 맨 위로 올린다.
                //scrollBy : 상대 좌표
                //scrollTo : 절대 좌표
                window.scrollTo(0, 0);

                let imgs = [];
                const imgEls = document.querySelectorAll('._6IG7');
                if(imgEls.length){
                    imgEls.forEach((v)=>{
                        //1. 이미지 소스를 얻음
                        let src = v.querySelector('img.oCCRx').src;
                        if(src){
                            imgs.push(src);
                        }
                        //2. 해당 tag를 삭제
                        v.parentElement.removeChild(v);
                    });
                }
    
                //3. 스크롤을 내리는 동작을 한다.
                //기존 로드한 tag는 삭제되었으므로 조금만 내려도 다음 컨텐츠를 가져오게 된다.
                window.scrollBy(0, 300);
                return imgs;
            });

            result = result.concat(srcs);

            //waitForSelector : 선택자에 해당하는 태그가 로딩될 때 까지 기다림.
            //만약 30간 기다린 후 선택자를 못 찾으면 timeout 에러가 된다.
            await page.waitForSelector('._6IG7');
            console.log('태그 로딩 완료!');

        }

        console.log(result.length);
        result.forEach(async(src)=>{
            const imgResult = await axios.get(src.replace(/\?.*$/, ''),{ 
                responseType : 'arraybuffer'
            });

            fs.writeFileSync(`imgs/${new Date().valueOf()}.jpeg`, imgResult.data);
        });

        //page, browser 닫기
        await page.close();    
        await browser.close();
    }catch(e){
        console.error(e);
    }
}

crawler();
