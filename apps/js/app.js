angular.module('app', [
	'app.router',
	'datatables',
	'swangular',
	'message.service',

	'auth.service',
	'storage.services',
	'persyaratan.service',
	'kriteria.service',
	'debitur.service',
	'helper.service',
	'periode.service',

	'app.conponent',
	'ngAnimate',
	'auth.controller',
	'cs.controller',
	'ao.controller',
	'komitekredit.controller'
]);
