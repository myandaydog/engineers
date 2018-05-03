<template>
  <div>
    <scroller lock-x  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="box2">
        <p v-for="i in bottomCount">placeholder {{i}}</p>
        <load-more tip="loading"></load-more>
      </div>
    </scroller>
  </div>
</template>



<script>
import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux'

export default {
  components: {
    Scroller,
    Divider,
    Spinner,
    XButton,
    Group,
    Cell,
    LoadMore
  },
  data () {
    return {
      showList1: true,
      scrollTop: 0,
      onFetching: false,
      bottomCount: 10
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0})
    })
  },
  methods: {
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true
        setTimeout(() => {
          this.bottomCount += 10
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.onFetching = false
        }, 2000)
        
      }
    },
    onScroll (pos) {
      this.scrollTop = pos.top
    },
    onCellClick () {
      window.alert('cell click')
    },
    onClickButton () {
      window.alert('click')
    },
    changeList () {
      this.showList1 = false
      this.$nextTick(() => {
        this.$refs.scroller.reset({
          top: 0
        })
      })
    }
  }
}
</script>

<style scoped>
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.box2 p{
  height:6px;
}
</style>