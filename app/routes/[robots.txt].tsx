export  async function loader() {
    // allow all robots and all paths
    return new Response("User-agent: *\nDisallow: ", {
        headers: {
            "content-type": "text/plain",
        },
    });
}