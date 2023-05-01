import classnames from 'classnames';
import * as React from 'react';
import { getAnchorLink } from '../utils';

export interface HeaderProps {
  className?: string;
  text: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { className, text } = props;
  const classes = classnames('font-bold my-5 py-1 text-xl text-lime-500', className);
  const anchorLink = getAnchorLink(text);

  return (
    <h3 className={classes} id={anchorLink}>
      <a href={`#${anchorLink}`}>{text}</a>
    </h3>
  );
};

export { Header };
