type ValidatorType = (value: string) =>  string | undefined

export const required: ValidatorType = (value) => (value ? undefined : 'Required');

export const minLength = (length: number): ValidatorType => (value) => {
    if(value.length < length) {
        return `Minimum length ${length} symbols`
    }
    return undefined
};

export const email : ValidatorType = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;