class ApiService {
    //

    headers = {
        "Content-Type": "application/json",
        "x-api-key": "live_mWCqFulfDzpxRFMiJ5r2AQ9wovQ8eaDbEGagD1YoopSZOXw9mFGLKRP3iQNxgatM"
    }
    requestOptions = {
        method: 'GET',
        headers: this.headers,
        redirect: 'follow'
    };

    async getCats(){
        try{
            let response = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=25", this.requestOptions).then(res => res.json());
            // console.log(response)
            return response;
        
        }
        catch(e){
            console.log(e);
        }
    }



}
let api = new ApiService();
export default api;