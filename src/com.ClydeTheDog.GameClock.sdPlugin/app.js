/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const myAction = new Action('com.clydethedog.gameclock.myaction');
console.log('myAction', myAction)

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected!');
});

myAction.onKeyUp(({ action, context, device, event, payload }) => {
	console.log('Your key code goes here!');
});

myAction.onDialRotate(({ action, context, device, event, payload }) => {
	console.log('Your dial code goes here!');
});

myAction.onDidReceiveSettings(({context, payload}) => {
	console.log('Your settings code goes here!');
});

myAction.onSendToPlugin(({context, payload}) => {
	console.log('Your settings2 code goes here!');
});

myAction.onPropertyInspectorDidAppear(jsn => {
    console.log('onPropertyInspectorDidAppear', jsn.context);
});

myAction.onWillAppear(({context, payload}) => {
    console.log('onWillAppear', context, payload);
});