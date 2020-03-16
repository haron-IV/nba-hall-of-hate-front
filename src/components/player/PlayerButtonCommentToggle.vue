<template>
<div class="btn btn-primary comment-toggle-button" @click="playerFeedBox = !playerFeedBox">
    <div class="hate">
        <span class="title">Hate</span>
        <button type="button" class="btn btn-primary bmd-btn-fab comment-toggle-button--hate">
            <Icon
            :name="title === 'Hate' ? 'hate' : 'respect'"
            externalStyle=""
            parentStyle="background-color: transparent;"
            width=23
            height=23
            />
        </button>
    </div>
    or
    <div class="respect">
        <span class="title">Respect</span>
        <button type="button" class="btn btn-primary bmd-btn-fab comment-toggle-button--respect">
            <Icon
            :name="title === 'Hate' ? 'hate' : 'respect'"
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
    }
  },

  watch: {
    
  },
  
  created(){
  },
  
  computed: {
  },

  methods: {
  }
};
</script>

<style lang="scss">
.comment-toggle-button {
    display: flex;
    justify-content: center;

    &:hover{
        background-color: transparent !important;
    }

    .hate, .respect {
        position: relative;

        .title {
            transition: opacity ease-in-out 800ms;
            margin: 0 .7rem;
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
        left: -10%;
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