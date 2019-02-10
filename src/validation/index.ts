const sumValidationResult = <M>(result1: FlexTable.ValidationResult<M>, result2: FlexTable.ValidationResult<M>) => {
    const success = result1.success && result2.success;
    return ({
        success,
        results: result2.success ? result1.results : [...result1.results, ...result2.results],
    });
};

const validate = <M, P>(test: FlexTable.ValidationTest<M, P>, params: P): FlexTable.ValidationResult<M>  => {
    return ({
        success: test.passCondition(params),
        results: [test.result],
    });
};

const getSuccessResult = <M>() => {
    return ({
        success: true,
        results: new Array() as M[]
    });
};

const validateAll = <M, P>(tests: FlexTable.ValidationTest<M, P>[], params: P) => {
    const testResults = tests.reduce((prev, next) => {
        return sumValidationResult<M>(prev as FlexTable.ValidationResult<M>, validate<M, P>(next, params))
    }, getSuccessResult());

    return testResults;
};

export {
    validate,
    validateAll
};