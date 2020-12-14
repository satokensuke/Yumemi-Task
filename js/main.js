(function() {
  'use strict';

  // var vm = new Vue({
  //   el: '#app',
  //   data: {
  //     name: 'test Vue.js'
  //   }
  // });
  new Vue({
    el: '#app',
    data() {
        return {
            //APIデータを受け取る配列を定義
            prefectures: null,
            checked: []
        }
    },
    mounted() {
      var prefectures_url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
      axios
      .get(prefectures_url, { headers: { 'X-API-KEY': 'Fo5AelLTNBQbzMvA0DH7zcGATzaspMEu0IWlM99I' } })
      .then(response => (this.prefectures = response.data.result))
      .catch(error => console.log(error));
    }
  })
})();