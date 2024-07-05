'use strict';

$(function () {
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const ctx1 = document.getElementById('myChart1');

  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  const ctx2 = document.getElementById('myChart2');

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  loadproductiontable();
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
});
