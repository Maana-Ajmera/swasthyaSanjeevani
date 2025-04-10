import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, ex?
          Excepturi dolor, nulla distinctio earum delectus, commodi sunt, nam
          velit maxime necessitatibus ab voluptates sapiente quaerat? Corporis
          eum molestias vitae? Velit quos at magni nemo autem, aspernatur eius
          iste placeat aliquam labore temporibus sunt saepe error ex non unde
          distinctio reiciendis totam asperiores odio corporis praesentium.
          Totam odit ipsam illo? Quis voluptate natus pariatur, vitae beatae
          ratione, veritatis labore, eos id quas iusto quaerat repellendus.
          Corrupti ipsam eaque, odio culpa
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} className="animated-image" />
        <span>
          <img src="/Vector.png" alt="" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
