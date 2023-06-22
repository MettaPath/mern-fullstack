import React from "react";
export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Your Link:
        <a
          href={link.to}
          target="_blank"
          rel="noreferrer noopener"
        >
          {link.to}
        </a>
      </p>
      <p>
        From:
        <a
          href={link.to}
          target="_blank"
          rel="noreferrer noopener"
        >
          {link.from}
        </a>
      </p>
      <p>
        Quantity of clicks on link: <strong>{link.clicks}</strong>
      </p>
      <p>
        Created: <strong>{new Date().toLocaleDateString()}</strong>
      </p>
    </>
  );
};
