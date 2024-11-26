export default interface BaseServiceInterface<I, R> {
    execute(input: I): Promise<R>
}