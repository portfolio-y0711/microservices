export interface IDatabaseAdaptor<T> {
    create: (t: T) => Promise<T>
}