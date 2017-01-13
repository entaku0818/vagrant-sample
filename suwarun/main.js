var example2 = new Vue({
  el: '#chair',
  data: {
		imageUrl: './images/free-chair.png',
    free_url: './images/free-chair.png',
		reserved_url: './images/reserved-chair.png'
  },
  // `methods` オブジェクトの下にメソッドを定義する
  methods: {
    chair_change_status: function (event) {
      this.imageUrl = this.reserved_url
    }
  }
})
