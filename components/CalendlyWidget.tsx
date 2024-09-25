"use client";
import React from "react";
import { InlineWidget } from "react-calendly";

const CalendlyWidget = ({
  url,
  name,
  email,
}: {
  url: string;
  name: string;
  email: string;
}) => {
  return (
    <div className="App">
      <InlineWidget url={url} prefill={{ name, email }} />
    </div>
  );
};

export default CalendlyWidget;
