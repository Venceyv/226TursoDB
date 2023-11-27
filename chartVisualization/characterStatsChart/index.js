const ctx = document.querySelector('.radar-chart');

const selectMenu = document.querySelector('#character');

const tempData = [
  { name: 'Ainz', attr: [60, 39, 6, 38, 70, 75] },
  { name: 'Kou', attr: [59, 15, 13, 38, 89, 73] },
  { name: 'Shin', attr: [11, 9, 65, 1, 52, 13] },
  { name: 'Masaki', attr: [47, 5, 46, 70, 52, 19] },
  { name: 'Naoki', attr: [93, 27, 26, 1, 49, 80] },
];

let chartData = tempData[0].attr;
genOptions();
let chart = genChart();

selectMenu.addEventListener('change', (e) => {
  const val = e.target.value;

  chartData = tempData.find((e) => e.name === val).attr;
  chart.destroy();
  chart = genChart();
  console.log(chartData);
});

function genChart() {
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Attack', 'Magic', 'Defense', 'Agility', 'Intelligence', 'Physical'],
      datasets: [
        {
          label: '',
          data: chartData,
          fill: true,
          backgroundColor: 'rgb(99, 102, 241,0.2)',
          borderColor: 'rgb(99 102 241)',
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(99, 102, 241)',
        },
      ],
    },
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  });
}

function genOptions() {
  tempData.forEach((el) => {
    const opt = document.createElement('option');
    opt.value = el.name;
    opt.text = el.name;
    selectMenu.appendChild(opt);
  });
}
