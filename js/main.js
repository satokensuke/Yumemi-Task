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
    // マウント時
    mounted() {
      // 全都道府県(名前)  https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
      const prefectures_url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
      axios
      .get(prefectures_url, { headers: { 'X-API-KEY': 'Fo5AelLTNBQbzMvA0DH7zcGATzaspMEu0IWlM99I' } })
      .then(response => (this.prefectures = response.data.result))
      .catch(error => console.log(error));
    
      // 各都道府県の人口数  https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
      const perYear_url = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';

      // 人口数の配列定義 , 再代入可能
      let populationData = new Array();

      axios
        .get(perYear_url, {
            headers: { 'X-API-KEY': 'Fo5AelLTNBQbzMvA0DH7zcGATzaspMEu0IWlM99I' },
            params: {
                // ここにクエリパラメータ(必須)を指定する
                prefCode: checkedId1,  //最初に選択された県
                cityCode: '-', //全て取得
            }
        })
        //populationに人口構成(総人口)のデータをオブジェクトとして返す
        .then(response => {
            this.population = response.data.result.data[0].data;
            for (var i = 0; i < this.population.length; i++) {
                populationData.push(this.population[i].value);
            }
            this.population = this.populationData;
            console.log(populationData); //データ確認
        })
    }
  })
})();