(function() {
  'use strict';
  // checkedPref = checked[0] -1 ;

  new Vue({
    el: '#app',
    data() {
        return {
            //APIデータを受け取る配列を定義
            prefectures: null,
            population: null,
            checked: [1], // 北海道 , 青森 , 東京にcheck
        }
    },
    // マウント時
    mounted() {
      this.getPrefData(); // 都道府県データ取得
      // this.getPopulationHokkaidoData(); //(test)北海道の人口推移データ取得
      this.getPopulation1Data(); //(test)複数の人口推移データを配列で取得
    },
    methods: {
      // 全都道府県データの取得
      getPrefData() {
        // 全都道府県(名前)  https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
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
      }
    }
  })
})();