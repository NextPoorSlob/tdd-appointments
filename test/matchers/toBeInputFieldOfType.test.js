
import {toBeInputFieldOfType} from "./toBeInputFieldOfType";

import React from "react";
const elementFrom = (text) => {
    const parent = document.createElement("div");
    parent.innerHTML = text;
    return parent.firstChild;
};

const stripTerminalColor = (text) =>
    text.replace(/\x1B\[\d+m/g, "");

describe("toBeInputFieldOfType matcher", () => {
    it("returns pass is true when the given DOM element is a text input field", () => {
        const domElement = elementFrom(
            "<input type=text />"
        );
        const result = toBeInputFieldOfType(
            domElement,
            "text"
        );
        expect(result.pass).toBe(true);
    });

    it("return pass is false when the given DOM element is null", () => {
        const result = toBeInputFieldOfType(null, "text");
        expect(result.pass).toBe(false);
    });

    it("return pass is false when the given DOM element is the wrong tag", () => {
        const result = toBeInputFieldOfType(elementFrom("<p/>"), "text");
        expect(result.pass).toBe(false);
    });

    it("return pass is false when the given DOM element is NOT a text input field", () => {
        const domElement = elementFrom(
            '<input type="submit" />'
        );
        const result = toBeInputFieldOfType(
            domElement,
            "text"
        );
        expect(result.pass).toBe(false);
    });

    it("returns a message that contains the source line if no match", () => {
        const domElement = elementFrom(
            '<input type="submit" />'
        );
        const result = toBeInputFieldOfType(
            domElement,
            "text"
        );
        expect(
            stripTerminalColor(result.message())
        ).toContain(
            `expect(element).toBeInputFieldOfType("text")`
        );
    });

    it("returns a message that contains the source line if negated match", () => {
        const domElement = elementFrom(
            '<input type="text" />'
        );
        const result = toBeInputFieldOfType(
            domElement,
            "text"
        );
        expect(
            stripTerminalColor(result.message())
        ).toContain(
            `expect(element).not.toBeInputFieldOfType("text")`
        );
    });

});