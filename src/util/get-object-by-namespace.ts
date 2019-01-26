const getObjectByNamespace = function<T> (functionName: string, context: T) {
    if (typeof (functionName) === "function") {
        return functionName;
    }

    let namespaces = functionName.split(".");
    let func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];

        if (context === null || context === undefined) {
            return context;
        }
    }
    return func && context[func];
};

const getValue = function<T> (name: string, context: T) {
    const value = getObjectByNamespace(name, context);

    if (Array.isArray(value)) {
        return value[value.length - 1];
    }

    return value;
}

export { getObjectByNamespace, getValue };