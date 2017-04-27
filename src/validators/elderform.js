export function checkFirstCharacterValidator(nameRe) {
    return function (control) {
        var valid = /^\d/.test(control.value);
        return (valid) ? { checkFirstCharacterValidatorOutput: true } : null;
    };
}
//# sourceMappingURL=elderform.js.map