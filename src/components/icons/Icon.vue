<template>
  <img :src="src" :style="externalStyle">
</template>

<script>
export default {
    computed: {
      src() {
        return require(`@/assets/img/icons/${this.name}.png`)
      }
    },
  props: {
    name: {
      //name should be same as icon file name
      type: String,
      default: 'box'
    },
    externalStyle: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>