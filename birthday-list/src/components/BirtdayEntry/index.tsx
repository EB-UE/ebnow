/*!
 * Copyright 2020, Staffbase GmbH and contributors.
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
import { UsersWithProfileLink } from "../UsersWithProfileLink"
import './style.css';

export interface BirthdayEntryProps {
  date: Date,
  users: Array<UsersFromApi>,
}

export interface UsersFromApi {
  id: string
  firstName: string
  lastName: string
  profile: UserProfile;
  status: string;
  enabled: boolean;
}

export interface UserProfile {
  geburtsdatum: string;
}

export const BirthdayEntry = ({ date, users }: BirthdayEntryProps): ReactElement => {

  const birthdayUserAtDate = users.filter(user => user.enabled)
    .filter(user => user.status == 'activated')
    .filter(user => user.profile)
    .filter(user => user.profile.geburtsdatum)
    .filter(user => {
      const birthdayString = user.profile.geburtsdatum
      const dmy = birthdayString.split(".");
      const birthday = new Date(parseInt(dmy[2]), parseInt(dmy[1]) - 1, parseInt(dmy[0]));
      return date.getDate() === birthday.getDate() && date.getMonth() === birthday.getMonth();
    })
  const dateformat = new Intl.DateTimeFormat('de-DE', {
    month: '2-digit',
    day: '2-digit'
  })
  const classNames = ["birthday-entry"]
  if (date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
    classNames.push("today")
  }

  const birthdayLine = <li className={classNames.join(" ")}>{dateformat.format(date)}: <UsersWithProfileLink users={birthdayUserAtDate} /> </li>
  return birthdayLine
};

