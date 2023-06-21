import _ from "lodash";

export function getReportData(data) {
    if (typeof data === "object" && !Array.isArray(data)) {
        data = [data]
    }

    if (!data || data.length === 0) {
        return { data: null, headers: null };
    }
    const headers = Object.keys(data[0]).map((key) => {
        if (typeof data[0][key] === "object") {
            return undefined;
        } else {
            return { key, label: _.startCase(key) };
        }
    }).filter(a => a);
    return { data, headers };
}