//var itconsultantStatisticsResourceApi = MAIN_BACKEND_LOCATION+ '/api/v1/itconsultantcustom/statistics-itconsultants/5';
var itconsultantStatisticResourceApi = MAIN_BACKEND_LOCATION + '/api/v1/itconsultantcustom/statistics-itconsultants/5';
app.controller('itConsultantStatisticController', function(notice, $scope,
		$http, $location, $route) {
	$scope.pieChartDatasets = 0;
	$http({
		method : 'GET',
		url : itconsultantStatisticResourceApi
	}).then(function(response) {
		$scope.pieChartDatasets = response.data.interviews;
		$(document).ready(function() {
			drawPieCharts();
		});

	});

	function drawPieCharts() {

		console.log("drawPieCharts START");
		for (var i = 0; i < $scope.pieChartDatasets.length; i++) {
			var idName = "pie-chart" + i;

			Chart.defaults.global.responsive = true;
			Chart.defaults.global.maintainAspectRatio = false;
			Chart.defaults.global.legend.labels.fontsStyle = "italic";
			var ctx = $("#" + idName).get();
			var pieLabels = Object
					.keys($scope.pieChartDatasets[i].interviewReplies);
			console.log("pieLabels: " + pieLabels);

			var pieData = Object
					.values($scope.pieChartDatasets[i].interviewReplies);

			console.log("pieData: " + pieData);
			var pieColors = [ "#9E9E9E", "#E91E63", ];
			console.log("try for draw in ctx: " + idName + " - "
					+ $("#" + idName).attr('id'));

			var pieChart = new Chart(ctx, {
				type : 'pie',
				data : {
					labels : pieLabels,
					datasets : [ {
						data : pieData,
						backgroundColor : pieColors,
						borderColor : "#ddd"
					} ]
				},

			});
		}
	}
});



