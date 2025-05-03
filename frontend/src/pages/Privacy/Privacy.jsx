import React from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      {/* Hero Section */}
      <section className="privacy-hero">
        <h1>Privacy Policy</h1>
        <Link to="/" className="back-link">Back to Home</Link>
      </section>

      {/* Content Section */}
      <section className="privacy-content">
        <div className="container">
          <div className="policy-text">
            <p>
              MAT provides this Privacy Policy to inform you of our policies and procedures regarding the collection, use, protection, and disclosure of Personal Information received from your use of this website, located at https://mat.com ("Site"), as well as all related websites including our subdomains, applications, browser extensions, and other services provided by us (collectively, together with the Site, our "Service"), and in connection with our customer, vendor, and partner relationships. This Privacy Policy also tells you about your rights and choices with respect to your Personal Information, and how you can reach us to update your contact information or get answers to questions you may have about our privacy practices.
            </p>

            <p>
              In addition to the activities described in this Privacy Policy, we may process Personal Information on behalf of our commercial customers when they use the Service. We process such Personal Information as a data processor of our commercial customers, which are the entities responsible for the data processing. To understand how a commercial customer processes your Personal Information, please refer to that customer's privacy policy.
            </p>

            <p>
              If you are a California resident, our Privacy Notice for California Residents includes additional information about your rights and how we collect, use, and share information.
            </p>

            <p>
              Registration with, use of, and access to the Service is subject to this Privacy Policy and our Terms of Use located at https://mat.com/legal#terms. All terms not defined in this Privacy Policy will have the meanings set forth in the MAT Terms of Use.
            </p>

            <h2>Personal information we may collect</h2>
            <p>
              For the purpose of this Privacy Policy, "Personal Information" means any information relating to an identified or identifiable individual. We obtain Personal Information relating to you from various sources described below.
            </p>

            <p>
              Where applicable, we indicate whether and why you must provide us with your Personal Information, as well as the consequences of failing to do so. If you do not provide Personal Information when requested, you may not be able to benefit from our Service if that information is necessary to provide you with the service or if we are legally required to collect it.
            </p>

            <h2>Personal information provided by you</h2>
            
            <h3>Registration</h3>
            <p>
              If you desire to have access to certain restricted sections of the Site or request to receive marketing materials, you may be required to become a registered user, and to submit the following types of Personal Information to MAT: your name, email address, phone number, full user name, password, city, and time zone.
            </p>

            <h3>Customer Support</h3>
            <p>
              We may collect information through your communications with our customer support team or other communications that you may send us and their contents.
            </p>

            <h3>Making a Purchase</h3>
            <p>
              When you make payments through the Service, you will need to provide Personal Information such as your credit card number and billing address.
            </p>

            <h3>Social Media</h3>
            <p>
              In order to allow you to post to your social media platforms, we may ask you to provide your username, account ids, social handle, timezones, and email address.
            </p>

            <h2>Personal Information Collected from Connected Social Media Accounts</h2>
            
            <h3>Facebook</h3>
            <p>
              MAT may allow you to connect a Facebook page or profile to your MAT account, in which case we will access certain information from Facebook regarding your account. In particular, we may collect profile image, display name, username / page ID or profile ID, access tokens, sent posts. This includes the content of your post and engagement data (such as click rates, likes, re-shares, impressions, as well as general engagement counts), to the extent permitted by applicable law. This data will only be used by MAT to provide you with the Service you expect and will not be shared with any third parties.
            </p>

            <h3>Twitter</h3>
            <p>
              MAT may allow you to connect a Twitter profile to your MAT account, in which case we will access certain information from Twitter regarding your account. In particular, we may collect profile image, display name, username / profile ID, access tokens, and sent posts. This includes the content of your post and engagement data (such as click rates, likes, retweets, re-shares, impressions, as well as general engagement counts), to the extent permitted by applicable law. This data will only be used by MAT to provide you with the Service you expect and will not be shared with any third parties.
            </p>

            <h3>Instagram</h3>
            <p>
              MAT may allow you to connect an Instagram profile to your MAT account, in which case we will access certain information from Instagram regarding your account. In particular, we may collect profile image, display name, username / profile ID, access tokens, and sent posts. This includes the content of your post and engagement data (such as click rates, likes, re-shares, impressions, as well as general engagement counts), to the extent permitted by applicable law. This data will only be used by MAT to provide you with the Service you expect and will not be shared with any third parties.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy; 