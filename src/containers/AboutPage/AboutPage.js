import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './about-us-1057.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Saunatime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>About Yasnanny</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>Start by searching for a location. Once you find a sitter that matches your needs, simply check the availability, book it, and make a secure payment right away.</p>
            </div>

            <div className={css.contentMain}>
              <h2>
                At YasNanny, we believe that a healthy happy life comes from balancing between your needs and your children ́s needs. Having a childcare that is reliable, trustworthy and always available helps achieving this balance. Just a click away you can hire a nearby sitter that is trusted by other members of the YasNanny community.
              </h2>

              <p>
                YasNanny is not just a third party, we do all the work for you by selecting, verifying, and interviewing the best sitters that would fit your needs and meet your expectations. Confirming the booking and the payment is also something we take care of. Now, you can plan that night date or that business trip and YasNanny will take care of your kids.
              </p>
      
              <p>
                Yasnanny is committed to providing an excellent service to its members. Our aim is to keep on creating a healthy and safe environment for our children. We make sure that the sitters help develop the curiosity of your child though different activities. To make the community even safer, YasNanny includes an insurance to both the children and the sitter during the booked hours. Our hats are off to you‚ the ones who pull off the world's greatest balancing act.
              </p>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default AboutPage;
