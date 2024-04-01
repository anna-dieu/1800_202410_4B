// Chart
const dataLine = {
    type: 'line',
    data: {
      labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // Days of the week
      datasets: [{
          label: "My First dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(105, 0, 132, .2)',
          ],
          fill: true,
          borderColor: [
            'rgba(255, 99, 132, 0.8)',
          ],
          borderWidth: 2,
          tension: 0.4
        },
        {
          label: "My Second dataset",
          data: [28, 48, 40, 19, 86, 27, 90],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          fill: true,
          borderColor: [
            'rgba(50, 150, 255, 1)',
          ],
          borderWidth: 2,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true
    }
  };
  
  new mdb.Chart(document.getElementById('line-chart'), dataLine);
  