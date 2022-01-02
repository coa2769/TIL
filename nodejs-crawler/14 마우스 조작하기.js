//5-6 마우스 조작하기
//puppeteer로 연 브라우저에서 움직이는 가상 마우스는 사용자에게 잘 보이지 않는다.
//아래의 url 코드로 가상 마우스의 움직임을 볼 수 있다.
//https://github.com/ZeroCho/nodejs-crawler/blob/master/8.facebook-login-logout/index.js

//page.mouse : 브라우저에서 마우스를 조작하는 함수를 지원한다.
//page.mouse.move : 브라우저의 해당 위치로 마우스가 움직인다.
//page.mouse.down : 브라우저 안에서 마우스를 누른 상태로 변경해준다. (드레그에 쓰인다.)
//page.mouse.click : 브라우저의 해당 위치에 마우스 클릭을 할 수 있다.

const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
dotenv.config(); //.env파일에 작성한 환경변수를 불러와 process.env 에 구성한다.

const crawler = async ()=>{
    try{
        const browser = await puppeteer.launch({headless : false, args:['--window-size=1920,1080', '--disable-notifications']});
        const page = await browser.newPage();
        await page.setViewport({
            width : 1080,
            height : 1080
        });
        
        await page.goto('https://facebook.com');
        const id = process.env.EMAIL;
        const password = process.env.PASSWORD;
        await page.evaluate(() => {
          (() => {
            const box = document.createElement('div');
            box.classList.add('mouse-helper');
            const styleElement = document.createElement('style');
            styleElement.innerHTML = `
              .mouse-helper {
                pointer-events: none;
                position: absolute;
                z-index: 100000;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                background: rgba(0,0,0,.4);
                border: 1px solid white;
                border-radius: 10px;
                margin-left: -10px;
                margin-top: -10px;
                transition: background .2s, border-radius .2s, border-color .2s;
              }
              .mouse-helper.button-1 {
                transition: none;
                background: rgba(0,0,0,0.9);
              }
              .mouse-helper.button-2 {
                transition: none;
                border-color: rgba(0,0,255,0.9);
              }
              .mouse-helper.button-3 {
                transition: none;
                border-radius: 4px;
              }
              .mouse-helper.button-4 {
                transition: none;
                border-color: rgba(255,0,0,0.9);
              }
              .mouse-helper.button-5 {
                transition: none;
                border-color: rgba(0,255,0,0.9);
              }
              `;
            document.head.appendChild(styleElement);
            document.body.appendChild(box);
            document.addEventListener('mousemove', event => {
              box.style.left = event.pageX + 'px';
              box.style.top = event.pageY + 'px';
              updateButtons(event.buttons);
            }, true);
            document.addEventListener('mousedown', event => {
              updateButtons(event.buttons);
              box.classList.add('button-' + event.which);
            }, true);
            document.addEventListener('mouseup', event => {
              updateButtons(event.buttons);
              box.classList.remove('button-' + event.which);
            }, true);
            function updateButtons(buttons) {
              for (let i = 0; i < 5; i++)
                box.classList.toggle('button-' + i, !!(buttons & (1 << i)));
            }
          })();
        });
        await page.type('#email', process.env.EMAIL);
        await page.type('#pass', process.env.PASSWORD);
        await page.hover('._42ft._4jy0._6lth._4jy6._4jy1.selected._51sy');
        await page.mouse.move(800, 300);
        await page.waitFor(1000);
        await page.mouse.click(800, 300);
        
    }catch(e){
        console.error(e);
    }
};

crawler();