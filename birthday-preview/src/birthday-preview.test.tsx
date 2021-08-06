import React from "react"
import {screen, render} from "@testing-library/react"

import {BirthdayPreview} from "./birthday-preview";

describe("BirthdayPreview", () => {
    it("should render the component", () => {
        render(<BirthdayPreview contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
