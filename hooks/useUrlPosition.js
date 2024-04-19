import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
    // getting lattitude and longitude parameters from searchParams
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return [lat, lng];
}
