<template>
  <img :src="src" :style="externalStyle" ref="icon">
</template>

<script>
export default {
  props: {
    name: {
      //name should be same as icon file name
      type: String,
      default: 'box'
    },
    externalStyle: {
      type: String
    },
    parentStyle: {
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
  },
  computed: {
    src() {
      return require(`@/assets/img/icons/${this.name}.png`)
    },

    iconParent(){
      return this.$refs.icon.parentNode;
    }
  },
  mounted() {
    this.iconParent.style = this.parentStyle;
  },
  methods: {
    
  }
  
}
</script>