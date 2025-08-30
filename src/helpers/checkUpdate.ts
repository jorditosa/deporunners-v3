import { App } from "@capacitor/app";

const checkDeviceVersion = async () => {
    const { version } = await App.getInfo();
    return version;
}

export const checkUpdate = async (): Promise<boolean> => {
    const storeVersion ='3.0.8';
    const deviceVersion = await checkDeviceVersion();
    return storeVersion === deviceVersion;
}