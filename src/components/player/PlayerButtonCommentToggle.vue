<template>
<div class="btn btn-primary comment-toggle-button">
    <div class="hate" @click="showHateComments()">
        <span class="title" :class="{ hideTitle: buttonVisibility.hate }">Hate</span>
        <button type="button" class="btn btn-primary bmd-btn-fab comment-toggle-button--hate" :class="{ visibleButton: buttonVisibility.hate }">
            <Icon
            name="hate"
            externalStyle=""
            parentStyle="background-color: transparent;"
            width=23
            height=23
            />
        </button>
    </div>
    or
    <div class="respect" @click="showRespectComments()">
        <span class="title" :class="{ hideTitle: buttonVisibility.respect }">Respect</span>
        <button type="button" class="btn btn-primary bmd-btn-fab comment-toggle-button--respect" :class="{ visibleButton: buttonVisibility.respect }">
            <Icon
            name="respect"
            externalStyle=""
            parentStyle="background-color: transparent;"
            width=23
            height=23
            />
        </button>
    </div>
</div>
</template>

<script>
import Icon from '@/components/utility/Icon';

export default {
  name: "Player-button-comment-toggle",
  components: {
    Icon
  },
  data() {
    return {
        activeCommentBox: [],
        buttonVisibility: { hate: false, respect: false }
    }
  },

  watch: {
    
  },
  
  created(){
  },
  
  computed: {
  },

  methods: {
    showHateComments() {
        this.$store.commit('showPlayerCommentBox', 'hate');
        this.buttonVisibility.hate = !this.buttonVisibility.hate;
    },
    showRespectComments() {
        this.$store.commit('showPlayerCommentBox', 'respect');
        this.buttonVisibility.respect = !this.buttonVisibility.respect;
    }
  }
};
</script>

<style lang="scss">
.comment-toggle-button {
    display: flex;
    justify-content: center;
    margin: $margin-vertical-small;

    &:hover{
        background-color: transparent !important;
    }

    .hate, .respect {
        position: relative;
        
        .hideTitle {
            opacity: 0;
        }

        .visibleButton {
            visibility: inherit;
            opacity: 1;
            background-color: $white !important;
        }

        .title {
            transition: opacity ease-in-out 800ms;
            margin: $margin-horizontal-small;
            background-color: rgba(0, 0, 0, .1);
            padding: .3rem .5rem;
        }

        &:hover {
            .title {
                transition: opacity ease-in-out 400ms;    
                opacity: 0;
            }

            .comment-toggle-button{
                &--hate, &--respect {
                    transition: opacity ease-in-out 400ms;
                    visibility: inherit;
                    opacity: 1;
                }
            }
        }
    }

    &--hate, &--respect {
        position: absolute;
        left: 10%;
        top: -100%;
        visibility: hidden;
        opacity: 0;
        align-self: center;
        justify-self: center;
    }
    &--respect {
        left: 20%;
    }
}
</style>