export interface EvalInterface{
    username: string,
    datum: Date,
    za_eval: {
        kategorija: string,
        pojmovi: string[]
    }[]
}