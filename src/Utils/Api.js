// A Single Reusable N/w request helper, is used throughout the app.
const ApiUtils = {

    fetcher: (offset = 0, limit = 10) => {
        // console.log("CALLED WITH ", offset)
        const controller = new AbortController();

        return {
            fetchData: () => fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
                method: "POST",
                body: JSON.stringify({
                    limit, offset
                }),
                headers: [
                    ["Content-Type", "application/json"]
                ],
                signal: controller.signal
            })
                .then(res => res.json())
                .then(res => ({ ...res, offset: offset + res.jdList.length, end: res.jdList.length < limit })),

            cancel: () => controller.abort('Cancelling')
        }
    }
}

export default ApiUtils;
