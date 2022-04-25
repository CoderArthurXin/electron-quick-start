// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const wifi = require('node-wifi');
const fs = require('fs');

document.getElementById("filters").value = 'Razer,RZ'
wifi.init({
  debug: true,
  iface: process.env.WIFI_IFACE
});

function setResult(result) {
  if (typeof(result) !== 'string') {
    document.getElementById('wifi-list').innerText = JSON.stringify(result);
    return;
  }

  document.getElementById('wifi-list').innerText = result;
}

function scanWifi() {
  try {
    wifi.scan((err, networks) => {
      if (err) {
        setResult(err.message);
      } else {
        let filters = document.getElementById("filters").value?.split(',');
        if (filters) {
          let len = filters.length;
          networks = networks.filter((net) => {
            for(let i = 0; i < len; ++i) {
              if (net.ssid.indexOf(filters[i]) !== -1) return true;
            }
            return false;
          })
        }

        let s = JSON.stringify(networks);
        document.getElementById('wifi-list').innerText = s;
      }
    });
  } catch (e) {
    setResult(e.message);
  }
}

