import Papa from 'papaparse';

export async function GetData(name) {
    const data = Papa.parse(await fetchCsv(name));
    return data.data;
}

export async function fetchCsv(name) {
    const response = await fetch(`data/${name}`);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}
