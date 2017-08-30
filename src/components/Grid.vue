<template>
  <div class="grid">
    <tr v-for="row in grid">
      <td v-for="cell in row">
        {{cell}}
      </td>

    </tr>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        grid: [
          [0], [1], [2]
            [3], [4], [5]
            [6], [7], [8]
        ],
        msg: 'Welcome to Your Vue.js Grid'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
