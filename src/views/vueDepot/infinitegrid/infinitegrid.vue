<template>
  <masonry-infinite-grid
    class="grid-container"
    v-bind:gap="5"
    v-bind:frame="[
      [1, 1, 2, 3, 3],
      [1, 1, 4, 4, 5],
    ]"
    v-on:requestAppend="onRequestAppend"
  >
    <div
      class="item"
      v-for="item in items"
      :key="item.key"
      :data-grid-groupkey="item.groupKey"
    >
      {{ item.key }}
    </div>
  </masonry-infinite-grid>
</template>

<script>
import { MasonryInfiniteGrid } from "@egjs/vue-infinitegrid";

export default {
  components: {
    MasonryInfiniteGrid,
  },
  data() {
    return {
      items: [
        { groupKey: "qwe", key: 0 },
        { groupKey: "qwe1", key: 1 },
        { groupKey: "qwe2", key: 2 },
        { groupKey: "qwe3", key: 3 },
        { groupKey: "qwe4", key: 4 },
        { groupKey: "qwe5", key: 5 },
      ],
    };
  },
  methods: {
    onRequestAppend(e) {
      const nextGroupKey = (e.groupKey || 0) + 1;
      const length = this.items.length;

      this.items = [
        ...this.items,
        { groupKey: nextGroupKey, key: length },
        { groupKey: nextGroupKey, key: length + 1 },
        { groupKey: nextGroupKey, key: length + 2 },
      ];
    },
  },
};
</script>

<style lang='scss' scoped>
.grid-container {
  .item {
    height: 100px;
    background: red;
  }
}
</style>