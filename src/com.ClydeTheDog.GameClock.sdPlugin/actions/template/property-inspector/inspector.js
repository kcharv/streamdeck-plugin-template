/// <reference path="../../../libs/js/property-inspector.js" />
/// <reference path="../../../libs/js/utils.js" />

$PI.onConnected((jsn) => {
	$PI.loadLocalization('../../../');

	const form = document.querySelector('#property-inspector');
	const { actionInfo, appInfo, connection, messageType, port, uuid } = jsn;
	const { payload, context } = actionInfo;
	const { settings } = payload;

	Utils.setFormValue(settings, form);

	form.addEventListener(
		'input',
		Utils.debounce(150, () => {
			const value = Utils.getFormValue(form);
			$PI.setSettings(value);
		})
	);
});


const localize = (s) => {
    if(typeof s === 'undefined') return '';
    let str = String(s);
    try {
        str = $localizedStrings[str] || str;
    } catch(b) {}
    return str;
};

const localizeUI = () => {
    const el = document.querySelector('.sdpi-wrapper');
    Array.from(el.querySelectorAll('.sdpi-item-label')).forEach(e => {
        const s = e.innerText.trim();
        e.innerHTML = e.innerHTML.replace(s, localize(s));
    });
    Array.from(el.querySelectorAll('*:not(script)')).forEach(e => {
        if(e.childNodes && e.childNodes.length > 0 && e.childNodes[0].nodeValue && typeof e.childNodes[0].nodeValue === 'string') {
            const s = e.childNodes[0].nodeValue.trim();
            e.childNodes[0].nodeValue = e.childNodes[0].nodeValue.replace(s, localize(s));
        }
    });
};

$PI.on('localizationLoaded', (jsn) => {
    localizeUI();
});


const changed = () => {
    console.log('changed', event, event.target, event.target.value);
    // the value of the input field is saved to settings
    $PI.setSettings({[event.target.id]: event.target.value});
    // the value of the input field is also sent to the plugin
    // which is not needed, because the plugin already received
    // the value via the 'setSettings' call
    // This is mostly used to send values to the plugin 
    // that are not saved in the settings
    $PI.sendToPlugin({key: event.target.name, value: event.target.value});
};