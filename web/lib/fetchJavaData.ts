import { catalogAsCategoryMap } from "@/lib/registry";

function isEmptyData(data: unknown): boolean {
    if (data == null) return true;
    if (typeof data === "object" && Object.keys(data).length === 0) return true;
    return false;
}

export default async function getData() {
    try {
        const java_response = await fetch("https://java.techdiff.io/category/name", {
            method: "GET",
            headers: { Authorization: "Basic " + btoa("john:test123") },
        });

        if (!java_response.ok) {
            return catalogAsCategoryMap();
        }

        const java_data = await java_response.json();

        if (isEmptyData(java_data)) {
            return catalogAsCategoryMap();
        }

        return java_data;
    } catch {
        return catalogAsCategoryMap();
    }
}
