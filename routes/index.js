var express = require('express');
var router = express.Router();
var geoip = require('geoip-lite');


function getClientIp(req) {
    var ipAddress;
    // The request may be forwarded from local web server.
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        // 'x-forwarded-for' header may return multiple IP addresses in
        // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
        // the first one
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        // If request was not forwarded
        ipAddress = req.connection.remoteAddress.toString();
        if (ipAddress.substr(0, 7) == "::ffff:") {
            ipAddress = ipAddress.substr(7)
        }
    }
    return ipAddress;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(getClientIp(req));
    var geo = geoip.lookup(getClientIp(req));
    if(geo){
        if(geo.city !== 'Pleasant Grove'){
            console.log('bingo');
        }
    }

    res.render('index', {title: 'Express'});
});

module.exports = router;
