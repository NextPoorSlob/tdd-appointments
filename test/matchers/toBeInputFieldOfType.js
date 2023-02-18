import {
    matcherHint,
    printExpected,
    printReceived,
} from "jest-matcher-utils";

export const toBeInputFieldOfType = (
    element,
    expectedType
) => {
    const pass =
        element?.tagName === "INPUT" &&
        element.type === expectedType;
    const sourceHint = () =>
        matcherHint(
            "toBeInputFieldOfType",
            "element",
            printExpected(expectedType),
            {isNot: pass}
        );
    const actualTypeHint = () =>
        "Actual type: " +
        printReceived(element.type || Object.values(element));
    const message = () =>
        [sourceHint(), actualTypeHint()].join("\n\n");
    return {pass, message};
};