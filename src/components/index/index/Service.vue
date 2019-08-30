<template>
  <div>
    <iframe
      id="show-iframe"
      v-show="iframeState"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      :src="link"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iframeState: true,
      link:''
    };
  },
  mounted() {
    const oIframe = document.getElementById("show-iframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + "px";
    oIframe.style.height = deviceHeight + "px";
    this.link = this.$store.state.dictionariesData.website.service_link;
  }
};
</script>
<style>
</style>

