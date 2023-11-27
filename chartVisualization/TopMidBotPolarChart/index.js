const ctx = document.querySelector('.radar-chart');

let chartData = [10322, 31204, 20912, 39212];
let chart = genChart();

function genChart() {
  return new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Top Lane', 'Middle Lane', 'Bottom Lane', 'Not Applicable'],
      datasets: [
        {
          label: '',
          data: chartData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
          ],
        },
      ],
    },
  });
}
