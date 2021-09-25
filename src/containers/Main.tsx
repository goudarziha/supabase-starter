import React, { useState, useEffect } from "react";
import { Hero, Features, Pricing, CookieConsent } from "../components";

const Main = () => {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      {/* TODO CHECK FOR COOKIE IF SAVED */}
      <CookieConsent position={"fixed"} bottom={0} right={0} left={0} />
    </>
  );
};

export default Main;
