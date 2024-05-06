
const ApiUtils = {

    fetcher: (offset = 0, limit = 10) => fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        body: JSON.stringify({
            limit, offset
        }),
        headers: [
            ["Content-Type", "application/json"]
        ],
    })
        .then(res => res.json())
        .then(res => ({ ...res, offset: offset + res.jdList.length, end: res.jdList.length < limit })),

}


export default ApiUtils;
