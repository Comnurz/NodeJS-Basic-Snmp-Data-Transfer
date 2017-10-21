var snmp = require ("net-snmp");
var net = require('net');
// Creating session for snmp
var session = snmp.createSession ("127.0.0.1", "public");
var oids = ["1.3.6.1.4.1.2021.10.1.3.1", "1.3.6.1.2.1.1.1.0","1.3.6.1.4.1.2021.4.6.0","1.3.6.1.4.1.2021.9.1.8.1"];
//                  CPU                         SYSDESC               RAM                   DISK
// Server connection
var client = net.connect(PORT, 'URL');
// Get snmp data
session.get (oids, function (error, varbinds) {
    if (error) {
        console.error (error);
    } else {
        for (var i = 0; i < varbinds.length; i++)
        {
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]))
            else
              {
                  console.log (varbinds[i].oid + " = " + varbinds[i].value);
                  // Data send to server
                  client.write(varbinds[i].value.toString(),function(err){client.end();});
              }
        }
        console.log("data sent");
    }
});
session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error)
        console.error (error);
});
