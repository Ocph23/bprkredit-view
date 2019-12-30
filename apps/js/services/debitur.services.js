'use strict';
angular.module('debitur.service', []).factory('DebiturService', DebiturService);

function DebiturService(AuthService, helperServices, $q, $http, message) {
	var service = {};
	service.instance = false;
	service.datas = [];

	return {
		get: getData,
		getById: getDatabyId,
		post: postData,
		put: putData,
		remove: removeData,
		savePenilaian: savePenilaian,
		getDebiturBy: getDebiturBy
	};

	function getData() {
		var def = $q.defer();

		if (!service.instance) {
			$http({
				method: 'GET',
				url: helperServices.url + '/api/Debitur',
				headers: AuthService.getHeader()
			}).then(
				(x) => {
					service.instance = true;
					service.datas = x.data.data;
					def.resolve(service.datas);
				},
				(err) => {
					helperServices.errorHandler(err);
					def.reject(err);
				}
			);
		} else {
			def.resolve(service.datas);
		}

		return def.promise;
	}

	function getDebiturBy(id) {
		var def = $q.defer();

		$http({
			method: 'GET',
			url: helperServices.url + '/api/Debitur/' + id,
			headers: AuthService.getHeader()
		}).then(
			(x) => {
				def.resolve(x.data.data);
			},
			(err) => {
				helperServices.errorHandler(err);
				def.reject(err);
			}
		);
		return def.promise;
	}

	function getDatabyId(params) {
		var def = $q.defer();
		try {
			var result = service.datas.find((x) => x.iddebitur == params);
			def.resolve(result);
		} catch (err) {
			def.reject(err);
		}
		return def.promise;
	}

	function postData(params) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: helperServices.url + '/api/Debitur',
			headers: AuthService.getHeader(),
			data: params
		}).then(
			(x) => {
				service.datas.push(x.data);
				def.resolve(x.data);
			},
			(err) => {
				helperServices.errorHandler(err);
				def.reject(err);
			}
		);

		return def.promise;
	}

	function putData(params) {
		var def = $q.defer();
		try {
			$http({
				method: 'PUT',
				url: helperServices.url + '/api/Debitur/' + params.iddebitur,
				headers: AuthService.getHeader(),
				data: params
			}).then(
				(res) => {
					var dataInCollection = datas.find((x) => x.idpersyaratan == params.iddebitur);
					if (dataInCollection) {
						dataInCollection.nama = res.data.nama;
						def.resolve(res.data);
					} else {
						def.resolve(res.data);
					}
				},
				(err) => {
					helperServices.errorHandler(err);
				}
			);
		} catch (error) {
			helperServices.errorHandler(err);
		}
		return def.promise;
	}

	function removeData(params) {
		var def = $q.defer();
		try {
			$http({
				method: 'Delete',
				url: helperServices.url + '/api/Debitur/' + params.iddebitur,
				headers: AuthService.getHeader()
			}).then(
				(x) => {
					var index = datas.indexOf(params);
					datas.splice(index, 1);
					def.resolve(true);
				},
				(err) => {
					helperServices.errorHandler(err);
				}
			);
		} catch (err) {
			helperServices.errorHandler(err);
		}
		return def.promise;
	}

	function savePenilaian(idperiode, model) {
		var def = $q.defer();
		try {
			model.kriteria.forEach((kriteria) => {
				kriteria.subKriteria.forEach((sub) => {
					if (!sub.nilai) throw Error('nilai tidak boleh kosong');
					if (sub.nilai > sub.maxNilai) throw Error('nilai tidak boleh lebih besar dari nilai maksimum');
				});
			});

			$http({
				method: 'POST',
				url: helperServices.url + '/api/DataKriteria?iddebitur=' + model.iddebitur + '&idperiode=' + idperiode,
				headers: AuthService.getHeader(),
				data: model.kriteria
			}).then(
				(x) => {
					def.resolve(x.data);
				},
				(err) => {
					throw Error(err.message);
				}
			);
		} catch (err) {
			helperServices.errorHandler(err);
			def.reject(err);
		}

		return def.promise;
	}
}
