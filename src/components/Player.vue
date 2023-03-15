<template>
  <div class="player-container">
    <div v-if="props.gameState.player == 'play1'" class="play1-flag player">
      Play1 : 0
    </div>
    <div v-else class="player">Play1 : {{ play1Score }}</div>

    <div v-if="props.gameState.player == 'play2'" class="play2-flag player">
      0 : Play2
    </div>
    <div v-else class="player">{{ play2Score }} : Play2</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps(["gameState", "play1Score", "play2Score"]);

// const { player, winner, continualCount } = props.gameState;
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap");
.player-container {
  width: 80%;
  display: flex;

  justify-content: space-between;
  margin: 30px auto;
}
.player-container > *:nth-child(2) {
  text-align: right;
}
.player {
  width: 18%;
  font-size: 32px;
  font-family: "Tilt Warp", cursive;
  font-weight: 200;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgb(45, 45, 45);
}
.play1-flag {
  background-image: url("../../public/flag.png");
  background-position: right;
  background-repeat: no-repeat;
  background-size: contain;
}
.play2-flag {
  background-image: url("../../public/flag.png");
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
