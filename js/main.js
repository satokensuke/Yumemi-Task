(function() {
  'use strict';

  new Vue({
    el: '#app',
    data() {
        return {
            // APIデータを受け取る配列を定義
            prefectures: null,
            population: null,
            checked: [1], // 北海道にcheck(初期値)
        }
    },
    // マウント時
    mounted() {
      this.getPrefData(); // 都道府県データ取得
      // this.getPopulationHokkaidoData(); // (test)北海道の人口推移データ取得
      this.getPopulation1Data(); // checkした単数の人口推移データを取得
      // this.createChart(); // グラフを作成
    },
    methods: {
      // 全都道府県データの取得
      getPrefData() {
        // 全都道府県(名前) https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
        const prefectures_url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
        axios
        .get(prefectures_url, { headers: { 'X-API-KEY': 'Fo5AelLTNBQbzMvA0DH7zcGATzaspMEu0IWlM99I' } })
        .then(response => (this.prefectures = response.data.result))
        .catch(error => console.log(error));
      },
      // // (test)北海道の人口推移データ
      // getPopulationHokkaidoData() {
      //   const perYear_url_Hokkaido = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=11362&prefCode=1';
      //   // const perYear_url_Hokkaido = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=11362&prefCode='+this.checked[0];
      //   axios
      //   .get(perYear_url_Hokkaido, { headers: { 'X-API-KEY': 'Fo5AelLTNBQbzMvA0DH7zcGATzaspMEu0IWlM99I' } })
      //   .then(response => (this.population = response.data.result))
      //   .catch(error => console.log(error));
      // },

      // checkを入れた人口推移データ取得
      getPopulation1Data() {
        // const perYear_url_Hokkaido = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=1';
        const perYear_url_1 = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode='+this.checked[0];
        axios
        .get(perYear_url_1, { headers: { 'X-API-KEY': 'Fo5AelLTNBQbzMvA0DH7zcGATzaspMEu0IWlM99I' } })
        .then(response => (this.population = response.data.result))
        .catch(error => console.log(error));
      },
      createChart() {
        // const perYear_url_1 = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode='+this.checked[0];
        // axios
        //   .get(perYear_url_1, { headers: { 'X-API-KEY': 'Fo5AelLTNBQbzMvA0DH7zcGATzaspMEu0IWlM99I' } })
        //   .then(response => (this.population = response.data.result))
        //   .catch(error => console.log(error));
        var type = 'line';
        var data = {
          labels: [2010, 2011, 2012, 2013],
          datasets: [{
            label: 'test',
            data: [180, 250, 320, 180],
            borderColor: 'blue',
            borderWidth: 5
          }]
        };
        var options = {
          title: {
            display: true,
            fontSize: 18,
            position: 'left'
          },
          legend: {
            position: 'right'
          }
        };
        var ctx = document.getElementById('my_chart').getContext('2d');
        var myChart = new Chart(ctx, {
          type: type,
          data: data,
          options: options
        });
      }
    }
  })
})();