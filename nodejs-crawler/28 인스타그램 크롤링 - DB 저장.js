//8-5 인스타 하트 클릭과 DB 저장
//UI가 제대로 작동했는지 네트워크 요청으로 꼭 확인해보길 바란다.(실제로 작동하지 않을 때도 있기 때문에)

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

const db = require('./models');
dotenv.config(); 

const crawler = async ()=>{

    
    try{
        await db.sequelize.sync();
        //userDataDir에 폴더 경로 지정
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

        //반복해서 10개의 포스트 가져오기
        let result = [];
        let prevPostId = '';
        while(result.length < 0){
            //더보기 버튼을 눌러 포스트 전체 가져오기 (있을 때만)
            const moreButton = await page.$('button.sXUSN'); // 더보기 버튼 클릭
            if (moreButton) {
            await page.evaluate((btn) => btn.click(), moreButton);
            }

            //포스트 가져오기
            const newPost = await page.evaluate(() => {
                //가져올 포스트 찾기
                const article = document.querySelector('article:first-child');
                //해당 포스트의 id 가져오기
                const postId = article.querySelector('.c-Yi7') && article.querySelector('.c-Yi7').href.split('/').slice(-2, -1)[0];
                //해당 포스트의 이름 가져오기
                const name = article.querySelector('h2') && article.querySelector('h2').textContent;
                //해당 포스트의 이미지 가져오기
                const img = article.querySelector('.KL4Bh img') && article.querySelector('.KL4Bh img').src;
                //해당 포스트의 컨텐츠 가져오기
                const content = article.querySelector('.C4VMK > span') && article.querySelector('.C4VMK > span').textContent;

                return {
                    postId, name, img, content, comments,
                }
            });

            //여태까지 가져온 적이 없는 포스트라면 저장
            //이전에 가져온 포스트와 다른 것인가?
            if (newPost.postId !== prevPostId) {
                //가져온 포스트가 result에 없는 것인가?
                if(!result.find((v)=>v.postId === newPost.postId)){
                    //3. 이전에 DB에 저장된 적이 없다면 result에 추가
                    const exist = await db.Instagram.findOne({ where: { postId: newPost.postId } });
                    if (!exist) {
                      result.push(newPost);
                    }
                }
            }

            //1. 좋아요 버튼 누르기
            await page.evaluate(() => {
                const article = document.querySelector('article:first-child');
                const heartBtn = article.querySelector('.coreSpriteHeartOpen span');
                //1.1. 채워지지 않은 하트라면 좋아요 버튼 누르기
                if (heartBtn.className.includes('outline')) {
                  heartBtn.click();
                }
            });

            //이전 포스트를 업데이트
            prevPostId = newPost.postId;

            //다음 컨텐츠를 불러오기 위해 스크롤을 조금씩 내림.
            await page.evaluate(() => {
                window.scrollBy(0, 800);
            });
        }
    
        //2. DB에 저장
        await Promise.all(result.map((r) => {
            return db.Instagram.create({
              postId: r.postId,
              media: r.img,
              writer: r.name,
              content: r.content,
            });
        }));

        await db.sequelize.close();
    }catch(e){
        console.error(e);
    }
};

crawler();