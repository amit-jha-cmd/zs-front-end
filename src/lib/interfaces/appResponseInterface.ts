interface AppResponseInterface<T> {
    status: number,
    message: string,
    data: T | null,
}

export default AppResponseInterface;
