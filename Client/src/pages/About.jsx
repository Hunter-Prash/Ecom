import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <div className="about-text">
          <p>Welcome to <strong>Ecom</strong>, your number one source for all things <strong>electronics</strong>. We're dedicated to giving you the very best of <strong>smart gadgets</strong>, with a focus on <strong>quality</strong>, <strong>affordability</strong>, and <strong>innovation</strong>.</p>
          
          <p>Founded in <strong>1993</strong> by <strong>Jensen Huang</strong>, Ecom has come a long way from its beginnings in a <strong>small garage in San Francisco, CA</strong>. When <strong>Jensen</strong> first started out, his passion for revolutionizing consumer electronics drove him to <strong>research tirelessly</strong> and invest in cutting-edge technology, so that Ecom can offer you <strong>the latest and most advanced gadgets</strong> at unbeatable prices. We now serve customers all over <strong>the world</strong> and are thrilled that we're able to turn our passion into a leading online marketplace.</p>

          <p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to <strong>contact us</strong>.</p>

          <p><strong>Sincerely,</strong></p>
          <p><strong>Jensen Huang</strong></p>
        </div>
        
        <div className="about-image">
          <img src="../../public/images.webp" alt="About Us" />
        </div>
      </div>
    </div>
  );
}

export default About;
