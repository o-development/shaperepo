import React from 'react';
import { NextPage } from 'next';
import CustomLink from '../components/common/CustomLink';
import mixpanel from 'mixpanel-browser';

const Contact: NextPage = () => {
  mixpanel.track('Contact Page Visited');
  return (
    <>
      <h2>Add your project&apos;s shapes to ShapeRepo</h2>
      <p>
        Reach out and we&apos;ll add your shape to ShapeRepo so any similar
        projects can be interoperable with yours. Tell us about your project and
        how you&apos;re structuring your data.
      </p>
      <p>Contact us:</p>
      <ul>
        <li>Via Email at: shaperepo@o.team</li>
        <li>
          In the{' '}
          <CustomLink
            href="https://gitter.im/o-development/shape-repo?utm_source=share-link&utm_medium=link&utm_campaign=share-link"
            target="_blank"
          >
            gitter chat
          </CustomLink>
        </li>
        <li>
          On twitter at:{' '}
          <CustomLink href="https://twitter.com/otherJackson" target="_blank">
            @otherJackson
          </CustomLink>
        </li>
      </ul>
    </>
  );
};

export default Contact;
