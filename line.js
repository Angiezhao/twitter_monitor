var lineData = {
	type: 'line',
	data: {
	  datasets: [{
	      label: 'Symbol ',
	      fill: false,
	      borderColor: "#FFFFCC",
	      borderWidth: 0.5,
	      lineTension: 0.1,
	      pointBorderColor: "#FFFFCC",
	      pointBackgroundColor: "#252C3E",
	      pointBorderWidth: 0.5,
	      pointRadius:0.5,
	      pointHoverRadius: 0.5,
	      pointHoverBackgroundColor: "#FFFFCC",
	      pointHoverBorderColor: "rgba(220,220,220,1)",
	      pointHoverBorderWidth: 0.5,
	      data: [{
	      }],

	      fill: false
	  }]
	},

	options: {
	  responsive: true,
	  scales: {
	      xAxes: [{
	          type: "time",
	          display: true,
	          scaleLabel: {
	              display: true,
	              labelString: 'Time'
	          }
	      }, ],
	      yAxes: [{
	          display: true,
	          scaleLabel: {
	              display: true,
	              labelString: 'Tweet Num.'
	          }
	      }]
	  }
	}
};

function drawLine(time, value){
	if (lineData.data.datasets.length > 0) {
		for (var index = 0; index < lineData.data.datasets.length; ++index) {
		  lineData.data.datasets[index].data.push({
		      x: time,
		      y: value
		  });
		}
	}
}
