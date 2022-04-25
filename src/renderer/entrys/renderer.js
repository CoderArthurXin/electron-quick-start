// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const wifi = require('node-wifi');
const fs = require('fs');

let arrWifi = [];

document.getElementById("filters").value = 'Razer,RZ'
wifi.init({
  debug: true,
  iface: process.env.WIFI_IFACE
});

/******* 
 * @Author: Arthur Xin
 * @description: set result
 * @param {*} result
 * @return {*}
 */
function setResult(result) {
  if (typeof(result) !== 'string') {
    document.getElementById('wifi-list').innerText = JSON.stringify(result);
    return;
  }

  document.getElementById('wifi-list').innerText = result;
}

/******* 
 * @Author: Arthur Xin
 * @description: scan wifi
 * @param {*}
 * @return {*}
 */
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

        // 设置WiFi选择列表
        setWifiForSelected(networks);

        let s = JSON.stringify(networks);
        document.getElementById('wifi-list').innerText = s;
      }
    });
  } catch (e) {
    setResult(e.message);
  }
}

/******* 
 * @Author: Arthur Xin
 * @description: set select list
 * @param {*}
 * @return {*}
 */
let children = [];
function setWifiForSelected(wifiList) {
  if (!wifiList) return;

  let parent = document.getElementById('wifi-for-select');

  // 删除以前的列表
  children.forEach(child => {
    child.remove();
  });

  // 全局变量赋值
  arrWifi = wifiList;

  console.log('parent', parent);
  wifiList.forEach(wifi => {
    let wifiName = wifi.ssid;
    let option = document.createElement('option');
    option.value = wifiName;
    console.log('option', option);
    parent.appendChild(option);
    
    children.push(option);
  })
}

/******* 
 * @Author: Arthur Xin
 * @description: connet wifi
 * @param {*}
 * @return {*}
 */
function connectWifi() {
  let wifiName = document.getElementById('wifi-name').value;
  let wifiPwd = document.getElementById('wifi-password').value;
  if (!wifiName) {
    setResult('Please select Wi-Fi');
    return;
  }

  const ap = {
    ssid: wifiName,
    password: wifiPwd
  };
  console.log('ap', ap);

  wifi
    .connect({
      ssid: wifiName,
      password: wifiPwd,
    })
    .then(() => {
      console.log('connected');
      setResult('Connected');
    })
    .catch(e => {
      console.log(e);
      setResult(e.message);
    });
}