import {atom} from "recoil";

export const assignmentState = atom({
    key: 'assignmentState', // unique ID (with respect to other atoms/selectors)
    default: {
        assignmentName: "",
        dueDate: new Date(),
        description: "",
    }, // default value (aka initial value)
});

export const studentState = atom({
    key: 'studentState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export const professorState = atom({
    key: 'professorState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});