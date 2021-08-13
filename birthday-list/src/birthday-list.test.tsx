import React from "react"
import { screen, render } from "@testing-library/react"

import { BirthdayList } from "./birthday-list";

describe("BirthdayList", () => {
    it("should render the component", () => {
        render(<BirthdayList dayspast={7} daysfuture={30} />);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
