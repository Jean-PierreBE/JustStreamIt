
export async function getData(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export function dishello() {
    alert("Hello");
}