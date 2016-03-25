var request = require('request'),
    cheerio = require('cheerio'),
    iconv = require('iconv-lite'),
    url = 'http://jwzx.cqupt.edu.cn/pubBjStu.php?searchKey=';

function getInfo (stuid, callback) {
    var chunks = [];
    request(url + stuid, function (err, res, body) {
        if (err) {
            console.error.call(console, 'error:');
            return false;
        }
        body = iconv.decode(Buffer.concat(chunks), 'gb2312');
        callback(_analyze(stuid, body));
    }).on('data', function (chunk) {
        chunks.push(chunk);
    });
}

function _analyze (stuid, body) {
    var $ = cheerio.load(body),
        stus = [];

    if ($('tr').eq(1).find('td').eq(0).text() == '\u00A0') {
        console.log('not exist ' + stuid);
        return stu;
    }

    $('tr').each(function (i, ele) {
        if (i !== 0 && $(ele).text() != '') {
            var stu = [];
            $(ele).find('td').each(function (i, ele) {
                stu.push($(ele).text().replace('\u00A0', ''));
            });
            stus.push(stu);
        }
    });
    return stus;
}

module.exports = {
    getInfo: getInfo
};