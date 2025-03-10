# Tested plugins
We tested the following plugins

```
webview_flutter: ^4.10.0
flutter_blue_plus: ^1.34.5
```

# Receiving Wayfinder events
To receive events from the WebView we added a JavaScriptChannel to the WebViewController instance. This will send every WayfinderEvent as a JSON array. The first parameter is the event type like ('data-loaded', 'map-click' etc)

```
controller.addJavaScriptChannel(
   'WayfinderChannel',
   onMessageReceived: (JavaScriptMessage message) {
      debugPrint(message.message);
   },
)
```

# To start BLE positioning
```
_controller.runJavaScript('window.wayfinder.startBeaconLocating()');
```
This will let 3DWayfinder know to start calculating a position

# Sending BLE beacons to wayfinder
```
_controller.runJavaScript('window.wayfinder.pushReading("ble", {
	"uuid": "0000180a-0000-1000-8000-00805f9b34fb", 
	"major": 1, 
	"minor": 1, 
	"rssi": 1, 
	"tx": 1
})');
```

### Where 
* uuid: is the beacon manufacturers provided id
* major: is usually used for different floors
* minor: incremented id (unique for each floor)
* rssi: measured signal strength (provided by the mobile device)
* tx: power of the device (provided by the mobile device)


