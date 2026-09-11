import React from "react"
import {screen, render} from "@testing-library/react"

import {WeihnachtspaeckchenaktionChristmastree} from "./weihnachtspaeckchenaktion-christmastree";

describe("WeihnachtspaeckchenaktionChristmastree", () => {
    it("should render the component", () => {
        render(<WeihnachtspaeckchenaktionChristmastree contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
