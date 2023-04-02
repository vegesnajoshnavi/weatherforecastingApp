const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = '378603cebc014f298d5164956232702'; 

// fetch weather data for a specific city
function fetchWeatherData(city) {
    const apiKey = '378603cebc014f298d5164956232702';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        return data;
      });
  }

// format weather data for use with Chart.js
function formatChartData(weatherData) {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1
      },
      {
        label: 'Humidity (%)',
        data: [],
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1
      }
    ]
  };

  // loop through weather data and add to chart data
  for (let i = 0; i < weatherData.list.length; i++) {
    const date = new Date(weatherData.list[i].dt_txt);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    chartData.labels.push(formattedDate);
    chartData.datasets[0].data.push(weatherData.list[i].main.temp);
    chartData.datasets[1].data.push(weatherData.list[i].main.humidity);
  }

  return chartData;
}
// create chart
function createChart(chartData) {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: '7-Day Weather Forecast'
          }
        }
      }
    });
    
    // return the chart instance
    return chart;
  }
  
  // get search form element and add submit event listener
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form from submitting
  const input = document.getElementById('search-input');
  const city = input.value;
  fetchWeatherData(city)
    .then(formatChartData)
    .then(createChart)
    .then(chart => {
      console.log('Chart created!', chart);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// fetch weather data and create chart
function fetchWeatherData(city) {
  const apiKey = 'YOUR_API_KEY_HERE';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

// format weather data for chart
function formatChartData(weatherData) {
  const labels = weatherData.list.map(data => data.dt_txt);
  const temperatures = weatherData.list.map(data => data.main.temp);
  const humidities = weatherData.list.map(data => data.main.humidity);
  const conditions = weatherData.list.map(data => data.weather[0].main);
  return {
    labels: labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)'
      },
      {
        label: 'Humidity (%)',
        data: humidities,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)'
      },
      {
        label: 'Conditions',
        data: conditions,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)'
      }
    ]
  };
}