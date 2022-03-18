import React, { useState, useRef, useEffect } from "react";

import "./FadeInSection.css";

export default function FadeInSection(props) {
  const [ isVisible, setVisible ] = useState(false);

  const domRef = useRef();

  useEffect(() => {
    const ele = domRef;
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);

        // No need to keep observing:
        observer.unobserve(ele.current);
      }
    });
 
    observer.observe(ele.current);
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      {props.children}
    </div>
  );
}
