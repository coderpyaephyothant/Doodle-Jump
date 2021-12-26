document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let startPoint = 150;
    let doodlerLeftSpace = startPoint;
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId ;
    let downTimerId ;
    let isJumping = false;
    let isMovingLeft = true;
    let isMovingRight = true;
    let leftTimerId;
    let RightTimerId;
    let score = 0;


    function createDoodler () {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left
        doodler.style.left = doodlerLeftSpace + 'px '
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }
    // javascript class for grid and creating platforms....
    class Platform {
        constructor (newPlatBottom){
            this.bottom = newPlatBottom;
            this.left = Math.random() * 315; // grid width px  - platform width px   
            this.visual = document.createElement ('div') 
            
            const visual = this.visual; //div
            visual.classList.add('platform');
            visual.style.left= this.left + 'px'; // adding pixel unit
            visual.style.bottom = this.bottom + 'px'; // adding pixel unit
            grid.appendChild(visual);
         }
    }
    function createPlatForms () {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform =  new Platform(newPlatBottom);
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

                if (platform.bottom<13) {
                    let firstVisualPlatform = platforms[0].visual;
                    firstVisualPlatform.classList.remove('platform');
                    platforms.shift();
                    score  ++ ;
                    console.log(platforms);
                    let newPlatform = new Platform (600);
                    platforms.push(newPlatform);


                }
            })
        }
        
    }

    function jump () {
        clearInterval(downTimerId);
        isJumping=true;
        upTimerId = setInterval(() => {
            doodlerBottomSpace += 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace>startPoint+200){
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
                    startPoint=doodlerBottomSpace //variable start point and jump height calculate
                    jump();
                }
            })
        
        }, 30);
        
    }

   
    function gameOver () {
        console.log('Game Over');
        while (grid.firstElementChild){
            console.log(grid.childNodes[0])
            grid.removeChild(grid.childNodes[0]);
        }
        const scorediv = document.createElement('div');
        scorediv.innerHTML= 'Your Score : ' + score  ;
        grid.appendChild(scorediv)
        
        isGameOver= true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(RightTimerId);
        
    }

    function control (event) {
        if (event.key==='ArrowLeft'){
            moveLeft();  //move left

        } else if (event.key==='ArrowRight') {
            moveRight(); //move right

        } else if (event.key==='ArrowUp'){
            moveStraight(); //move up

        }
    }

    function moveLeft () {
        if (isMovingRight){
            clearInterval(RightTimerId)
        isMovingRight=false;
        }
        isMovingLeft= true;
        leftTimerId = setInterval(()=>{
            if (doodlerLeftSpace>=0){
                doodlerLeftSpace -=5;
                doodler.style.left = doodlerLeftSpace + 'px';
            }else{
                moveRight();
            }
            
        },30)
    }

    function moveRight () {
        if (isMovingLeft){
            clearInterval(leftTimerId);
            isMovingLeft=false;
        }
        isMovingRight= true;
        RightTimerId = setInterval(() => {
            if (doodlerLeftSpace<=340){
                doodlerLeftSpace +=5;
                doodler.style.left = doodlerLeftSpace + 'px';
            }else{
                moveLeft();
            }
            
        }, 30);
    }

    function moveStraight () {
        isMovingLeft = false;
        isMovingRight = true;
        clearInterval(RightTimerId);
        clearInterval(leftTimerId);
    }

    function start () {
        if (!isGameOver) {
            createPlatForms();
            createDoodler();
            setInterval(movePlatForm, 50);
            jump();
            document.addEventListener('keyup',control);
        }
    }
    //attach to bottom
    start();
})