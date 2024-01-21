import Joi from "joi";

export const structure = [
    {
        name: "password",
        type: "password",
        label: "My Password",
        required: true,
        block: true,
    },
    {
        name: "newPassword",
        type: "password",
        label: "New Password",
        required: true,
        block: true,
    },
    {
        name: "confirmNewPassword",
        type: "password",
        label: "Confirm New Password",
        required: true,
        block: true,
    },
];

export const ChangePasswordSchema = Joi.object({ // put your schema SHAPI
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
        .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
    newPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
        .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),

    confirmNewPassword: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/).message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*')
        .valid(Joi.ref("newPassword"))
        .messages({
            "any.only": "Passwords do not match",
            "string.min":
                "Confirm New Password should have a minimum length of {#limit} characters",
            "string.max":
                "Confirm New Password should have a maximum length of {#limit} characters",
            "string.pattern.lowercase":
                "New Password should contain a lowercase letter",
            "string.pattern.uppercase":
                "New Password should contain an uppercase letter",
            "string.pattern.digit": "New Password should contain a digit",
            "string.pattern.specialCharacter":
                "New Password should contain a special character ($, @, $, !, #)",
            "any.required": "Confirm New Password cannot be empty",
        }),
});