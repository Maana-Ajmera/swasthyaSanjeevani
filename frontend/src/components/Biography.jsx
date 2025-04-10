import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="aboutimg" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who are you</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            officiis repellat consequuntur quaerat fugit totam aut
            exercitationem quidem ipsam suscipit, ut ullam, quis unde, quisquam
            vel reiciendis voluptatum cum doloremque expedita. Odio reiciendis,
            architecto eligendi perspiciatis culpa odit, aliquam, incidunt sunt
            commodi sit facere itaque delectus quisquam maiores veritatis
            necessitatibus!
          </p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            perferendis debitis natus facere dolorum eum cupiditate molestias
            quisquam ab, nostrum sapiente, ex saepe mollitia earum voluptatum
            tempora odit reiciendis. Quasi omnis dolorem quos iste voluptatem.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt
            laudantium illum id!
          </p>
          <p>Lorem, ipsum dolor.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
