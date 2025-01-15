'use strict';

import { isInvalidValue } from '../common/helper.js'

$(function () {
  loadproductiontable();
  loadTopSellingTable();
  loadTopClientList();
  loadTopProducer();
  
  let colors = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(239, 156, 102)',
    'rgb(252, 220, 148)',
    'rgb(200, 207, 160)',
    'rgb(120, 171, 168)',
    'rgb(142, 122, 181)',
    'rgb(183, 132, 183)',
    'rgb(238, 165, 166)',
  ];
  function loadDatas(name_product, datas) {
    let rrval = [];
    name_product.forEach((val, index) => {
      let rval = {};
      let arrdata = [];
      datas.forEach((el) => {
        if (val === el.name) {
          arrdata.push(el.quantity);
        }
      });
      rval.label = val;
      rval.data = arrdata;
      rval.backgroundColor = colors[index];
      rrval.push(rval);
    });
    return rrval;
  }
  function initializeproduction(name_product, uniqueYearMonth, datas) {
    //console.table(loadDatas(name_product, datas));
    const ctx_production = document.getElementById('production_graph');
    const labels = uniqueYearMonth.map(
      (val) => getMonth(val.month) + '-' + val.year
    );
    const data = {
      labels: labels,
      datasets: loadDatas(name_product, datas),
    };
    console.log(data);
    const config = {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Production',
            align: 'start',
            font: { weight: 'bold', size: '20px' },
            padding: 0,
          },
        },
        responsive: true,
        resizeDelay: 2,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    };

    new Chart(ctx_production, config);
  }
  function loadproductiontable() {
    $.ajax({
      type: 'get',
      url: '/admin/dashboard/production',
      dataType: 'json',
      success: function (response) {
        moddifydata(response);
      },
    });
  }
  function moddifydata(response) {
    let datas = [];
    response.forEach((val) => {
      let hasval = false;
      datas.forEach((data) => {
        if (
          data.name === val.name &&
          data.month === val.month &&
          data.year === val.year
        ) {
          hasval = true;
          data.quantity = data.quantity + val.quantity;
        }
      });
      if (!hasval) {
        datas.push(val);
      }
    });
    //console.table(datas);
    let name_products = [...new Set(datas.map((item) => item.name))];
    const uniqueYearMonths = [
      ...new Map(
        datas.map((item) => [
          `${item.year}-${item.month}`,
          { year: item.year, month: item.month },
        ])
      ).values(),
    ];
    initializeproduction(name_products, uniqueYearMonths, datas);
  }
  $('.container-2').on('click', function () {
    $('.container-2').toggleClass('oversize-container-2');
  });
  async function loadTopSellingTable() {
    let res = await fetchTopSellingData();
    let _html = '';
    res.forEach((arr) => {
      _html += `<li class="pb-2 pt-1 pl-2 hover:bg-slate-300 rounded">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src="/${arr.location}"
                        alt="Neil image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-white"
                      >
                        ${arr.name}
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base text-gray-800 dark:text-white pr-3"
                    >
                      ${arr.total_sold}
                    </div>
                  </div>
                </li>`;
    });
    $('#list_top_selling').html(_html);
  }
  function fetchTopSellingData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'get',
        url: '/admin/dashboard/topeselling',
        success: function (response) {
          resolve(response);
        },
        error: function (ex) {
          reject(ex);
        },
      });
    });
  }
  async function fethPurchaseData() {
    return new Promise((resolve, reject)=>{
      $.ajax({
        type: 'get',
        url: '/admin/dashboard/purchase',
        dataType: 'json',
        success: function (response) {
          resolve(response);
        },
      });
    })
    
  }
  // let data = {
  //     "labels": [
  //         "Jan.-2025","Feb.-2025","march"
  //       ],
  //       "datasets": [
  //           {
  //               "label": "CHIP with Egg",
  //               "data": [
  //                   200,300,700
  //               ],
  //               "backgroundColor": "rgb(255, 99, 132)"
                
  //           },
  //           {
  //             "label": "CHIP with Egg 2",
  //             "data": [
  //                 200,500,700
  //             ],
  //             "backgroundColor": "rgb(255, 99, 132)"
  //         }
  //       ]
  //   }
  
  initPurchaseTable();
  async function initPurchaseTable(){
    const data = await fethPurchaseData();
    console.log(data);
    const ctx_production = document.getElementById('purchase_graph');
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        resizeDelay: 2,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Purchase',
            align: 'start',
            font: { weight: 'bold', size: '20px' },
            padding: 0,
          }
        },
        scales: {
            x: {
                beginAtZero: true, // Start x-axis from zero if necessary
            },
            y: {
                beginAtZero: true, // Start y-axis from zero if necessary
            },
        },
      },
    };

    new Chart(ctx_production, config);
  }

  async function fethProfitData() {
    return new Promise((resolve, reject)=>{
      $.ajax({
        type: 'get',
        url: '/admin/dashboard/profit',
        dataType: 'json',
        success: function (response) {
          resolve(response);
        },
      });
    })
    
  }
  initProfitTable();
  async function initProfitTable(){
    const data = await fethProfitData();
    console.log(data);
    const ctx_production = document.getElementById('profit_graph');
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        resizeDelay: 2,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Company Profit',
            align: 'start',
            font: { weight: 'bold', size: '20px' },
            padding: 0,
          }
        },
        scales: {
            x: {
                beginAtZero: true, // Start x-axis from zero if necessary
            },
            y: {
                beginAtZero: true, // Start y-axis from zero if necessary
            },
        },
      },
    };

    new Chart(ctx_production, config);
  }

  async function loadTopClientList() {
    let res = await fetchTopClientData();
    let _html = '';
    res.forEach((arr) => {
      if(isInvalidValue(arr.total))return;
      _html += `<li class="pb-2 pt-1 pl-2 hover:bg-slate-300 rounded">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src="/${arr.location}"
                        alt="Neil image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-white"
                      >
                        ${arr.name}
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base text-gray-800 dark:text-white pr-3"
                    >
                      ${arr.total+' ₱'}
                    </div>
                  </div>
                </li>`;
    });
    $('#top_client_list').html(_html);
  }
  function fetchTopClientData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'get',
        url: '/admin/dashboard/client',
        success: function (response) {
          resolve(response);
        },
        error: function (ex) {
          reject(ex);
        },
      });
    });
  }
  async function loadTopProducer() {
    let res = await fethTopProducer();
    let _html = '';
    res.forEach((arr) => {
      if(isInvalidValue(arr.qty))return;
      _html += `<li class="pb-2 pt-1 pl-2 hover:bg-slate-300 rounded">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src="/${arr.location}"
                        alt="Neil image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-white"
                      >
                        ${arr.name}
                      </p>
                    </div>
                    <div
                      class="inline-flex items-center text-base text-gray-800 dark:text-white pr-3"
                    >
                      ${arr.qty}
                    </div>
                  </div>
                </li>`;
    });
    $('#list_top_producer').html(_html);
  }
  function fethTopProducer() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'get',
        url: '/admin/dashboard/producer',
        success: function (response) {
          resolve(response);
        },
        error: function (ex) {
          reject(ex);
        },
      });
    });
  }
});
