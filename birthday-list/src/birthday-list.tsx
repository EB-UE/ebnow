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

import { BlockAttributes } from '@staffbase/widget-sdk';
import React, { ReactElement, useState, useEffect } from 'react';
import { BirthdayEntry, UsersFromApi } from "./components/BirtdayEntry";

/**
 * React Component
 */
export interface BirthdayListProps extends BlockAttributes {
  daysPast: number;
  daysFuture: number;
}

export const BirthdayList = ({ daysPast, daysFuture }: BirthdayListProps): ReactElement => {
  console.log(daysPast)
  console.log(daysFuture)
  daysPast = daysPast ?? 7
  daysFuture = daysFuture ?? 30

  const dates = [];

  for (let i = -daysPast; i <= daysFuture; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  const [users, setUsers] = useState<UsersFromApi[]>([]);

  useEffect(() => {
    function someFunction() {
      we.api.getUsers({
        limit: 1
      })
        .then(response => we.api.getUsers({
          limit: response.total
        })
          .then(response => {
            setUsers(response.data)
          })
        );
    }
    someFunction()
  }, []);

  return <div>
    {dates.map((date) => <BirthdayEntry date={date} users={users} />)}
  </div>;
};

