interface GetAttacksPayloadInterface {
    startDateTime: string,
    endDateTime: string,
    sortBy: string | undefined,
    page: number,
    pageSize: number;
}

export default GetAttacksPayloadInterface;
