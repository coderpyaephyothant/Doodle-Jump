document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    // let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId ;
    let downTimerId ;
    let isJumping = true;

    function createDoodler () {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px '
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    class platform {
        constructor (newPlatBottom){
            this.bottom = newPlatBottom;
            this.left = Math.random() * 315; // grid width px  - platform width px   
            this.visual = document.createElement ('div') 
            
            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left= this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
         }
    }
    function createPlatForms () {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform =  new platform(newPlatBottom);
            platforms.push(newPlatform);
            console.log(platforms);
            // console.log(platform);
            
        }
    }

    function movePlatForm () {
        if (doodlerBottomSpace>100) {
            platforms.forEach(platform =>{
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';
            })
        }
    }

    function jump () {
        clearInterval(downTimerId);
        isJumping=true;
        upTimerId = setInterval(() => {
            doodlerBottomSpace += 10;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace>350){
                fall();
            }
        }, 30);
        
    }

    function fall () {
        clearInterval(upTimerId);
        isJumping=false;
        downTimerId = setInterval(() => {
            doodlerBottomSpace -=5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace<=0) {
                gameOver();
                
            }
            platforms.forEach(platform=>{
                if(
                    (doodlerBottomSpace>=platform.bottom)&&
                    (doodlerBottomSpace<=platform.bottom+15)&&
                    ((doodlerLeftSpace+60>=platform.left)&&
                    (doodlerLeftSpace<=platform.left+85))&&
                    ! isJumping
                )
                 {
                    console.log('landed');
                    jump();
                }
            })
        
        }, 30);
        
    }

   
    function gameOver () {
        console.log('Game Over');
        
        isGameOver= true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        
    }

    function control (event) {
        if (event.key==='ArrowLeft'){

        } else if (event.key==='ArrowRight') {

        } else if (event.key==='ArrowUp'){

        }
    }

    function start () {
        if (!isGameOver) {
            createPlatForms();
            createDoodler();
            setInterval(movePlatForm, 40);
             jump();
        }
    }
    //attach to bottom
    start();
})