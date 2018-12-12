window.onload = function () {
  var $textarea = document.getElementById('J-textarea');
  var baseUrl = location.origin + '?';
  var clipboard = new ClipboardJS('#J-footer', {
    text: function () {
      return baseUrl + encodeURI($textarea.value);
    }
  });

  clipboard.on('success', function (e) {
    var data = create_qrcode(baseUrl + encodeURI($textarea.value));
    window.notie.confirm({
      text: '<p>已复制，二维码如下:<p/></br>' + data
    });
  });

  clipboard.on('error', function (e) {
    window.notie.alert({ type: 'error', text: 'Error!', time: 2 });
  });

  var create_qrcode = function (text) {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    var qr = qrcode(0, 'M');
    qr.addData(text, 'Byte');
    qr.make();
    return qr.createSvgTag();
  };
}
