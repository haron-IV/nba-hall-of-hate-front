const axiosHeaders = () => {
    return { 
        params:{}, headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }
}

export { axiosHeaders };