import React from "react"
import {screen, render} from "@testing-library/react"

import {TemplateMinOneHyphenIsNeeded} from "./template-min-one-hyphen-is-needed";

describe("TemplateMinOneHyphenIsNeeded", () => {
    it("should render the component", () => {
        render(<TemplateMinOneHyphenIsNeeded contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
