//7-4 반복 작업 수행하기

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{

    
    try{
        await db.sequelize.sync();
        let browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
        let page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        await page.goto('https://facebook.com');
        //1. 페이스 북 로그인
        await page.type('#email', process.env.EMAIL);
        await page.type('#pass', process.env.PASSWORD);
        await page.click('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
        await page.waitForResponse((response)=>{            
            return response.url().includes('login_attempt');
        });
        await page.keyboard.press('Escape');
        
        let result = [];
        while(result.length < 10){

            //2. 포스트가 띄워질 때까지 기다린다.
            await page.waitForSelector('[id^=hyperfeed_story_id]:first-child');
            //3. 포스트에 접근해 아이디, 게시글, 작성자, 이미지를 가져온다.
            const newPost = await page.evaluate(()=>{
                //3.1. 첫번째 포스트 가져오기
                const firtstFeed = document.querySelector('[id^=hyperfeed_story_id]:first-child');
                //3.2. 작성자 이름 가져오기
                const name = firtstFeed.querySelector('.fwb.fcg') && firtstFeed.querySelector('.fwb.fcg').textContent;
                //3.3. 포스트 내용 가져오기
                const content = firtstFeed.querySelector('.userContent') && firtstFeed.querySelector('.userContent').textContent;
                //3.4. 포스트 아이디 가져오기
                //split : 구분자로 여러 개의 문자열로 나눈다. (['', ''] 형식으로 반환)
                //slice : 매개변수로 index값인 begin과 end를 받는다. begin부터 end까지 얕은 복사하여 새로운 배열 객체 반환.(-1은 배열의 끝이다.);
                const postId = firtstFeed.id.split('_').slice(-1)[0];
                //3.5. 이미지 url 가져오기
                const img = firstFeed.querySelector('[class=mtm] img') && firstFeed.querySelector('[class=mtm] img').src;
                return {
                    name, content, postId, img,
                }
            });

            //4. 포스트에 좋아요 버튼 누르기
            const likeBtn = await page.$('[id^=hyperfeed_story_id]:first-child._666k a');
            await page.evaluate((like)=>{
                //sponsor.textContent에 해당 문자열이 있으면 광고이므로 좋아요를 누르지 않는다.
                const sponsor = document.querySelector('[id^=hyperfeed_story_id]:first-child')
                .textContent.includes('SpSpSononSsosoSredredSSS');

                if(!sponsor && like.getAttribute('aria-pressed') === 'false'){
                    like.click();
                }else if(sponsor && like.getAttribute('aria-pressed') === 'true'){
                    like.click();
                }
            }, likeBtn);

            await page.waitFor(1000);
            //5. 컨텐츠를 다 가져온 first-child 포스트는 삭제한다.
            await page.evaluate(()=>{
                const firstFeed = document.querySelector('[id^=hyperfeed_story_id]:first-child');
                firstFeed.parentNode.removeChild(firstFeed);
            });
            await page.waitFor(1000);
        }


        await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();
