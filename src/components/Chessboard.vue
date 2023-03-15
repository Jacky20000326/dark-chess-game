<template>
  <div>
    <div class="dark-chess-game">
      <h1>Dark Chess Game</h1>
      <div class="chessboard-container">
        <div
          v-for="(item, index) in imageIndexArr"
          :id="'chess-' + index"
          class="chessboard-block"
          :key="index"
          @click="chooseChess(item, index)"
        >
          <img
            v-show="item.state"
            :class="{ isActive: item.activeState }"
            :src="getChessUrl(item.index, item.isOpen)"
            alt=""
          />
        </div>
      </div>
    </div>
    <Player
      :play1Score="play1.eatChessCount"
      :gameState="gameState"
      :play2Score="play2.eatChessCount"
    />
  </div>
</template>

<script setup>
import Player from "./Player.vue";
import { ref, onMounted, watch } from "vue";
import useAdjacentChess from "../CustomHook/useAdjacentChess";

let ChessCategory = ref([
  {
    value: "將",
    quantity: 1,
    id: 1,
  },
  {
    value: "士",
    quantity: 2,
    id: 2,
  },
  {
    value: "象",
    quantity: 2,
    id: 3,
  },
  {
    value: "車",
    quantity: 2,
    id: 4,
  },
  {
    value: "馬",
    quantity: 2,
    id: 5,
  },

  {
    value: "炮",
    quantity: 2,
    id: 6,
  },
  {
    value: "卒",
    quantity: 5,
    id: 7,
  },
  {
    value: "帥",
    quantity: 1,
    id: 8,
  },
  {
    value: "仕",
    quantity: 2,
    id: 9,
  },
  {
    value: "相",
    quantity: 2,
    id: 10,
  },
  {
    value: "俥",
    quantity: 2,
    id: 11,
  },
  {
    value: "傌",
    quantity: 2,
    id: 12,
  },

  {
    value: "砲",
    quantity: 2,
    id: 13,
  },
  {
    value: "兵",
    quantity: 5,
    id: 14,
  },
]);
// 隨機順序
let imageIndexArr = ref([]);
// 玩家狀態
let play1 = ref({
  eatChessCount: 0,
});
let play2 = ref({
  eatChessCount: 0,
});
// 遊戲狀態
let gameState = ref({
  player: "play1",
  winner: null,
  continualCount: 1,
  preChooseIndex: null,
  occupiedState: null,
});
// chess

// 每次開始時隨機更換chess的順序
let getAllChessImageIndex = () => {
  ChessCategory.value.forEach((item, index) => {
    for (var i = 1; i <= item.quantity; i++) {
      // 透過quantity的值產生對硬的id(與url命名同)數量，放入array
      imageIndexArr.value.push({
        index: item.id,
        isOpen: false,
        activeState: false,
        state: 1,
      });
    }
  });
};

// 隨機洗牌
function shuffleArray(inputArray) {
  getAllChessImageIndex();
  // 正常順序
  inputArray.sort(() => Math.random() - 0.5);
  // shuffle後random順序
}
// 取得本地象棋圖片
const getChessUrl = (name, isOpenState) => {
  if (isOpenState == false) {
    return new URL(`/src/assets/chesses/chessBack.png`, import.meta.url);
  } else {
    return new URL(`/src/assets/chesses/chess${name}.png`, import.meta.url);
  }
};
// 選擇牌
const chooseChess = (target, targetIndex) => {
  // 第一次陣營選擇判斷

  // 重置選取狀態
  resetChessState();

  if (!target.isOpen) {
    target.isOpen = true;
    // 切換玩家
    gameState.value.preChooseIndex = null;
    switchPlayer();
  } else {
    if (gameState.value.preChooseIndex) {
      let { compareResult } = useAdjacentChess(
        imageIndexArr.value,
        targetIndex,
        gameState.value.preChooseIndex
      );

      if (compareResult == -2) {
        alert("有事嗎，只能走上下左右ok～");
      } else if (imageIndexArr.value[targetIndex]?.state == 0) {
        moveCess(targetIndex, gameState.value.preChooseIndex);
        gameState.value.preChooseIndex = null;
      } else if (compareResult == 1) {
        occupiedOtherChess(targetIndex, gameState.value.preChooseIndex);
      } else if (compareResult == -1) {
        alert("在亂吃啊");
      } else if (compareResult == 0) {
        alert("眼殘嗎？看清楚好嗎是你自己的棋！");
      } else if (compareResult == 3) {
      }

      // console.log("執行useAdjacentChess");
      gameState.value.preChooseIndex = null;
    } else {
      gameState.value.preChooseIndex = targetIndex;
      target.activeState = true;
      // console.log("值放preChooseIndex及給 activeState");
    }

    // 存入preActive用意為之後將與其他棋進行比較
  }
  console.log(imageIndexArr);
};
// 重置activeState的狀態
const resetChessState = () => {
  imageIndexArr.value.forEach((item) => {
    item.activeState = false;
  });
};
// 換人玩
const switchPlayer = () => {
  if (gameState.value.player == "play1") {
    gameState.value.player = "play2";
  } else {
    gameState.value.player = "play1";
  }
};
// 第一次選到的陣營
const getFirstCamp = (initArr, chooseChess) => {
  let blueCamp = ["將", "士", "象", "車", "馬", "炮", "卒"];

  let result = blueCamp.findIndex(
    (item) => item == initArr[chooseChess - 1]?.value
  );
  if (play1.value.camp) {
    return;
  } else {
  }
  if (result == -1) {
    play1.value.camp = "red";
    play2.value.camp = "blue";
  } else {
    play1.value.camp = "blue";
    play2.value.camp = "red";
  }
};

onMounted(() => {
  // play1先開始

  shuffleArray(imageIndexArr.value);
});

//  佔領棋子
const occupiedOtherChess = (targetChess, compareChess) => {
  let temp = imageIndexArr.value[compareChess];
  imageIndexArr.value[compareChess] = imageIndexArr.value[targetChess];
  imageIndexArr.value[targetChess] = temp;
  imageIndexArr.value[compareChess].state = 0;
  // if (gameState.value.player == "play1") {
  //   play1.value.eatChessCount += 1;
  //   console.log("play1");
  // } else {
  //   play2.value.eatChessCount += 1;
  //   console.log("play2");
  // }
  switchPlayer();
};
// 移動
const moveCess = (targetChess, compareChess) => {
  let temp = imageIndexArr.value[compareChess];
  imageIndexArr.value[compareChess] = imageIndexArr.value[targetChess];
  imageIndexArr.value[targetChess] = temp;
  switchPlayer();
};
</script>

<style scoped>
/* Roboto font */
@import url("https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap");
.dark-chess-game {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-family: "Tilt Warp", cursive;
  font-weight: 700;
  font-size: 4.2rem;
  color: rgb(251, 251, 251);
  text-shadow: 1px 1px 2px rgb(45, 45, 45);
}
img {
  width: 80%;
  transition: 0.3s;
  border-radius: 50%;
}
img:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 35px -5px rgba(26, 26, 26, 0.75);
}
/* chessboard-container */
.chessboard-container {
  width: 1004px;
  height: 504px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  background-image: url("../../public/playground.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 0px 103px 16px rgba(0, 0, 0, 0.75);
  border: 2px solid #000;
}
.chessboard-block {
  width: 125px;
  height: 125px;
  border-right: 2px solid #333;
  border-bottom: 2px solid #333;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* active class */
.isActive {
  border: 5px solid rgb(255, 255, 255);
  border-radius: 50%;
  box-shadow: 0px 0px 35px -5px rgba(190, 190, 190, 0.75);
  transform: scale(1.2);
}
</style>
