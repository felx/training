<style scoped>
  .grid{
    margin: 2em;
  }
  .grid table {
    border: 1px solid darkslategray;
    border-collapse: collapse;
  }

  .grid td, th {
    border: 1px solid darkslategray;
    padding: 0.5em;
  }

  .grid td {
    white-space: nowrap;
  }

  .grid .separator {
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke-width="0.75" stroke="black"/></svg>');
    background-size: contain;
    height: 2em;
    margin: 0em;
    padding: 0em;
    margin-top: -0.5em;
    margin-bottom: -0.5em;

  }

  .grid th.colrownames {
    padding: 0px;
  }

  .xgrid tr:first-child  th:not(.colrownames) div{
    transform: translateX(50%) translateY(200%) rotate(-75deg);
    transform-origin: 0% 100%;
    border: 1px solid red;
    position: relative;
    bottom: 2em;
  }

  .colname,
  .rowname {
    margin: 0.5em;
  }

  .grid .colname {
    text-align: right;
    margin-left: 20%;
    margin-bottom: 0;
  }

  .grid .rowname {
    text-align: left;
    vertical-align: bottom;
    margin-right: 20%;
  }
  .selector ul{
    list-style: none;
    text-align: left;
    padding: 0;
  }
  .selector .label{
    font-weight: bold;
    padding-top:1em;
    display: block;
  }
  .selector select{
    width: 30%;
    text-align: right;
    padding: 4px;
  }

  .selector input{
    width: 80%;
    padding: 4px;
  }
</style>
<template>
  <div class="grid">

    <table>
      <tr v-for="(rows,row) in grid">
        <template v-for="(cell, col) in rows">
          <th v-if="row == 0 && col == 0" class="colrownames">
            <div class="colname">{{inCols}}</div>
            <div class="separator"></div>
            <div class="rowname">{{inRows}}</div>
          </th>
          <th v-else-if="row == 0 || col == 0"><div>{{cell}}</div></th>
          <td v-else>{{cell | numberFilter(locale, currency,unit)}}</td>
        </template>
      </tr>
    </table>

    <div class="selector">
      <ul>
        <li>
          <label class="label" for="currency">Currency</label>
          <select id="currency" v-model="currency">
            <option v-for="currency in currencies">{{currency}}</option>
          </select>
        </li>
        <li>
          <label class="label" for="unit">Unit</label>
          <select id="unit" v-model="unit">
            <option v-for="unit in units" v-bind:value="unit">{{unit}} : {{unitsDigits[unit]}} fraction digits</option>
          </select>
        </li>
        <li>
          <label class="label" for="locale">Locale</label>
          <select id="locale" v-model="locale">
            <option v-for="locale in locales">{{locale}}</option>
          </select>
        </li>
        <li>
          <label class="label" for="inCols">cols</label>
          <input id="inCols" v-model="inCols"/>
        </li>
        <li>
          <label class="label" for="inRows">rows</label>
          <input id="inRows" v-model="inRows"/>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'

  const getLang = () => {
    if (navigator.languages != undefined)
      return navigator.languages[0]
    else
      return navigator.language
  }
  const unitsRatios = {
    'U': 1,
    'K' : 1000,
    'M' : 1000000 ,
    'B' : 1000000000,
  }
  const unitsDigits = {
    'U': 0,
    'K' : 2,
    'M' : 2 ,
    'B' : 3,
  }

  const numberFilter = (amount, locale, currency, unit) => Number(amount / unitsRatios[unit]).toLocaleString(locale || getLang(), {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    maximumFractionDigits: unitsDigits[unit],
    minimumFractionDigits: unitsDigits[unit]
  } )  + ((unit == 'U') ? '' : ` (${unit})`);
  Vue.filter('numberFilter', numberFilter)

  const grid = [
    ['x', 'China National Petroleum', 'Berkshire Hathaway', 'Fukushima Real Estate', '2F Conseils Stratégies et opportunités'],
    ['Industrial & Commercial Bank of China', 0, 0, 0, 0],
    ['AT & T', 0, 0, 0, 0],
    ['Samsung Electronics', 0, 0, 0, 0],
    ['AmerisourceBergen', 0, 0, 0, 0]
  ].map(r => r.map(e => (Number.isInteger(e)) ? Math.round(Math.random() * Math.pow(10, 14)) / 100 : e))
  console.log(JSON.stringify(grid))

  export default {
    name: 'hello',
    data () {
      return {
        grid: grid,
        inCols: 'Plein de colonnes pleines de nimp',
        inRows: 'Des choses random sur les lignes',
        currency: 'EUR',
        locale: getLang(),
        locales: ['fr-FR', 'en-US', 'en-UK'],
        currencies: ['EUR', 'USD', 'JPY', 'CHF', 'AUD', 'GBP'],
        unit: 'U',
        units: ['U','K','M','B'],
        unitsDigits
      }
    }
  }
</script>
