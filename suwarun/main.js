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




var chair = Vue.extend({
	data: function () {
		return {
			imageUrl: './images/free-chair.png'
		}
	},
		methods: {
	    change_status: function (event) {
	      if ( this.imageUrl == this.reserved_url ){
					this.imageUrl = this.free_url
				}else if (this.imageUrl == this.free_url) {
					this.imageUrl = this.reserved_url
				}
	    }
	  },
		computed: {
			URL : function(){
					return this.imageUrl
			},
		},
		template: '<img src="./images/free-chair.png" class="leftward chair">{{URL}}</img>'
});

var conferenceRoom = new Vue({
		el: '#conferenceRoom',
		data: {
			imageUrl: './images/free-chair.png'
		},
		components: {
				'chair': chair
		}
})
