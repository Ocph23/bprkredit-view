angular
	.module('ao.controller', [])
	.controller('ao-home-controller', AoHomeController)
	.controller('ao-debitur-controller', AoDebiturController)
	.controller('ao-detail-debitur-controller', AoDetailDebiturController)
	.controller('ao-periode-controller', AoPeriodeController)
	.controller('ao-periode-detail-controller', Aoperiodedetailcontroller)
	.controller('ao-hasil-controller', AohasilController);

function AoHomeController($scope, AuthService, $state, helperServices) {
	var thisRole = 'AnalystOfficer';
	helperServices.homeAnimation();
	if (!AuthService.userIsLogin() || !AuthService.userInRole(thisRole)) {
		$state.go('login');
	}
}

function AoDebiturController($scope, DebiturService, message) {
	$scope.model = {};
	DebiturService.get().then((x) => {
		$scope.datas = x;
	});

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

function AoDetailDebiturController($scope, $stateParams, $state, DebiturService, PersyaratanService, message) {
	$scope.model = $stateParams.debitur;
	$('label').addClass('active');
	$('#datepicker').datepicker({
		weekStart: 1,
		format: 'dd/mm/yyyy',
		daysOfWeekHighlighted: '6,0',
		autoclose: true,
		todayHighlight: true
	});
	PersyaratanService.get().then((persyaratan) => {
		$scope.persyaratans = [];
		persyaratan.forEach((element) => {
			var dataValue = angular.copy(element);
			var isFound = debitur.persyaratans.find((x) => x.idPersyaratan === element.idPersyaratan);
			if (isFound) {
				dataValue.value = true;
			} else {
				dataValue.value = false;
			}
			$scope.persyaratans.push(dataValue);
		});
	});

	$scope.save = function(data) {
		DebiturService.put(data).then((x) => {
			message.info('Data Berhasil Diubah');
			$state.go('cs-debitur');
		});
	};
}

function AoPeriodeController($scope, PeriodeService) {
	$scope.model = {};
	$('label').addClass('active');
	$scope.swichstatus = true;
	$scope.model.status = 'AKTIF';
	$scope.swich = function(value) {
		if (value === true) {
			$scope.model.status = 'AKTIF';
		} else {
			$scope.model.status = 'TIDAK AKTIF';
		}
	};

	PeriodeService.get().then(
		(x) => {
			$scope.datas = x;
		},
		(err) => {
			$scope.datas = [ { idperiode: 1, periode: 'Agustus 2019', status: 'Aktif' } ];
		}
	);
	$scope.edit = function(data) {
		$scope.model = data;
	};

	$scope.save = function(data) {
		if (data.idperiode == undefined) {
			PeriodeService.post(data).then(
				(x) => {
					$('#basicExampleModal').modal('hide');
					swangular.swal({
						title: 'Sukses',
						text: 'Data Berhasil Ditambah',
						type: 'info'
					});
				},
				(err) => {
					$scope.saveSpin = false;
				}
			);

			$scope.saveSpin = false;
			$scope.model = {};
		} else {
			PeriodeService.put(data).then(
				(x) => {
					$('#basicExampleModal').modal('hide');
					swangular.swal({
						title: 'Sukses',
						text: 'Data Berhasil Diubah',
						type: 'info'
					});
				},
				(err) => {
					$scope.saveSpin = false;
				}
			);

			$scope.saveSpin = false;
			$scope.model = {};
		}
	};
}

function Aoperiodedetailcontroller($scope, $stateParams, KriteriaService, DebiturService) {
	$scope.periode = $stateParams.periode;
	if ($scope.periode.debitur.length > 0) {
		$scope.periode.debitur.forEach((debitur) => {
			if (debitur.kriteria.length > 0) {
				debitur.kriteria.forEach((kriteria) => {
					kriteria.subKriteria.forEach((sub) => {
						sub.nilai = parseInt(sub.nilai);
					});
				});
			}
		});
	}

	$scope.dataDebitur = [];
	KriteriaService.get().then(
		(x) => {
			DebiturService.get().then(
				(d) => {
					d.forEach((debitur) => {
						var found = false;
						$scope.periode.debitur.forEach((debiturInPeriode) => {
							if (debitur.iddebitur === debiturInPeriode.iddebitur) {
								found = true;
								return;
							}
						});
						if (!found) {
							debitur.kriteria = x;
							$scope.dataDebitur.push(debitur);
						}
					});
				},
				(err) => {}
			);
		},
		(err) => {}
	);

	$scope.selectNewDebitur = function(data) {
		$('#basicExampleModal').modal('hide');
		$scope.periode.debitur.push(data);
		var index = $scope.dataDebitur.indexOf(data);
		$scope.dataDebitur.slice(index, 1);
	};

	$scope.save = function(debitur) {
		DebiturService.savePenilaian($scope.periode.idperiode, debitur).then((x) => {}, (err) => {});
	};
}

function AohasilController($scope, $state, $stateParams, PeriodeService) {
	var id = $stateParams.id;
	PeriodeService.ProsesWP(id).then(
		(x) => {
			$scope.Data = x.data;
		},
		(err) => {}
	);
}
