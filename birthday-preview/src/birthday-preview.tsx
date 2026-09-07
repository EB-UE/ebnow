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

import React, { ReactElement, useEffect, useState } from "react";
import { BlockAttributes } from "widget-sdk";

export interface BirthdayPreviewProps extends BlockAttributes {
  message: string;
}

interface BirthdayUser {
  id: string;
  firstName: string;
  lastName: string;
}

export const BirthdayPreview = ({
  message,
}: BirthdayPreviewProps): ReactElement => {
  const [users, setUsers] = useState<BirthdayUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadBirthdays = async () => {
      try {
        const countResult = await we.api.getUsers({
          limit: 1,
        });

        const allUsers = await we.api.getUsers({
          limit: countResult.total,
        });

        const today = new Date();

        const birthdayUsers = allUsers.data
          .filter((user) => user.status === "activated")
          .filter((user) => !!user.profile?.geburtsdatum)
          .filter((user) => {
            try {
              const birthdayString = user.profile.geburtsdatum;

              if (!birthdayString) {
                return false;
              }

              const parts = birthdayString.split(".");

              if (parts.length !== 3) {
                return false;
              }

              const day = Number(parts[0]);
              const month = Number(parts[1]) - 1;
              const year = Number(parts[2]);

              const birthday = new Date(year, month, day);

              return (
                birthday.getDate() === today.getDate() &&
                birthday.getMonth() === today.getMonth()
              );
            } catch {
              return false;
            }
          })
          .map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          }));

        if (mounted) {
          setUsers(birthdayUsers);
        }
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError("Geburtstage konnten nicht geladen werden.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadBirthdays();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div>Lade Geburtstage ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (users.length === 0) {
    return <div>🎂 Heute hat niemand Geburtstag.</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
        🎉 Heute haben Geburtstag:
      </div>

      {users.map((user) => (
        <div key={user.id}>
          {`/profile/${user.id}`}
            {user.firstName} {user.lastName} 🎂
          </a>
        </div>
      ))}
    </div>
  );
};
