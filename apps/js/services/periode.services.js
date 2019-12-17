'use strict';
angular.module('periode.service', []).factory('PeriodeService', PeriodeService);

function PeriodeService(AuthService, $q, $http, message, helperServices) {
	var service = {};
	service.instance = false;
	service.datas = [];

	return {
		get: getData,
		getById: getDatabyId,
		post: postData,
		put: putData,
		remove: removeData
	};

	function getData() {
		var def = $q.defer();

		if (!service.instance) {
			$http({
				method: 'GET',
				url: helperServices.url + '/api/Periode',
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
			def.resolve(datas);
		}

		return def.promise;
	}

	function getDatabyId(params) {}

	function postData(params) {
		var def = $q.defer();
		$http({
			method: 'POST',
			url: helperServices.url + '/api/periode',
			headers: AuthService.getHeader(),
			data: params
		}).then(
			(x) => {
				params.idpersyaratan = x.data.data;
				datas.push(params);
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
				url: helperServices.url + '/api/periode/' + params.idperiode,
				headers: AuthService.getHeader(),
				data: params
			}).then(
				(res) => {
					var dataInCollection = datas.find((x) => x.idperiode == params.idperiode);
					if (dataInCollection) {
						dataInCollection.periode = params.periode;
						dataInCollection.status = params.status;
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
			def.reject(err);
		}
		return def.promise;
	}

	function removeData(params) {
		var def = $q.defer();
		try {
			message
				.dialogDelete(
					'Yakin Hapus Data ? ',
					helperServices.url + '/api/Persyaratan/' + params.idperiode,
					AuthService.getHeader()
				)
				.then(
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
}
