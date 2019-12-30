angular.module('message.service', []).factory('message', MessageServices);

function MessageServices(swangular, $q, $http) {
	return {
		info: info,
		error: error,
		warning: warning,
		dialog: dialog,
		dialogDelete: dialogDelete
	};

	function info(params, titleParam) {
		const title = !titleParam ? 'Sukses' : Number.isInteger(titleParam) ? '"' + titleParam + '"' : titleParam;

		swangular.swal({
			title: title,
			text: params,
			type: 'info'
		});
	}

	function error(params, titleParam) {
		var isnumber = Number.isInteger(titleParam);
		var title = 'Error';

		if (isnumber) {
			switch (titleParam) {
				case 401:
					title = 'Anda Tidak Memiliki Akses';
					break;
				case 404:
					title = 'Halaman Tidak Ditemukan';
					break;

				default:
					title = 'Error';
					break;
			}
		}

		swangular.swal({
			title: title,
			text: params,
			type: 'error'
		});
	}

	function warning(params, titleParam) {
		const title = !titleParam ? 'Sukses' : Number.isInteger(titleParam) ? '"' + titleParam + '"' : titleParam;
		swangular.swal({
			title: 'Sukses',
			text: params,
			type: 'warning'
		});
	}

	function dialog(messageText, yesBtn, cancelBtn) {
		var def = $q.defer();
		var yesText = 'Ya';
		var cancelText = 'Batal';

		if (yesBtn) yesText = yesBtn;

		if (cancelBtn) cancelText = cancelBtn;

		swangular
			.swal({
				title: 'Yakin ?',
				text: messageText,
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: yesText,
				cancelButtonText: cancelText,
				reverseButtons: true
			})
			.then((result) => {
				if (result.value) {
					def.resolve(result.value);
				} else {
					def.reject(result.value);
				}
			});

		return def.promise;
	}

	function dialogDelete(messageText, url, header) {
		var def = $q.defer();
		var yesText = 'Ya';
		var cancelText = 'Batal';
		swangular.swal({
			title: 'Delete',
			text: messageText,
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: yesText,
			cancelButtonText: cancelText,
			showLoaderOnConfirm: true,
			preConfirm: async (login) => {
				try {
					var result = await $http({
						method: 'Delete',
						url: url,
						headers: header
					});

					if (result.status == 200) {
						def.resolve(true);
					}
				} catch (err) {
					swangular.swal({
						title: 'Error',
						text: 'Data Tidak Berhasil Dihapus',
						type: 'error'
					});
				}
			},
			allowOutsideClick: () => !Swal.isLoading()
		});

		return def.promise;
	}
}
