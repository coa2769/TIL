//8-3 인스타그램 태그 분석(virtualized list)
//# virtualized list
//+ 스크롤하여 넘어간 포스트는 리스트에서 삭제하고
//+ 삭제한 갯수만큼 리스트에 새로운 포스트를 추가한다.
//+ 보여주는 리스트의 개수를 일정하게 유지한다.
//+ 메모리를 아끼기 위해 사용되는 방법

//- virtaulized list 때문에 페이스북의 크롤링 방법을 그대로 사용할 수 없다.
//- 공유하기 ui나 버튼에서 게시글의 id를 찾기가 쉽다.
//  - 해당 버튼을 눌렀을 때 해당 게시글만 나오도록 이동한다면 그 ui에서 id를 찾아보자.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{

    
    try{
        await db.sequelize.sync();
        //1. userDataDir에 폴더 경로 지정
        let browser = await puppeteer.launch({
            headless : false, 
            args:['--window-size=1920,1080', '--disable-notifications'],
            userDataDir : 'C:\Users\clnme\AppData\Local\Google\Chrome\User Data\Default',
        });
        let page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://www.instagram.com/?hl=ko');

        if (await page.$('a[href="/zerohch0/"]')) {
            console.log('이미 로그인 되어 있습니다.');
        } else {
            //'facebook으로 로그인' 버튼을 클릭
            await page.waitForSelector('button.L3NKy');
            await page.click('button.L3NKy');
            //facebook 로그인 페이지로 리다이렉트되는 것을 기다린다.
            await page.waitForNavigation();
            //facebook에서 로그인
            await page.waitForSelector('#email');
            await page.type('#email', process.env.EMAIL);
            await page.type('#pass', process.env.PASSWORD);
            await page.waitForSelector('#loginbutton');
            await page.click('#loginbutton');
            //instagram 페이지로 리다이렉트되는 것을 기다린다.
            await page.waitForNavigation();
            console.log('로그인 완료');
        }

        const newPost = await page.evaluate(() => {
            //1. 가져올 포스트 찾기
            const article = document.querySelector('article:first-child');
            //2. 해당 포스트의 id 가져오기
            const postId = article.querySelector('.c-Yi7') && article.querySelector('.c-Yi7').href.split('/').slice(-2, -1)[0];
            //3. 해당 포스트의 이름 가져오기
            const name = article.querySelector('h2') && article.querySelector('h2').textContent;
            //4. 해당 포스트의 이미지 가져오기
            const img = article.querySelector('.KL4Bh img') && article.querySelector('.KL4Bh img').src;
            //5. 해당 포스트의 컨텐츠 가져오기
            const content = article.querySelector('.C4VMK > span') && article.querySelector('.C4VMK > span').textContent;

            return {
                postId, name, img, content, comments,
            }
        });

        console.log(newPost);
    
        await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();