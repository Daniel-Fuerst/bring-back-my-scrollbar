function containsValue(str, arr) {
    return arr.some(item => str.includes(item)) ? true : false;
}

async function executeAddon() {
    try {
        isHit="unknown";
        const configKeys = ['domainList', 'usageType', 'blacklistDomains'];
        const result = await browser.storage.sync.get(configKeys);

        // ensure we have a usage type
        if (! result.usageType) {
            usageType='blacklist';
        } else {
            usageType=result.usageType;
        }

        // check whether we already have a config of v1.2 and use it if so
        if (result.domainList && Array.isArray(result.domainList)) {
            if (containsValue(window.location.hostname, result.domainList))
            {
                isHit="true";
            } else {
                isHit="false";
            }
        }

        // check if the config is not migrated yet
        if (isHit=="unknown") {
            if (result.blacklistDomains && Array.isArray(result.blacklistDomains)) {
                if (containsValue(window.location.hostname, result.blacklistDomains))
                {
                    isHit="true";
                } else {
                    isHit="false";
                }
            }
        }

        checkWhetherToAddScrollbar(isHit, usageType);
    } catch (error) {
        alert('Error while parsing config! | ' + error);
    }
}

function checkWhetherToAddScrollbar(isHit, usageType) {
    if ( ((isHit=="true") && (usageType=="whitelist")) ||
           ((isHit=="false") && (usageType=="blacklist")) ) {
        var r="html,body{overflow:auto !important;}";
        var s=document.createElement("style");
        s.type="text/css";
        s.appendChild(document.createTextNode(r));
        document.body.appendChild(s);
    }
}

executeAddon();

void 0;

