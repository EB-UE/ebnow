export interface VCardUser {
  id?: string | number;
  firstname?: string;
  firstName?: string;
  lastname?: string;
  lastName?: string;
  phonenumber?: string;
  phoneNumber?: string;
  publicEmailAddress?: string;
  email?: string;
  profile?: {
    firma?: string;
    mobilnummer?: string;
  };
}

const normalizeValue = (value?: string): string => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const readFirstDefined = (...values: Array<string | undefined>): string => {
  for (const value of values) {
    const normalized = normalizeValue(value);
    if (normalized) {
      return normalized;
    }
  }

  return "";
};

export function stringToUuid(string: string): string {
  const sanitized = (string ?? "").replace(/-/g, "");

  if (!sanitized) {
    return "00000000-0000-4000-0000-000000000000";
  }

  return "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, (_character, index) => {
    return sanitized[index % sanitized.length] ?? "0";
  });
}

export class VCard {
  private readonly user: VCardUser;

  public constructor(user: VCardUser) {
    this.user = user ?? {};
  }

  private escapeValue(value: string): string {
    return value
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r/g, "")
      .replace(/\n/g, "\\n");
  }

  private getNameParts(): { lastName: string; firstName: string } {
    const lastName = readFirstDefined(this.user.lastname, this.user.lastName);
    const firstName = readFirstDefined(this.user.firstname, this.user.firstName);

    return { lastName, firstName };
  }

  public toString(): string {
    const { lastName, firstName } = this.getNameParts();
    const company = normalizeValue(this.user.profile?.firma);
    const workPhone = readFirstDefined(this.user.phonenumber, this.user.phoneNumber);
    const cellPhone = normalizeValue(this.user.profile?.mobilnummer);
    const workEmail = readFirstDefined(this.user.publicEmailAddress, this.user.email);
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const uid = `urn:uuid:${stringToUuid(String(this.user.id ?? ""))}`;

    const lines: string[] = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${this.escapeValue(lastName)};${this.escapeValue(firstName)}`,
      `FN:${this.escapeValue(fullName)}`,
    ];

    if (company) {
      lines.push(`ORG:${this.escapeValue(company)}`);
    }

    if (workPhone) {
      lines.push(`TEL;TYPE=WORK:${this.escapeValue(workPhone)}`);
    }

    if (cellPhone) {
      lines.push(`TEL;TYPE=CELL:${this.escapeValue(cellPhone)}`);
    }

    if (workEmail) {
      lines.push(`EMAIL;TYPE=WORK:${this.escapeValue(workEmail)}`);
    }

    lines.push(`UID:${uid}`);
    lines.push("END:VCARD");

    return lines.join("\r\n");
  }
}

export default VCard;
