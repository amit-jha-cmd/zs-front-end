interface ApiInterface<T = null> {
    path: string,
    type: "GET" | "POST" | "PUT" | "PATH",
    data: T
}

export default ApiInterface;