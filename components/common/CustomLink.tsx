import React from 'react';
import { parse } from 'url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

interface CustomLinkProps {
  href: string;
  target?: string;
}

const CustomLink: React.FunctionComponent<CustomLinkProps> = ({
  children,
  href,
  target,
}) => {
  if (!href) {
    return <span>{children}</span>;
  }

  const parsedUrl = parse(href, true);
  const isExternalLink = !!parsedUrl.hostname;
  const content =
    isExternalLink || target === '_blank' ? (
      <span>
        {children} <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
      </span>
    ) : (
      children
    );

  if (target) {
    return (
      <a href={href} target={target}>
        {content}
      </a>
    );
  }
  return <a href={href}>{content}</a>;

  // Can't use the link component because of glitch with encoding urls in the query
  // return (
  //   <Link href={url}>
  //     <a>{content}</a>
  //   </Link>
  // )
};

export default CustomLink;
