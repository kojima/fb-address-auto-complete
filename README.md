## 住所自動補完スクリプト
郵便番号により、住所を自動補完します。

`address-auto-complete.js` は、その使用例です。

### `address-auto-complete.js` の概要
フォーム中の `注文表_新規用` サブテーブルの `郵便番号_0` フィールドに変更が生じた場合に、住所の補完を行います。

`注文表_新規用` サブテーブルの `郵便番号_0` の郵便番号(`zipCode`)を使い `fetchAddress` により住所情報を取得(`res`)し、同サブテーブル内の `都道府県` 、 `市町村` 、 `地域` フィールドにそれぞれ `res.prefecture` 、 `res.address1` 、 `res.address2 + res.address3 + res.address4` を設定しています。

`zipCode` の文字列長が7文字(ハイフンなしの郵便番号)もしくは8文字(ハイフンありの郵便番号)と一致しない場合は、 `clearFields` 関数により、`都道府県` 、 `市町村` 、 `地域` フィールドをクリアしています。

### スクリプトのセットアップ
`src` フォルダ内の `zip-code-utils.js` および `address-auto-complete.js` を該当のFormBridgeフォームに追加してください。

`address-auto-complete.js` は、上記概要に従って、内容を適宜変更してください。