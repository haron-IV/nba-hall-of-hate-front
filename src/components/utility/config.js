const axiosHeaders = () => {
    return { 
        params:{}, headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }
}

// Here you can set enpoints base usrl for nba hoh api
const host_origin = () => {
    const dev = "http://localhost:8080";
    const prod = "http://nba-hoh.herokuapp.com";

    return prod;
}

export { axiosHeaders, host_origin };