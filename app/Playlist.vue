<template>
    <div id="playlist">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-4 btncol" v-for="item in stations">
                    <div
                            class="station_btn"
                            @click="play(item.id)"
                            v-bind:class="{loading_grad:loading==item.id, passive_grad: loading!=item.id}"
                    >{{item.title}}</div>
                </div>


            </div>

        </div>
    </div>
</template>
<style>
    .station_btn {
        width: 180px;
        height: 180px;
        margin: 20px;
        border-radius: 20px;
        border: 2px solid #8c8c8c;
    }

    .passive_grad {
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffaaac+0,ff282c+100 */
        background: #ffaaac; /* Old browsers */
        background: -moz-linear-gradient(top, #ffaaac 0%, #ff282c 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #ffaaac 0%, #ff282c 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #ffaaac 0%, #ff282c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffaaac', endColorstr='#ff282c', GradientType=0); /* IE6-9 */
    }

    .loading_grad {
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffc4aa+0,ff5c16+100 */
        background: #ffc4aa; /* Old browsers */
        background: -moz-linear-gradient(top, #ffc4aa 0%, #ff5c16 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #ffc4aa 0%, #ff5c16 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #ffc4aa 0%, #ff5c16 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffc4aa', endColorstr='#ff5c16', GradientType=0); /* IE6-9 */
    }

    .playing_grad {
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#b4ffaa+0,47ff2b+100 */
        background: #b4ffaa; /* Old browsers */
        background: -moz-linear-gradient(top, #b4ffaa 0%, #47ff2b 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #b4ffaa 0%, #47ff2b 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #b4ffaa 0%, #47ff2b 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#b4ffaa', endColorstr='#47ff2b', GradientType=0); /* IE6-9 */
    }

    .btncol {
        text-align: center;
    }
</style>

<script>
  export default {

    components: {},

    data () {
      return {}
    },

    filters: {},

    created () {
      console.log('CREATED',); //TODO: REMOVE
    },
    mounted () {
      console.log('Ask stations', '...') // TODO: REMOVE
      this.$socket.emit('givestations')
    },

    methods: {
      play (id) {
        this.$socket.emit('PLAY', id);
      }
    },
    computed: {
      stations () {
        return this.$store.getters.stations;
      },
      loading () {
        return this.$store.getters.loading;
      }
    }

  }
</script>
