import React from "react"
import {screen, render} from "@testing-library/react"

import {QrVcard} from "./qr-vcard";
import { VCard } from "./components/VCard";

describe("QrVcard", () => {
    it("should render the component", () => {
        render(<QrVcard contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })

    it("should generate a vCard with the expected user fields", () => {
        const user = {
            id: "user-123",
            firstname: "Ada",
            lastname: "Lovelace",
            profile: { firma: "Staffbase", mobilnummer: "+49123456789" },
            phonenumber: "+49987654321",
            publicEmailAddress: "ada@staffbase.com"
        };

        const card = new VCard(user as any).toString();

        expect(card).toContain("BEGIN:VCARD");
        expect(card).toContain("VERSION:3.0");
        expect(card).toContain("N:Lovelace;Ada");
        expect(card).toContain("ORG:Staffbase");
        expect(card).toContain("TEL;TYPE=WORK:+49987654321");
        expect(card).toContain("TEL;TYPE=CELL:+49123456789");
        expect(card).toContain("EMAIL;TYPE=WORK:ada@staffbase.com");
        expect(card).toContain("UID:urn:uuid:");
    })
})
