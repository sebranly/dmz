import classnames from 'classnames';
import * as React from 'react';

export interface HeaderProps {
  className?: string;
  text: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { className, text } = props;
  const classes = classnames('font-bold my-5 text-xl text-lime-500', className);

  return <h3 className={classes}>{text}</h3>;
};

export { Header };
