import React from "react"
import {screen, render} from "@testing-library/react"

import {QrVcard} from "./qr-vcard";

describe("QrVcard", () => {
    it("should render the component", () => {
        render(<QrVcard contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
