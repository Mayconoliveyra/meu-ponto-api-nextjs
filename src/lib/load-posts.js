export async function loadPosts() {
    // Call an external API endpoint to get posts
    const res = await fetch("http://127.0.0.1:3000/api/pontos?_diario=true");
    const data = await res.json()

    return data
}