/*!
 * Copyright 2026, Staffbase SE and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

/**
 * schema used for generation of the configuration dialog
 * see https://rjsf-team.github.io/react-jsonschema-form/docs/ for documentation
 */
export const configurationSchema: JSONSchema7 = {
  properties: {
    startdatum: {
      type: "string",
      title: "Startdatum des Anmeldungszeitraums",
      pattern: "^\\d{2}\\.\\d{2}\\.\\d{4}$",
    },
    enddatum: {
      type: "string",
      title: "Enddatum des Anmeldungszeitraums",
      pattern: "^\\d{2}\\.\\d{2}\\.\\d{4}$",
    },
    beitraglink: {
      type: "string",
      title: "Link zum EB-Now Beitrag",
    },
    hotdoganzeigen: {
      type: "string",
      title: "Soll der Hotdog angezeigt werden?",
      enum: ["true", "false"],
      default: "true",
    },
  },
};

/**
 * schema to add more customization to the form's look and feel
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 */
export const uiSchema: UiSchema = {
  startdatum: {
    "ui:placeholder": "TT.MM.JJJJ",
    "ui:help": "Format: TT.MM.JJJJ, z. B. 01.03.2026",
  },
  enddatum: {
    "ui:placeholder": "TT.MM.JJJJ",
    "ui:help": "Format: TT.MM.JJJJ, z. B. 31.05.2026",
  },
  beitraglink: {
    "ui:placeholder": "https://...",
    "ui:help": "Wird als Button verlinkt",
  },
  hotdoganzeigen: {
    "ui:enumNames": ["Ja", "Nein"],
  },
};
