window.onload = function () {
	function updateTime() {
		var now = new Date()
		var day = ('0' + now.getDate()).slice(-2)
		var month = ('0' + (now.getMonth() + 1)).slice(-2)
		var year = now.getFullYear()
		var hours = ('0' + now.getHours()).slice(-2)
		var minutes = ('0' + now.getMinutes()).slice(-2)
		var secounds = ('0' + now.getSeconds()).slice(-2)
		var dateString = day + '.' + month + '.' + year
		var timeString = hours + ':' + minutes + ':' + secounds

		document.querySelector('.server-time_count').innerHTML =
			dateString + '<br>' + timeString
	}

	updateTime()
	setInterval(updateTime, 1000)
}
