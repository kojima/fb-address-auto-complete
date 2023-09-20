(function() {
    "use strict";

    const clearFields = (state, params) => {
        // 都道府県
        const prefecture = state.record.注文表_新規用.value[params.index].value['都道府県']
        prefecture.value = '';
        // 市区町村
        const city = state.record.注文表_新規用.value[params.index].value['市区町村']
        city.value = '';
        // 地域
        const region = state.record.注文表_新規用.value[params.index].value['地域']
        region.value = '';
    };

    const autoCompleteAddress = (state, params, zipCode) => {
        // 都道府県
        const prefecture = state.record.注文表_新規用.value[params.index].value['都道府県']
        // 市区町村
        const city = state.record.注文表_新規用.value[params.index].value['市区町村']
        // 地域
        const region = state.record.注文表_新規用.value[params.index].value['地域']
        const res = fetchAddress(zipCode);
        if (res.status === 200) {
            prefecture.value = res.prefecture;
            city.value = res.address1;
            region.value = res.address2 + res.address3 + res.address4;
        } else {
            clearFields(state, params);
        }
    }

    fb.events.fields.注文表_新規用.fields.郵便番号_0.changed = [function (state, params) {
        const zipCode = params.value;

        if (zipCode.length < 7 || zipCode.length > 8) {
            clearFields(state, params);
            return state;
        }

        autoCompleteAddress(state, params, zipCode);

        return state;
    }];
  })();