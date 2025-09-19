import type { ExtensionProps } from "../components/extension/types";

const getExtensions = async (): Promise<ExtensionProps[]> => {
    const response = await fetch('/data.json', {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok)
        throw new Error();
    return data;
}

export default getExtensions;