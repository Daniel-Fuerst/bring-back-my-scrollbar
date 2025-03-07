function loadConfig() {

    // Look whether the config is from pre 1.2 version and migrate if so
    browser.storage.sync.get('blacklistDomains').then((result) => {
        const usageType = 'blacklist';
        if (result.blacklistDomains && Array.isArray(result.blacklistDomains)) {
            browser.storage.sync.set({
                domainList: result.blacklistDomains,
                usageType: usageType
            }).then(() => {
                alert('Configuration migrated!');
                browser.storage.sync.remove('blacklistDomains').then(() => {
                    alert('Deprecated configuration removed!');
                }).catch((error) => {
                    console.error('Error while removing old config! | ', error);
                });
            }).catch((error) => {
                console.error('Error while migrating config! | ', error);
            });

            // if we just migrated, the get below might fail, so let's update the UI right now
            const configText = result.blacklistDomains.join('\n');
            document.getElementById('domainList').value = configText;
            document.querySelector(`input[name="usageType"][value="blacklist"]`).checked = true;
        }
    }).catch((error) => {
        console.error('Error converting old config | ', error);
    });

    // default loading of current configuration
    browser.storage.sync.get(['domainList', 'usageType']).then((result) => {
        if (result.domainList && Array.isArray(result.domainList)) {
            const configText = result.domainList.join('\n');
            document.getElementById('domainList').value = configText;
        }
        if (result.usageType) {
            document.querySelector(`input[name="usageType"][value="${result.usageType}"]`).checked = true;
        }
    }).catch((error) => {
        console.error('Could not load config! | ', error);
    });
}

document.getElementById('configForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const input = document.getElementById('domainList').value;
    const stringList = input.split('\n').map(item => item.trim()).filter(item => item.length > 0);
    const usageType = document.querySelector('input[name="usageType"]:checked')?.value || 'blacklist';

    browser.storage.sync.set({
        domainList: stringList,
        usageType: usageType
    }).then(() => {
        alert('Configuration saved!');
    }).catch((error) => {
        console.error('Error while saving config! | ', error);
    });
});

loadConfig();

