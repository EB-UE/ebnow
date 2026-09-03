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
import { BlockAttributes } from "widget-sdk";

/**
 * React Component
 */
export interface BirthdayPreviewProps extends BlockAttributes {
  message: string;
}

export const BirthdayPreview = async ({ message }: BirthdayPreviewProps): Promise<ReactElement> => {


  const oneUserToGetTotalCount = await we.api.getUsers({
    limit: 1
  });
  const allUsers = await we.api.getUsers({
    limit: oneUserToGetTotalCount.total
  });

  const relevantUsers = allUsers.data
    .filter(user => user.status == 'activated')
    .filter(user => user.profile?.geburtsdatum)
    .filter(user => {
      const birtdayString = user.profile.geburtsdatum
      const dmy = birtdayString.split(".");
      const birthday = new Date(dmy[2], dmy[1] - 1, dmy[0]);
      const today = new Date();
      return today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();
    });

  const userLinks = relevantUsers.map(user => {
    const href = `/profile/${user.id}`
    return <a href={href}> {user.firstName}  {user.lastName} 🎉 </a >
  });





  return <div>{userLinks}</div>;
};

