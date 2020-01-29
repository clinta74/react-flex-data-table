import { validate, validateAll } from '../index';
import { FlexTable } from '../..';

type ValidationMessage = { 
    message: string,
    id: string,
}

type ValidationParams = {
    value: string
}

const v1: FlexTable.ValidationTest<ValidationMessage, ValidationParams> = {
    passCondition: params => params.value.length > 4,
    result: {
        id: 'name',
        message: 'lenght of value must be more than 4',
    }
}

const v2: FlexTable.ValidationTest<ValidationMessage, ValidationParams> = {
    passCondition: params => params.value.length < 100,
    result: {
        id: 'name', 
        message:'lenght of value less than 100',
    },
}

const paramsFail = {
    value: 'test'
};

const paramsSuccess = {
    value: 'testing'
};

describe('validator tests', () => {
    it('single more than 4 validator returns sucess true', () => {
        expect(validate(v1, paramsFail)).toEqual({ "results": [ {
            id: 'name',
            message: 'lenght of value must be more than 4',
        }], "success": false });
    });

    it('single less than 100 validator returns success false', () => {
        expect(validate(v2, paramsFail)).toEqual({ "results": [{
            id: 'name', 
            message:'lenght of value less than 100',
        }], "success": true });
    });

    it('single validator returns valid', () => {
        expect(validate(v1, paramsSuccess)).toEqual({ "results": [{
            id: 'name',
            message: 'lenght of value must be more than 4',
        }], "success": true });
    });

    it('single validator returns valid', () => {
        expect(validate(v2, paramsSuccess)).toEqual({ "results": [{
            id: 'name', 
            message:'lenght of value less than 100',
        }], "success": true });
    });


    it('validate all returns lenght of value must be more than 4 and success false', () => {
        expect(validateAll([v1, v2], paramsFail)).toEqual({
            "results": [
                {
                    id: 'name',
                    message: 'lenght of value must be more than 4',
                },
            ],
            "success": false,
        });
    });

    it('validate all returns success true', () => {
        expect(validateAll([v1, v2], paramsSuccess)).toEqual({
            "results": [],
            "success": true,
        });
    });
});