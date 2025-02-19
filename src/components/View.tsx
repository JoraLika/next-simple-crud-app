"use server";

import React from "react";
import Ping from "./Ping";
import { client } from "../sanity/lib/client";
import { STARTUP_VIEWS_QYERY } from "../sanity/lib/queries";
import { incrementViews } from "../sanity/lib/actions"; // Import the server action

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QYERY, { id });

  await incrementViews(id, totalViews); // Call the Server Action

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
