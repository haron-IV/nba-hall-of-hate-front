<template>
    <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
            <li class="nav-item">
                <a class="nav-link active" href="#">Show Statistics</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#"></a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" title="This feature will be added soon :)" href="#">Follow</a>
            </li>
            </ul>
        </div>
        <div class="card-body">
            <h5 class="card-title">LeBron James</h5>
            <div class="card-text">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Birth:</b> 1988-02-11 (35)
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Height:</b> 2.06m
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Number:</b> 23
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Hate points:</b> 2333
                    </li>
                </ul>

                <img src="http://d2cwpp38twqe55.cloudfront.net/req/202002141/images/players/jamesle01.jpg" alt="" class="img ml-3">
            </div>
            <button class="btn btn-primary" @click="playerFeedBox = !playerFeedBox">Hate or Respect</button>

            <!-- should be a separated component -->
            <!-- container for 2 list like this (default hidden container) -->
            <div class="container-fluid player-feed-box" v-show="playerFeedBox">
                <Player-card-collapse 
                    class="mr-2"
                    title="Hate"
                    heading="Here is throwing meat."
                />
                
                <Player-card-collapse 
                    class="ml-2"
                    title="Respect"
                    heading="Here is throwning respect."
                />
            </div>
        </div>
    </div>
</template>

<script>
import PlayerCardCollapse from '@/components/player/PlayerCardCollapse';

export default {
  name: "Player-card",
  components: {
    'Player-card-collapse': PlayerCardCollapse
  },
  data() {
    return {
        player: {
            name: null,
            lastName: null,
            birth: null,
            id: null,
            height: null
        },
        playerFeedBox: false
    }
  }
};
</script>

<style lang="scss">
.card-body {
    .card-text {
        display: flex;

        .list-group {
            
        }   
    }

    .player-feed-box {
        display: flex;
    }
}

</style>