type ValidationResult = {
    success: boolean,
    messages: string[],
}

const toResult = (success: boolean, message: string | null) => ({ success, messages: message && [message] });

const getSuccessResult = () => toResult(true, null);

const concatResult = (result1: ValidationResult, result2: ValidationResult) => toResult(
    result1.success && result2.success,
    [ ...result1.messages, ...result2.messages.filter(s => s) ]
);

const validate = <T extends {}>(test: FlexTable.ValidationTest<T>, item: T, items: T[]) => 
    test.passCondition(item, items) 
        ? getSuccessResult() : toResult(false, test.message);

        const validateAll = <T extends {}>(tests: FlexTable.ValidationTest<T>[], item: T, items: T[]) => 
    tests.reduce((acc, next) => 
        concatResult(acc, validate(next, ...args)), getSuccessResult());

export {
    validate,
    validateAll
};