import React from "react"
import {screen, render} from "@testing-library/react"

import {LunchlotterieHotdog} from "./lunchlotterie-hotdog";

describe("LunchlotterieHotdog", () => {
    it("should render the component", () => {
        render(<LunchlotterieHotdog contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
