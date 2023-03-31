.<template>
  <div class="player-container">
    <div v-if="props.currPlayer == 'play1'" class="play1-flag player">
      Play1 : {{props.playerOneScore }}
    </div>
    <div v-else class="player">Play1 : {{props.playerOneScore }}</div>

    <div v-if="props.currPlayer == 'play2'" class="play2-flag player">
      {{ props.playerTwoScore }} : Play2
      
    </div>
    <div v-else class="player">{{  props.playerTwoScore }} : Play2</div>
  </div>



</template>

<script setup>

const props = defineProps(["count","currPlayer","playerOneScore","playerTwoScore"]);



</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap");
h1{
  color: #ffffff;
  font-size: 50px;
}
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
.count {
  width: 18%;
  font-size: 32px;
  font-family: "Tilt Warp", cursive;
  font-weight: 200;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgb(45, 45, 45);
}
</style>
