
export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

export const minLength = length => value => {
    if(value.length < length) {
        return `Minimum length ${length} symbols`
    }
    return undefined
};

export const maxLength = (length) => (value) => {
    if(value.length > length) {
        return `Max length ${length} symbols`
    }
    return undefined
};

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;