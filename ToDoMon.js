// import * as PIXI from './js/pixi.js';
export { TDM };

function TDM(monsterBoxID) {

  //載入圖片
  let loader = new PIXI.Loader();
  
  loader
    .add(
      "backGroundImg",
      "https://res.cloudinary.com/luvikung/image/upload/v1607422343/vonder/grass1_bvr0if.png"
    )
    .add("tail", "toDoMonImg/todoMon_demo01.png")
    .add("rFoot", "toDoMonImg/todoMon_demo_rFoot02.png")
    .add("lFoot", "toDoMonImg/todoMon_demo_lFoot03.png")
    .add("rHand", "toDoMonImg/todoMon_demo_rHand04.png")
    .add("body", "toDoMonImg/todoMon_demo_body05.png")
    .add("lHand", "toDoMonImg/todoMon_demo_lHand06.png")
    .add("head", "toDoMonImg/todoMon_demo_face07.png")
    .load(init);

  //載入好後執行

  function init() {
    const backGroundImg = new PIXI.Sprite.from("backGroundImg");
    const tail = new PIXI.Sprite.from("tail");
    const rFoot = new PIXI.Sprite.from("rFoot");
    const lFoot = new PIXI.Sprite.from("lFoot");
    const rHand = new PIXI.Sprite.from("rHand");
    const body = new PIXI.Sprite.from("body");
    const lHand = new PIXI.Sprite.from("lHand");
    const head = new PIXI.Sprite.from("head");

    //設置畫布
    const app = new PIXI.Application({
      width: 400,
      height: 400,
      // transparent: true,
      backgroundColor: 0x1099bb,
    });

    //設置容器
    const container = new PIXI.Container();

    //畫布丟進網頁
    if (monsterBoxID)
      document.getElementById(monsterBoxID).appendChild(app.view);
    else document.body.appendChild(app.view);

    //圖片丟進容器內 (順序越前面，放越底層)
    container.addChild(tail, rFoot, lFoot, rHand, body, lHand, head);
    app.stage.addChild(backGroundImg, container);

    //設定圖片預設位置start----------
    backGroundImg.position.set(-500, 100);

    // container.position.set(30, 60);
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    container.position.set(app.view.width / 2, app.view.height / 2);

    head.position.set(170, 170);
    head.anchor.set(0.5, 0.5);

    tail.position.set(head.x, head.y + 60);
    tail.anchor.set(0.5, 0.7);

    lHand.position.set(head.x, head.y + 60);
    lHand.anchor.set(0.5, 0.7);

    rHand.position.set(head.x - 100, head.y + 60);
    rHand.anchor.set(0.2, 0.7);

    lFoot.position.set(head.x + 10, head.y + 60);
    lFoot.anchor.set(0.5, 0.7);

    rFoot.position.set(head.x - 100, head.y + 60);
    rFoot.anchor.set(0.2, 0.7);
    //設定圖片預設位置end---------------

    //漂浮預設值
    let bobbingDistance = 10;
    let bobbingHeightTop = app.view.height / 2;
    let bobbingHeightBottom = bobbingHeightTop + bobbingDistance;
    let setBobbingSpeed = 0.5;
    let bobbingSpeed = setBobbingSpeed;

    //全身漂浮
    function allMonsterBobbing(item) {
      if (item.y <= bobbingHeightTop) {
        bobbingSpeed = setBobbingSpeed;
      }
      if (item.y >= bobbingHeightBottom) {
        bobbingSpeed = -setBobbingSpeed;
      }
      item.y += bobbingSpeed;
    }

    //局部漂浮
    function monsterItemBobbing(item) {
      if (item.y <= 310) {
        bobbingSpeed = setBobbingSpeed;
      }
      if (item.y >= 320) {
        bobbingSpeed = -setBobbingSpeed;
      }
      container.y += bobbingSpeed;
    }

    //搖擺預設值
    let setWagSpeed = 0.01;
    let wagSpeed = setWagSpeed;

    //搖擺動作
    function wagMonsterItem(item) {
      if (item.rotation >= 0.1) {
        wagSpeed = -setWagSpeed;
      }
      if (item.rotation <= -0.1) {
        wagSpeed = setWagSpeed;
      }
      item.rotation += wagSpeed;
    }

    //比較強烈的搖尾巴
    let wagTailSpeed = 0.02;
    function wagMoreTail(item) {
      if (item.rotation >= 0.1) {
        wagTailSpeed = -0.02;
      }
      if (item.rotation <= -0.7) {
        wagTailSpeed = 0.02;
      }

      item.rotation += wagTailSpeed;

      setTimeout(() => {
        clearInterval(waggingTail);
      }, 1000);
    }

    //放到ticker比較難控制暫停，放這邊可以用clearInterval控制
    let controlTimer = "";
    function controlMove() {
      controlTimer = setInterval(() => {}, 15);
      //15ms是測起來比較正常的速度
    }
    controlMove();

    //幀率(每秒螢幕刷新最大次數)更新函式
    app.ticker.add(() => {
      backGroundImg.x += 0.1;
      allMonsterBobbing(container);
      wagMonsterItem(head);
      wagMonsterItem(lHand);
      wagMonsterItem(rHand);
      wagMonsterItem(lFoot);
      wagMonsterItem(rFoot);
      wagMonsterItem(tail);
    });

    //互動動作------------------------
    //  設定可互動
    container.interactive = true;

    //滑鼠變手型
    container.buttonMode = true;

    let waggingTail = "";
    container.on("pointerdown", (event) => {
      clearInterval(waggingTail);
      waggingTail = setInterval(() => wagMoreTail(tail));
    });

    //互動按鈕----------------------------

    //   adjustSize.oninput = function () {
    //     container.scale.set(adjustSize.value);
    //   };
  }
}

