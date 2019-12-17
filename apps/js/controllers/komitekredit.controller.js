angular
	.module('komitekredit.controller', [])
	.controller('komitekredit-controller', komitekreditController)
	.controller('komitekredit-kritera-controller', KomiteKriteraController)
	.controller('komitekredit-persyaratan-controller', KomitePersyaratanController)
	.controller('komitekredit-periode-controller', komitekreditPeriodeController)
	.controller('komitekredit-periode-detail-controller', komitekreditperiodedetailcontroller);

function komitekreditController() {}

function KomiteKriteraController($scope, KriteriaService, swangular, message) {
	$scope.model = {};
	KriteriaService.get().then((x) => {
		$scope.datas = x;
	});

	$scope.edit = function(data) {
		$scope.model = data;
	};

	$scope.save = function(data) {
		$scope.saveSpin = true;
		if (data.idkriteria == undefined) {
			KriteriaService.post(data).then((x) => {
				$('#basicExampleModal').modal('hide');
				swangular.swal(
					{
						title: 'Sukses',
						text: 'Data Berhasil Ditambah',
						type: 'info'
					},
					(err) => {
						$scope.saveSpin = false;
					}
				);

				$scope.saveSpin = false;
				$scope.model = {};
			});
		} else {
			KriteriaService.put(data).then((x) => {
				$('#basicExampleModal').modal('hide');
				swangular.swal(
					{
						title: 'Sukses',
						text: 'Data Berhasil Diubah',
						type: 'info'
					},
					(err) => {
						$scope.saveSpin = false;
					}
				);
				$scope.saveSpin = false;
				$scope.model = {};
			});
		}
	};

	$scope.delete = function(data) {
		KriteriaService.remove(data).then((z) => {
			message.info('Berhasil Dihapus');
		});
	};

	//Sub

	$scope.SelectCriteria = function(item) {
		$scope.SelectedCriteria = item;
	};

	$scope.saveSubCriteria = function(data) {
		$scope.saveSpin = true;
		if (data.idSubKriteria == undefined) {
			data.idkriteria = $scope.SelectedCriteria.idkriteria;
			KriteriaService.postSubCriteria(data).then((x) => {
				$('#subCriteriaModal').modal('hide');
				swangular.swal(
					{
						title: 'Sukses',
						text: 'Data Berhasil Ditambah',
						type: 'info'
					},
					(err) => {
						$scope.saveSpin = false;
					}
				);

				$scope.saveSpin = false;
				data.idSubKriteria = x.data;
				$scope.SelectedCriteria.subKriteria.push(data);
			});
		} else {
			KriteriaService.putSubCriteria(data).then((x) => {
				$('#subCriteriaModal').modal('hide');
				swangular.swal(
					{
						title: 'Sukses',
						text: 'Data Berhasil Diubah',
						type: 'info'
					},
					(err) => {
						$scope.saveSpin = false;
					}
				);
				$scope.saveSpin = false;
				$scope.model = {};
			});
		}
	};
}

function KomitePersyaratanController($scope, PersyaratanService, swangular, message) {
	$('label').addClass('active');
	$scope.model = {};
	PersyaratanService.get().then((x) => {
		$scope.datas = x;
	});
	$scope.edit = function(data) {
		$scope.model = data;
	};

	$scope.save = function(data) {
		if (data.idpersyaratan == undefined) {
			PersyaratanService.post(data).then(
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
			PersyaratanService.put(data).then(
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

	$scope.delete = function(data) {
		PersyaratanService.remove(data).then((z) => {
			message.info('Berhasil Dihapus');
		});
	};
}

function komitekreditPeriodeController($scope, PeriodeService) {
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

function komitekreditperiodedetailcontroller($scope, $stateParams, KriteriaService, DebiturService) {
	$scope.periode = $stateParams.periode;
	if ($scope.periode.DataDebitur === undefined) {
		$scope.periode.DataDebitur = [];
	} else {
	}

	KriteriaService.get().then(
		(x) => {
			$scope.dataKriteria = x;
			DebiturService.get().then(
				(d) => {
					$scope.dataDebitur = d;
				},
				(err) => {}
			);
		},
		(err) => {}
	);

	$scope.save = function(debitur) {
		DebiturService.savePenilaian(debitur).then((x) => {}, (err) => {});
	};
}
