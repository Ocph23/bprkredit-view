'use strict';

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

	PersyaratanService.get().then((persyaratan) => {
		$scope.persyaratans = [];
		PersyaratanService.getDataPersyaratan().then((debiturs) => {
			var debitur = debiturs.find((x) => x.iddebitur === $scope.model.iddebitur);
			if (debitur) {
				persyaratan.forEach((element) => {
					var dataValue = angular.copy(element);
					var isFound = debitur.persyaratan.find((x) => x.idpersyaratan === element.idpersyaratan);
					if (isFound) {
						dataValue.nilai = Boolean(isFound.nilai);
					} else {
						dataValue.nilai = false;
					}
					$scope.persyaratans.push(dataValue);
				});
			}
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

function Aoperiodedetailcontroller($scope, $stateParams, DebiturService, KriteriaService, PeriodeService) {
	PeriodeService.get().then((x) => {
		$scope.periode = x.find((x) => x.periode === $stateParams.id);
		$scope.dataDebitur = [];
		DebiturService.get().then(
			(d) => {
				KriteriaService.get().then(
					(x) => {
						var dd = d;
						dd.forEach((debitur) => {
							var found = false;
							var res = $scope.periode.debitur.find((m) => m.iddebitur == debitur.iddebitur);
							if (!res) {
								debitur.kriteria = x;
								debitur.kriteria.forEach((k) => {
									k.subKriteria.forEach((element) => {
										element.nilai = 0;
									});
								});

								$scope.dataDebitur.push(debitur);
							}
							// else {
							// 	$scope.dataDebitur.push(res);
							// }
						});
					},
					(err) => {}
				);
			},
			(err) => {}
		);
	});

	$scope.selectNewDebitur = function(data) {
		$('#basicExampleModal').modal('hide');
		var item = {};
		angular.copy(data, item);
		$scope.periode.debitur.push(item);
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

	$scope.print = function() {
		setTimeout((x) => {
			window.print();
		}, 500);
	};
}
