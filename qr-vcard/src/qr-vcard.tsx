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

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import { QRCodeCanvas } from "qrcode.react";

import { VCard, VCardUser } from "./components/VCard";

const QR_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAYFBMVEX////49vnw6/Lw7PL39fj28/e+qsi0nb+0nsDd0+Pe1OPd0+Lt6PDq5O1vQ4RXJHFZJnLe0+NwRIVaKHNwRIbq4+1uQoRWI3BYJXH18/f08PWxmr2lirOmi7OlibOmirPj32u9AAAA8UlEQVRYw+3Y2QqEMAwF0Fj3vVZb19H//8tB6Dwl6DB0UDD3NdzzVEgowCPjCR9HBABhFCcocRQCBGTFs6BIM5y8ACirWqLUVQlQ5EQlFRb0iWHW7KCSLYpUO9hQHf8U7CiwY5BBBhlk8CpQ5A3OvlO06QeU3uh9p1CVz04JCiojwDQvL5RlngBGshJcvb+/TlgS0dNRZdJUJ7TTqFIdipmPwNnghqoiO42J+0D26xG49kSlju00IV5bO2xH4DYQFZkwyCCDDDL4X9D5CnC+pJyv0fvH+bHk/Jy7/wXLIIMMMsjgGfjjp67zb2fnH+MPyxvBVPJppv4sYwAAAABJRU5ErkJggg==";

export interface QrVcardProps extends BlockAttributes {
}

const getLoggedInUser = (): VCardUser => {
  const loggedInUser = (globalThis as any).we?.authMgr?.getUser?.();

  if (loggedInUser && typeof loggedInUser === "object") {
    return loggedInUser as VCardUser;
  }

  throw new Error("No logged-in user available in we.authMgr.getUser()");
};

export const QrVcard = (_props: QrVcardProps): ReactElement => {
  const effectiveUser = getLoggedInUser();
  const vCard = new VCard(effectiveUser).toString();

  return (
      <div style={{ width: 400, height: 400, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <QRCodeCanvas
          value={vCard}
          size={400}
          bgColor="#ffffff"
          fgColor="#5a2873"
          level="H"
          marginSize={4}
          imageSettings={{
            src: QR_LOGO,
            height: 52,
            width: 52,
            excavate: true,
          }}
        />
      </div>
  );
};

