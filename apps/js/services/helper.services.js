angular.module('helper.service', []).factory('helperServices', helperServices);

function helperServices(message) {
	var service = {};
	//service.url="http://testing.stimiksepnop.ac.id";
	service.url = 'https://kreditbpr.herokuapp.com';
	service.spinner = false;

	return { url: service.url, spinner: service.spinner, errorHandler: errorHandler, homeAnimation: homeAnimation };

	function errorHandler(err) {
		message.error(err.message, err.status);
	}

	function homeAnimation() {
		var tl = anime.timeline({
			duration: 1000,
			easing: 'easeInOutQuart'
		});
		tl.add({
			targets: '.logo-body',
			scale: {
				value: 10
			}
		});
		tl.add({
			targets: 'h1',
			scale: {
				value: 5
			}
		});
		tl.add({
			targets: 'h2',
			duration: 500,
			scale: {
				value: 5
			}
		});
		tl.add({
			targets: 'h2',
			duration: 500,
			marginTop: '30px'
		});
	}
}
