'use strict';

angular.module('kriteria.service', []).factory('KriteriaService', KriteriaService);

function KriteriaService(AuthService, $q, $http, message, helperServices) {
	var service = {};
	service.instance = false;
	service.datas = [];

	return {
		get: getData,
		getById: getDatabyId,
		post: postData,
		put: putData,
		remove: removeData,
		postSubCriteria: postSubCriteria,
		putSubCriteria: putSubCriteria,
		removeSubCriteria: removeSubCriteria
	};

	function getData() {
		var def = $q.defer();

		if (!service.instance) {
			$http({
				method: 'GET',
				url: helperServices.url + '/api/Kriteria',
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

	function getDatabyId(params) {}

	function postData(params) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: helperServices.url + '/api/Kriteria',
			headers: AuthService.getHeader(),
			data: params
		}).then(
			(x) => {
				params.idkriteria = x.data.data;
				service.datas.push(params);

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
				url: helperServices.url + '/api/Kriteria/' + params.idkriteria,
				headers: AuthService.getHeader(),
				data: params
			}).then(
				(res) => {
					var dataInCollection = service.datas.find((x) => x.idpersyaratan == params.idkriteria);
					if (dataInCollection) {
						dataInCollection.namaKriteria = res.data.namaKriteria;
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
			message
				.dialogDelete(
					'Yakin Hapus Data ? ',
					helperServices.url + '/api/Kriteria/' + params.idkriteria,
					AuthService.getHeader()
				)
				.then(
					(x) => {
						var index = service.datas.indexOf(params);
						service.datas.splice(index, 1);
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

	function postSubCriteria(params) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: helperServices.url + '/api/SubKriteria',
			headers: AuthService.getHeader(),
			data: params
		}).then(
			(x) => {
				params.idkriteria = x.data.data;
				def.resolve(x.data);
			},
			(err) => {
				helperServices.errorHandler(err);
				def.reject(err);
			}
		);

		return def.promise;
	}

	function putSubCriteria(params) {
		var def = $q.defer();
		try {
			$http({
				method: 'PUT',
				url: helperServices.url + '/api/SubKriteria/' + params.idSubKriteria,
				headers: AuthService.getHeader(),
				data: params
			}).then(
				(res) => {
					var dataInCollection = service.datas.find((x) => x.idpersyaratan == params.idkriteria);
					if (dataInCollection) {
						dataInCollection.namaKriteria = res.data.namaKriteria;
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

	function removeSubCriteria(data, params) {
		var def = $q.defer();
		try {
			message
				.dialogDelete(
					'Yakin Hapus Data ? ',
					helperServices.url + '/api/SubKriteria/' + params.idSubKriteria,
					AuthService.getHeader()
				)
				.then(
					(x) => {
						var index = data.subKriteria.indexOf(params);
						data.subKriteria.splice(index, 1);
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
}
