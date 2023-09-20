/****************************************************************************************
 * 郵便番号から住所を取得する関数
 * fetchAddress: 同期版 (住所の結果が返ってくるまで処理が先に進まない)
 * fetchAddressAsync: 非同期版 (住所の結果が返ってこなくても、処理を先に進める)
 * ※ FormBridgeで使用する場合は、大半はfetchAddressを使用すれば良い
 * 引数:
 *   zipCode: 郵便番号 (7桁の数字, ハイフンの有無は問わない)
 * 戻り値:
 *   {
 *     status: <number>,
 *     message: <string>,
 *     prefecture: <string>,
 *     address1: <string>,
 *     address2: <string>,
 *     address3: <string>,
 *     address4: <string>
 *   }
 * 郵便番号の取得が成功した場合(status === 200)のみ、prefecture, address1, address2,
 * address3, address4 に住所情報がセットされる。
 * 
 * 呼び出し例:
 *   const res = await fetchAddress('1040032');
 *   if (res.status === 200) {
 *     console.log(res.prefecture, res.address1, res.address2, res.address3, res.address4)
 *   }
 * 
 * 使用API:
 *   https://github.com/madefor/postal-code-api
 ****************************************************************************************/
const fetchAddress = zipCode => {

    const zipCodePattern = /^[0-9]{3}-?[0-9]{4}$/;
    if (zipCode.match(zipCodePattern) === null) {
        return {
            status: 400,
            message: 'invalid zip code pattern: needs 7digits'
        };
    };

    let response = null;
    zipCode = zipCode.replace('-', '');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const jsonData = JSON.parse(xhr.responseText);
                response = {
                    status: xhr.status,
                    message: xhr.statusText,
                    code: jsonData.code,
                    prefecture: jsonData.data[0]['ja'].prefecture,
                    address1: jsonData.data[0]['ja'].address1,
                    address2: jsonData.data[0]['ja'].address2,
                    address3: jsonData.data[0]['ja'].address3,
                    address4: jsonData.data[0]['ja'].address4
                };
            } else {
                response = {
                    status: xhr.status,
                    message: xhr.statusText
                };
            }
        }
    }
    xhr.ontimeout = () => {
        response = {
            status: xhr.status,
            message: xhr.statusText
        };
    }
    const zipCode1 = zipCode.slice(0, 3);
    const zipCode2 = zipCode.slice(3);
    const url = `https://madefor.github.io/postal-code-api/api/v1/${zipCode1}/${zipCode2}.json`;
    xhr.open('get', url, false);
    xhr.send();

    return response;
}

const fetchAddressAsync = zipCode => {

    return new Promise((resolve, reject) => {
        const zipCodePattern = /^[0-9]{3}-?[0-9]{4}$/;
        if (zipCode.match(zipCodePattern) === null) {
            reject({
                status: 400,
                message: 'invalid zip code pattern: needs 7digits'
            })
        };
        zipCode = zipCode.replace('-', '');
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const jsonData = JSON.parse(xhr.responseText);
                    resolve({
                        status: xhr.status,
                        message: xhr.statusText,
                        code: jsonData.code,
                        prefecture: jsonData.data[0]['ja'].prefecture,
                        address1: jsonData.data[0]['ja'].address1,
                        address2: jsonData.data[0]['ja'].address2,
                        address3: jsonData.data[0]['ja'].address3,
                        address4: jsonData.data[0]['ja'].address4
                    });
                } else {
                    reject({
                        status: xhr.status,
                        message: xhr.statusText
                    });
                }
            }
        }
        xhr.ontimeout = () => {
            reject({
                status: xhr.status,
                message: xhr.statusText
            });
        }
        const zipCode1 = zipCode.slice(0, 3);
        const zipCode2 = zipCode.slice(3);
        const url = `https://madefor.github.io/postal-code-api/api/v1/${zipCode1}/${zipCode2}.json`;
        xhr.open('get', url, true);
        xhr.send();
    });
}
