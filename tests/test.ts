import { remote } from 'webdriverio'

const wdOpts = {
    protocol: 'http',
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',
    capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android',
        'appium:appPackage': 'cat.deporunners',
        'appium:appActivity': '.MainActivity',
        'appium:noReset': true,
    }
};

async function testAppLaunch() {
    const driver = await remote(wdOpts);
    try {
        // Espera que la app cargue un elemento principal
        const mainElement = driver.$('//*[@id="home-page"]');
        const isDisplayed = await mainElement.isDisplayed();

        if (!isDisplayed) throw new Error('Main screen not displayed');

    } finally {
        await driver.pause(500);
        await driver.deleteSession();
    }
}

testAppLaunch().catch(console.error);