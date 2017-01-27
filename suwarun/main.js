var example2 = new Vue({
  el: '#reserved_chair_1',
  data: {
		imageUrl: './images/free-chair.png',
    free_url: './images/free-chair.png',
		reserved_url: './images/reserved-chair.png'
  },
  // `methods` オブジェクトの下にメソッドを定義する
  methods: {
    chair_change_status: function (event) {
      if ( this.imageUrl == this.reserved_url ){
				this.imageUrl = this.free_url
			}else if (this.imageUrl == this.free_url) {
				this.imageUrl = this.reserved_url
			}
    }
  }
})





Vue.component('chair', {
	  props: ['isReserved'],
		data: function(){
			reserved : true
		},
		methods: {
		change: function(){
				if ( this.isReserved ){
					this.isReserved = false
				}else if (!this.isReserved) {
					this.isReserved = true
				}
			},
		},
		computed: {
			URL : function(){
					if (this.isReserved) {
						return './images/reserved-chair.png'
					}else {
						return './images/free-chair.png'
					}
			}
		},
		template: '<img v-bind:src="URL" class="leftward chair">'
});

var conferenceRoom = new Vue({
		el: '#conferenceRoom',
		data: function(){
			reserved : true
		},
		methods: {
			change_status: function (event) {
				if ( this.reserved ){
					this.reserved = false
				}else if (!this.reserved) {
					this.reserved = true
				}
				console.log(this.reserved)
			}
		},

})


var freeSpace = new Vue({
		el: '#freeSpace',
		components: {
				'table': table
		}
})

var table = Vue.extend({

	  props: ['reserved'],
		computed: {
			chairURL : function(){

					if (reserved == true) {
						return './images/reserved-chair.png'
					}else {
						return './images/free-chair.png'
					}
			}
		},
		template: '<img v-bind:src="chairURL" class="rightward chair"><div class="circle"></div><img v-bind:src="chairURL" class="leftward chair">'
});
