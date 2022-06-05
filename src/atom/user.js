import {atom} from "recoil";

export const assignmentState = atom({
    key: 'assignmentState', // unique ID (with respect to other atoms/selectors)
    default: {
        assignmentName: "",
        dueDate: new Date(),
        description: "",
    }, // default value (aka initial value)
});