angular
	.module('cs.controller', [])
	.controller('cs-debitur-controller', CsDebiturController)
	.controller('cs-home-controller', CsHomeController)
	.controller('cs-new-debitur-controller', CsNewDebiturController)
	.controller('cs-edit-debitur-controller', CsEditDebiturController)
	.controller('cs-controller', CsController);

function CsController(AuthService, $state) {
	var thisRole = 'CustomerService';
	if (!AuthService.userIsLogin() || !AuthService.userInRole(thisRole)) {
		$state.go('login');
	}
}

function CsHomeController() {}

function CsEditDebiturController($scope, $stateParams, $state, DebiturService, message, PersyaratanService) {
	$scope.model = $stateParams.debitur;
	$scope.model.DataPersyaratan = [];
	$('label').addClass('active');
	$('#datepicker').datepicker({
		weekStart: 1,
		format: 'dd/mm/yyyy',
		daysOfWeekHighlighted: '6,0',
		autoclose: true,
		todayHighlight: true
	});
	PersyaratanService.get().then(
		(x) => {
			if ($scope.model.persyaratan.length <= 0) {
				x.forEach((element) => {
					element.nilai = 0;
					$scope.model.persyaratan.push(element);
				});
			} else {
				$scope.model.persyaratan.forEach((element) => {
					element.nilai = Boolean(element.nilai);
				});
			}
		},
		(err) => {}
	);

	$scope.save = function(data) {
		DebiturService.put(data).then((x) => {
			message.info('Data Berhasil Diubah');
			$state.go('cs-debitur');
		});
	};

	$scope.saveDataPersyaratan = function(model) {
		PersyaratanService.saveDataPersyaratan(model.iddebitur, model.persyaratan).then(
			(x) => {
				message.info('Data Persyaratan Berhasil Disimpan');
			},
			(err) => {}
		);
	};
}

function CsNewDebiturController($scope, DebiturService, message, $state) {
	$scope.model = {};
	$scope.model.tanggal = new Date();
	$scope.model.status = null;
	$scope.Init = function() {};

	$scope.save = function(data) {
		DebiturService.post(data).then((x) => {
			message.dialog('Tambah Baru').then(
				(x) => {
					$scope.model = null;
				},
				(c) => {
					$state.go('cs-debitur');
				}
			);
		});
	};
}

function CsDebiturController($scope, DebiturService, PersyaratanService, message, $state, AuthService) {
	$scope.model = {};
	PersyaratanService.getDataPersyaratan().then(
		(x) => {
			$scope.datas = x;
		},
		(err) => {}
	);

	$scope.edit = function(data) {
		$scope.model = data;
	};

	$scope.save = function(data) {
		if (data.idPersyaratan == undefined) {
			DebiturService.post(data).then((x) => {
				$('#basicExampleModal').modal('hide');
				message.info('Data Berhasil Ditembah');
			});
		} else {
			DebiturService.put(data).then((x) => {
				$('#basicExampleModal').modal('hide');
				message.info('Data Berhasil Diubah');
			});
		}

		$scope.model = {};
	};

	$scope.delete = function(data) {
		message.dialog('Hapus Data ...', 'OK').then(
			(x) => {
				DebiturService.remove(data).then((z) => {
					message.info('Berhasil Dihapus');
				});
			},
			(cancel) => {}
		);
	};
}
