import React from "react"
import { screen, render } from "@testing-library/react"

import { BirthdayList } from "./birthday-list";

describe("BirthdayList", () => {
    it("should render the component", () => {
        render(<BirthdayList daysPast={7} daysFuture={30} />);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
