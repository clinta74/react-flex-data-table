import { get } from 'lodash';

const getObjectByNamespace = function<T> (functionName: string, context: T)  {
    return get(context, functionName);
};

const getValue = function<T> (name: string, context: T) {
    const value = getObjectByNamespace(name, context);

    if (Array.isArray(value)) {
        return value[value.length - 1];
    }

    return value;
}

export { getObjectByNamespace, getValue };