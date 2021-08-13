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

import React, { ReactElement, useState, useEffect } from 'react';
import { BirthdayEntry, UsersFromApi } from "./components/BirtdayEntry";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * React Component
 */
export interface BirthdayListProps {
  dayspast: number;
  daysfuture: number;
}

export const BirthdayList = ({ dayspast, daysfuture }: BirthdayListProps): ReactElement => {

  dayspast = dayspast ?? 7
  daysfuture = daysfuture ?? 30

  const dates = [];

  for (let i = -dayspast; i <= daysfuture; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  const [users, setUsers] = useState<UsersFromApi[]>([]);
  const [loading, setLoading] = useState(true);

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
            setLoading(false)
          })
        );
    }
    someFunction()
  }, []);

  return <div>
    {loading ? <ClipLoader loading={loading} /> : dates.map((date) => <BirthdayEntry date={date} users={users} />)}
  </div>;
};

