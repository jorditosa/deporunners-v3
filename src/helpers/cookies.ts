import { Preferences } from '@capacitor/preferences';


export async function getCookie(key: string): Promise<any> {
    const { value } = await Preferences.get({ key: key });
    // Json parse
    if(value) {
        const parsedValue: any = JSON.parse(value);
        return parsedValue;
    }
}

export async function setCookie(key: string, valor: string) {

    await Preferences.set({
        key: key,
        value: JSON.stringify(valor),
    })
}

export async function deleteCookie (key: string) {
    await Preferences.remove({
        key: key
    });
}