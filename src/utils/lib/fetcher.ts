import axios from "axios";
export function fetcher(url: string) {
    return axios.get(url).then((response) => response.data)
}